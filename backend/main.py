import os
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# We use ChatOpenAI because OpenRouter is fully compatible with the OpenAI API format!
from langchain_openai import ChatOpenAI 
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma

# Using HuggingFace for fast, local, and free embeddings (doesn't eat up OpenRouter credits!)
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

# Load any variables from a .env file (if we have one). Very helpful during local dev
load_dotenv()

# We initialize the FastAPI app here. This is the core of our backend.
app = FastAPI(
    title="AI PDF Chatbot API",
    description="Backend API for RAG PDF chatbot, powering the NextJS frontend.",
    version="1.0"
)

# Crucial: We need CORS so our NextJS app (running on localhost:3000) can actually talk to this API
# Without this, the browser would block the requests.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # NextJS default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Configuration & Setup ---

# We define the directory where our uploaded PDFs will be temporarily stored
UPLOAD_DIR = "./uploads"

# And where we will persist our Chroma vector database
CHROMA_DB_DIR = "./chroma_db"

# Create the upload directory if it doesn't already exist on disk
os.makedirs(UPLOAD_DIR, exist_ok=True)

# We are using a small, efficient local embedding model from HuggingFace to keep things snappy.
# This runs locally and converts our text chunks into vectors so we can do similarity searches later!
# Note: It might download the model the first time it runs, which is totally normal.
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# We'll set up a global variable to hold our vector store so it stays in memory across requests
vector_store = None

def get_vector_store():
    """
    Helper function to get or initialize the Chroma vector store.
    Instead of recreating the connection every time, we reuse it or build it.
    """
    global vector_store
    if vector_store is None:
        # If the directory exists, we load the existing database. Perfect for server restarts!
        if os.path.exists(CHROMA_DB_DIR):
            vector_store = Chroma(persist_directory=CHROMA_DB_DIR, embedding_function=embeddings)
        else:
            # We just initialize an empty shell if it doesn't exist yet
            vector_store = None 
    return vector_store

# --- Data Models (Pydantic) ---
# We use Pydantic models in FastAPI to strictly type our incoming request bodies.
# This makes sure the frontend sends exactly what we expect!

class ChatRequest(BaseModel):
    query: str # This is what the user is asking the chatbot

class ChatResponse(BaseModel):
    answer: str # This is the final text response from the AI
    
# --- API Endpoints ---

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    """
    This endpoint handles file uploads. NextJS will POST a formdata with the file here.
    Then, we implement the RAG Ingestion Pipeline: Extract -> Split -> Embed -> Store.
    """
    try:
        # 1. Save the uploaded file locally so PyPDF can read it
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        print(f"File uploaded successfully: {file_path}")

        # 2. Extract: Load the PDF into raw text using Langchain's PyPDFLoader
        # It handles all the messy PDF byte decoding for us.
        loader = PyPDFLoader(file_path)
        documents = loader.load()
        print(f"Loaded {len(documents)} pages from PDF.")

        # 3. Split text: We can't just shove the whole PDF into the LLM (context limits)!
        # So we chunk it up into smaller, overlapping segments. Overlap helps preserve context across cuts.
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, 
            chunk_overlap=200
        )
        chunks = text_splitter.split_documents(documents)
        print(f"Split document into {len(chunks)} chunks.")

        # 4. Embed & Store: Here's the magic. We embed these chunks and shove them into ChromaDB.
        # This gives us our searchable vector database.
        global vector_store
        # We overwrite or create a fresh DB instance. (If you want to keep adding to it, you'd use add_documents instead)
        # For this tool, we'll reset it per document to keep it simple, or add to the existing collection.
        # Let's add them to the existing persistent directory so we can query multiple docs!
        vector_store = Chroma.from_documents(
            documents=chunks, 
            embedding=embeddings, 
            persist_directory=CHROMA_DB_DIR
        )
        
        # Great success! We return a nice response to the frontend.
        return {"message": f"Successfully processed {file.filename} and added {len(chunks)} chunks to Vector DB."}
        
    except Exception as e:
        # If something breaks, we catch it and throw a proper HTTP error.
        print(f"Error during upload: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chat", response_model=ChatResponse)
async def chat_with_pdf(request: ChatRequest):
    """
    This endpoint handles questions from the user.
    It implements the Generation Pipeline: Query -> Search DB -> Build Context -> LLM -> Answer.
    """
    # Grab the user's question from the request body
    query = request.query
    print(f"Received user query: {query}")
    
    # Let's make sure our vector store is ready to go
    store = get_vector_store()
    if store is None:
        raise HTTPException(status_code=400, detail="No documents uploaded yet! Please upload a PDF first.")

    # Grab the OpenRouter keys from our environment variables
    # We require the user to configure this in .env
    openrouter_api_key = os.getenv("OPENROUTER_API_KEY")
    
    if not openrouter_api_key:
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY not found in environment variables.")

    try:
        # 1. Setup our LLM via LangChain. Note how we trick LangChain into using OpenRouter
        # by simply overriding the `api_base` to point to OpenRouter!
        llm = ChatOpenAI(
            api_key=openrouter_api_key,
            base_url="https://openrouter.ai/api/v1",
            # We default to a solid, fast, and completely free model on OpenRouter!
            # You can easily change this to "meta-llama/llama-3-8b-instruct" or any other.
            model="meta-llama/llama-3-8b-instruct:free", 
        )

        # 2. Build our RAG prompt. This is what we actually feed the LLM. 
        # We tell it strictly to ONLY answer based on the provided `<context>`.
        system_prompt = (
            "You are an intelligent, helpful assistant parsing a PDF document. "
            "Use the following pieces of retrieved context to accurately answer the user's question. "
            "If you do not know the answer based on the context, politely say that you don't know and don't make up information.\n\n"
            "Context:\n"
            "{context}"
        )

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{input}"),
        ])

        # 3. Create the core LCEL chain
        # We fetch the top 4 most relevant chunks.
        retriever = store.as_retriever(search_kwargs={"k": 4})
        
        def format_docs(docs):
            return "\n\n".join(doc.page_content for doc in docs)

        rag_chain = (
            {"context": retriever | format_docs, "input": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )

        # 4. Final step! We run the entire chain, feeding it the raw user 'input'
        print("Invoking LangChain LCEL RAG pipeline...")
        # Since we use LCEL with StrOutputParser, it outputs the raw string answer directly!
        final_answer = rag_chain.invoke(query)
        
        print(f"Generated answer snippet: {final_answer[:100]}...")

        return ChatResponse(answer=final_answer)

    except Exception as e:
        print(f"Error during chat: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
async def root():
    """
    A simple health-check endpoint. Good for verifying the server is alive!
    """
    return {"message": "AI PDF Chatbot Backend is running perfectly!"}
