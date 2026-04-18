"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, MessageSquare, Send, File, CheckCircle2, Loader2, Bot, User } from "lucide-react";

// --- Types ---
// Defining our message structure so TypeScript can help us catch errors!
type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
};

export default function ChatbotPage() {
  // --- State Hooks ---
  // Keeping track of our file state
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // A nifty ref to auto-scroll to the bottom of the chat when new messages arrive
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Handlers ---

  // Handle when the user selects a file from their computer
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadSuccess(false); // Reset success state if they pick a new file
    }
  };

  // Upload the file to our Python FastAPI backend
  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    
    // We use FormData to send files via POST requests
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Connect to our FastAPI backend running on port 8000
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess(true);
        // Add a friendly greeting message from the bot once the file is ready!
        setMessages([
          {
            id: Date.now().toString(),
            role: "bot",
            content: `I've successfully processed "${file.name}". What would you like to know about it?`,
          },
        ]);
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to connect to the backend server. Is FastAPI running?");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle sending a message to the backend
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !uploadSuccess) return;

    // Immediately add the user's message to the UI
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: inputValue };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Send the query to the FastAPI /chat endpoint
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: newUserMsg.content }),
      });

      if (response.ok) {
        const data = await response.json();
        const newBotMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", content: data.answer };
        setMessages((prev) => [...prev, newBotMsg]);
      } else {
        const errorData = await response.json();
        const errorMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", content: `Error: ${errorData.detail}` };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", content: "Sorry, I couldn't connect to the server." };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // --- Render ---
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto text-slate-100">
      
      {/* LEFT COLUMN: Logo & File Upload box */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        
        {/* Header/Branding */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
              <MessageSquare size={28} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
              DocuMind
            </h1>
          </div>
          <p className="text-slate-400 text-sm">
            Chat with your PDFs using OpenRouter AI.
          </p>
        </motion.div>

        {/* Upload Container */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex-col flex gap-4"
        >
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <File size={20} className="text-slate-400"/> Context Upload
          </h2>
          
          {/* Custom hidden file input triggered by the label underneath */}
          <input 
            type="file" 
            id="pdf-upload" 
            accept="application/pdf" 
            className="hidden" 
            onChange={handleFileChange}
          />
          
          {/* Drag & Drop style area */}
          <label 
            htmlFor="pdf-upload"
            className="group border-2 border-dashed border-white/20 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer text-center"
          >
            <UploadCloud size={40} className="text-slate-500 group-hover:text-blue-400 transition-colors mb-3" />
            <p className="text-sm font-medium text-slate-300">
              {file ? file.name : "Click to browse PDFs"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports .pdf up to 50MB
            </p>
          </label>

          {/* Upload Action Button */}
          <button 
            onClick={handleUpload}
            disabled={!file || isUploading || uploadSuccess}
            className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              uploadSuccess 
                ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                : !file 
                  ? "bg-slate-700/50 text-slate-500 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
            }`}
          >
            {isUploading && <Loader2 size={18} className="animate-spin" />}
            {uploadSuccess && <CheckCircle2 size={18} />}
            {isUploading ? "Processing PDF..." : uploadSuccess ? "Ready to Chat!" : "Upload Document"}
          </button>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: The Chat Interface */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[85vh] md:h-auto"
      >
        {/* Chat Header */}
        <div className="p-5 border-b border-white/10 bg-slate-900/40">
          <h2 className="font-semibold flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${uploadSuccess ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
            {uploadSuccess ? "Secure Connection Established" : "Waiting for document..."}
          </h2>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.length === 0 && !uploadSuccess && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-slate-500 gap-4"
              >
                <Bot size={48} className="text-slate-700" />
                <p>Upload a PDF to start analyzing it.</p>
              </motion.div>
            )}

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                  msg.role === "user" 
                    ? "bg-blue-600 shadow-blue-500/20" 
                    : "bg-purple-600 shadow-purple-500/20"
                }`}>
                  {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-blue-600/10 border border-blue-500/20 text-slate-200 rounded-tr-sm" 
                    : "bg-slate-700/30 border border-white/5 text-slate-300 rounded-tl-sm flex flex-col gap-2"
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-purple-600 shadow-purple-500/20">
                <Bot size={20} />
              </div>
              <div className="bg-slate-700/30 border border-white/5 rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </motion.div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-slate-900/40">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={uploadSuccess ? "Ask me anything about the PDF..." : "Please upload a document first"}
              disabled={!uploadSuccess || isTyping}
              className="w-full bg-slate-800/80 border border-white/10 rounded-2xl py-4 pl-5 pr-14 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || !uploadSuccess || isTyping}
              className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-xl transition-all disabled:text-slate-500 disabled:cursor-not-allowed"
            >
              <Send size={20} className={inputValue.trim() && uploadSuccess ? "translate-x-0.5" : ""} />
            </button>
          </form>
        </div>

      </motion.div>
    </main>
  );
}
