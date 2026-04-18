# DocuMind - AI PDF Chatbot v2.0

![Python](https://img.shields.io/badge/Python-3.11+-3776ab?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)
![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=flat-square&logo=next.js)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite)
![LangChain](https://img.shields.io/badge/LangChain-RAG-1F1F1F?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Overview

DocuMind is an enterprise-grade, web-based Retrieval-Augmented Generation (RAG) platform. Upload PDFs, authenticate with JWT, and have intelligent conversations with your documents. Built with **user authentication**, **multi-PDF support**, **strict LLM context scoping**, and a **sleek dark UI** inspired by modern SaaS products.

## Key Features ✨

- 🔐 **JWT Authentication** - Secure login/register with password hashing
- 📄 **Multi-PDF Support** - Upload multiple documents simultaneously
- 🎯 **Strict LLM Scoping** - AI refuses to hallucinate, only uses document context
- 💾 **Data Persistence** - SQLQLite database for users, documents, and query history
- 🚀 **Fast Responses** - Optimized vector search with ChromaDB
- 🎨 **Modern UI** - Dark, minimalist design (napkin.ai inspired)
- 📊 **Query History** - Track all conversations per user

## Tech Stack

### Backend
- **FastAPI** (Python) - High-performance async API framework
- **SQLAlchemy** - ORM for database management
- **SQLite** - Lightweight relational database
- **LangChain** - AI orchestration & RAG pipeline
- **ChromaDB** - Vector database for embeddings
- **HuggingFace Transformers** - Local embedding models
- **OpenRouter API** - LLM provider (free tier supported)
- **PyJWT** - JWT authentication
- **Passlib** - Password hashing with bcrypt

### Frontend
- **Next.js 15** (App Router) - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icons
- **Zustand** - State management
- **Axios** - HTTP client
- **Sonner** - Toast notifications

## Architecture

```mermaid
graph TD
    A[Next.js 15 React UI] -->|POST /register /login| B(FastAPI Backend)
    A -->|POST /upload PDFs| B
    A -->|POST /chat Query| B
    
    B -->|JWT Auth| C[SQLAlchemy ORM]
    C -->|Persist User/Document/Query| D[(SQLite DB)]
    
    B -->|PyPDF| E[Text Extraction & Chunking]
    E -->|Embed Chunks| F[(ChromaDB Vector Store)]
    
    B -->|User-specific Search| F
    F -.->|Return Top K Chunks| G[LangChain RAG Processor]
    
    G -->|Strict Context Only| H["OpenRouter LLM<br/>(with hallucination prevention)"]
    H -.->|Generated Answer| B
    B -.->|JSON Response| A
    
    D -->|Read User Docs| B
    B -->|Save Query Logs| D
```

## Project Structure

```
AI-pdf-chatbot/
│
├── backend/
│   ├── main.py                  # FastAPI app + endpoints
│   ├── models.py                # SQLAlchemy models (User, Document, QueryLog)
│   ├── database.py              # Database configuration
│   ├── auth.py                  # JWT & password utilities
│   ├── requirements.txt          # Python dependencies
│   ├── chroma_db/               # Vector database (auto-generated)
│   └── uploads/                 # User PDFs organized by user_id
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # Landing page (napkin.ai dark style)
│   │   │   ├── layout.tsx       # Root layout with Toaster
│   │   │   ├── globals.css      # Global styles
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx # Login form
│   │   │   │   └── register/
│   │   │   │       └── page.tsx # Registration form
│   │   │   └── dashboard/
│   │   │       └── page.tsx     # Main chat dashboard with sidebar
│   │   └── lib/
│   │       ├── api.ts           # Axios API client
│   │       └── store.ts         # Zustand state management
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.ts
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Create virtual environment**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure environment**
Create a `.env` file in `backend/`:
```env
OPENROUTER_API_KEY=your_openrouter_key_here
SECRET_KEY=your-super-secret-key-change-in-prod
DATABASE_URL=sqlite:///./vaat_chatbot.db
```

4. **Run the server**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Configure environment**
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **Run dev server**
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /register` - Create new account
- `POST /login` - Login and get JWT token
- `GET /me` - Get current user info (requires auth)

### Documents
- `POST /upload` - Upload multiple PDFs (requires auth)
- `GET /documents` - List user's documents (requires auth)

### Chat
- `POST /chat` - Send query to chat with PDFs (requires auth)
- `GET /history` - Get query history (requires auth)

### Health
- `GET /` - Health check endpoint

## Verification Checklist

- [ ] **Auth**: Register a test user, log in, verify dashboard shows
- [ ] **Multi-Upload**: Select 2+ PDFs and upload simultaneously
- [ ] **Strict LLM**: Ask about "AWS EBS" on a programming PDF, verify refusal
- [ ] **Data Persistence**: Refresh page, verify login session and documents persist
- [ ] **UI Style**: Verify dark, minimal napkin.ai-inspired design

## Environment Variables

### Backend (.env)
```
OPENROUTER_API_KEY=<your_api_key>
SECRET_KEY=<change_in_production>
DATABASE_URL=sqlite:///./vaat_chatbot.db
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Future Enhancements

- [ ] Document sharing between users
- [ ] PDF annotation and highlighting
- [ ] Advanced search filters
- [ ] Custom AI model selection
- [ ] Export conversation as PDF
- [ ] Webhook integrations
- [ ] Team workspaces
- [ ] Rate limiting & usage quotas

## Security Notes

⚠️ **Important**: Change `SECRET_KEY` in production. Never commit `.env` files.

## Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Must be 3.11+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend connection issues
- Ensure backend is running on `http://localhost:8000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`

### Database errors
```bash
# Remove old database and reinitialize
rm vaat_chatbot.db
python -c "from database import init_db; init_db()"
```

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open a GitHub issue.

---

**Built with ❤️ using FastAPI, Next.js, and LangChain**
│
└── frontend/                 # Next.js UI
    ├── src/
    │   └── app/
    │       ├── globals.css   # Global Tailwind and animated background styles
    │       ├── page.tsx      # Huge dynamic landing page and chat interfaces
    │       └── layout.tsx    # Next.js root layout
    ├── public/               # Static assets & generated 3D images
    ├── package.json
    └── tailwind.config.ts    # Tailwind theme configuration
```

## 6. Additional Features
- **Strict Anti-Hallucination**: The LLM prompt is engineered to *only* answer based on the provided PDF context. 
- **Persisted Vector Memory**: ChromaDB retains vectorized documents locally so the backend doesn't re-process data unnecessarily.
- **Dynamic 3D Aesthetics**: The UI is treated as a full-scale commercial landing page with 3D avatars, floating elements, and deep interactive states.

## 7. Timeline of the Project
- **Phase 1**: Initializing dual-repository structure and planning RAG pipeline architecture.
- **Phase 2**: Bootstrapping Python Backend (FastAPI, dependencies, Langchain abstractions).
- **Phase 3**: Creating the React/NextJS skeleton and wiring up core RAG API fetch loops.
- **Phase 4**: Major Visual Overhaul - Transforming the UI from a generic chat app to a highly animated, starry-themed digital product landing page.

## 8. Authors
- **Anisha Paturi** - Lead Developer & AI Enthusiast

---
> Note: If you encounter an `Is FastAPI running?` error, ensure you have renamed `.env.example` to `.env`, added your OpenRouter key, and explicitly restarted your `uvicorn main:app --reload` server!
