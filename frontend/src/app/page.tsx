"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, MessageSquare, Send, File, CheckCircle2, Loader2, Bot, User, ArrowRight, Rocket } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
};

export default function LandingPage() {
  // --- RAG State ---
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Ref for smooth scrolling down to the chat interface
  const chatSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Handlers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess(true);
        setMessages([
          {
            id: Date.now().toString(),
            role: "bot",
            content: `Document secured. Let's delve into "${file.name}". What's your inquiry?`,
          },
        ]);
        // Scroll down slightly so they focus on the chat
        setTimeout(() => {
          chatSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !uploadSuccess) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: inputValue };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: newUserMsg.content }),
      });

      if (response.ok) {
        const data = await response.json();
        const newBotMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", content: data.answer };
        setMessages((prev) => [...prev, newBotMsg]);
      } else {
        const errorData = await response.json();
        setMessages((prev) => [...prev, { id: Date.now().toString(), role: "bot", content: `Error: ${errorData.detail}` }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "bot", content: "Connection Error: Is the API running?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const scrollToChat = () => chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      {/* 
        PREMIUM BACKGROUND 
        Starry deep space simulation via complex radial gradients
      */}
      <div className="fixed inset-0 z-[-1] bg-[#050B14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050B14] to-[#050B14]"></div>
        {/* Subtle mesh glowing orb in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      {/* --- NAVIGATION BAR --- */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-xl">
            <MessageSquare size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">VaatBot</span>
        </div>
        
        {/* We hide links on very small screens for simplicity */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button className="bg-indigo-600/20 text-indigo-400 px-4 py-1.5 rounded-full ring-1 ring-indigo-500/30 hover:bg-indigo-600/30 transition-all">Home</button>
          <button className="hover:text-white transition-colors">About</button>
          <button className="hover:text-white transition-colors">Services</button>
          <button className="hover:text-white transition-colors">Pricing</button>
          <button className="hover:text-white transition-colors">Blog</button>
          <button className="hover:text-white transition-colors">Contact</button>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <button className="hidden sm:block hover:text-white transition-colors bg-indigo-600 px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]">
            Login
          </button>
          <button className="ring-1 ring-white/20 hover:bg-white/5 px-6 py-2.5 rounded-full transition-all">
            Book a call
          </button>
        </div>
      </nav>

      {/* --- SUPERCHARGED HERO SECTION --- */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center justify-center min-h-[80vh] text-center">
        
        {/* Floating elements from the reference image */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[5%] md:left-[15%] top-1/4 hidden lg:block"
        >
          <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl rounded-br-none shadow-2xl relative mb-4">
            <p className="text-sm">Hello AI!</p>
          </div>
          {/* Note: In a real prod environment we'd use external optimized images. */}
          <div className="relative w-48 h-48 opacity-90 hover:opacity-100 transition-opacity">
            <Image src="/hero_boy.png" alt="3D Boy" fill className="object-contain" />
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[5%] md:right-[15%] top-1/3 hidden lg:block"
        >
          <div className="bg-[#1a1c2e]/90 backdrop-blur-md border border-indigo-500/30 px-5 py-3 rounded-2xl rounded-bl-none shadow-[0_0_30px_rgba(79,70,229,0.2)] relative mb-4">
            <p className="text-sm font-medium text-indigo-200">How can I help<br/>you today?</p>
          </div>
          <div className="relative w-56 h-56 transition-transform hover:scale-105">
            <Image src="/hero_robot.png" alt="3D Robot" fill className="object-contain" />
          </div>
        </motion.div>

        {/* Hero Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            AI Assistant
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Supercharge Your Team with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              AI Conversations
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            From raw customer documents to insightful lead generation — automate it all by 
            chatting directly with your custom PDF knowledge base.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={scrollToChat}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2"
            >
              Get Started Free <ArrowRight size={18} />
            </button>
            <button className="bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-white px-8 py-4 rounded-full font-medium transition-all flex items-center gap-2">
              <Rocket size={18} className="text-purple-400" /> See Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- LOGO STRIP --- */}
      <section className="w-full border-y border-white/5 bg-white/[0.02] py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-indigo-400/80 text-sm font-bold tracking-[0.2em] uppercase mb-8">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {/* Fallback to text if logos aren't available, but styled nicely */}
            <h3 className="font-bold text-2xl tracking-tighter">PayPal</h3>
            <h3 className="font-bold text-2xl tracking-tighter italic">yahoo!</h3>
            <h3 className="font-bold text-2xl tracking-tight">Lenovo</h3>
            <h3 className="font-serif font-bold text-2xl">Canon</h3>
            <h3 className="font-bold text-2xl flex items-center gap-1"><div className="w-4 h-4 bg-sky-500 rounded-full"></div>zoom</h3>
            <h3 className="font-medium text-2xl">Google</h3>
          </div>
        </div>
      </section>

      {/* --- THE RAG APPLICATION SECTION --- */}
      <section ref={chatSectionRef} className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Transform Your Business</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Upload a massive PDF and watch our backend orchestrate embeddings locally, delivering precision answers instantly.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 shadow-2xl">
          
          {/* L: Upload Pane */}
          <div className="w-full lg:w-1/3 p-6 bg-white/[0.02] rounded-[1.5rem] border border-white/5 flex flex-col">
            <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
              <File className="text-indigo-400" /> Knowledge Base
            </h3>
            <p className="text-sm text-slate-400 mb-8">Inject data into the pipeline.</p>
            
            <input type="file" id="pdf-upload" accept="application/pdf" className="hidden" onChange={handleFileChange} />
            <label 
              htmlFor="pdf-upload"
              className="group flex-1 min-h-[250px] border-2 border-dashed border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer text-center mb-6"
            >
              <UploadCloud size={48} className="text-slate-600 group-hover:text-indigo-400 transition-colors mb-4" />
              <p className="font-medium text-slate-300">{file ? file.name : "Select a PDF document"}</p>
              <p className="text-xs text-slate-500 mt-2">Maximum file size: 50MB</p>
            </label>

            <button 
              onClick={handleUpload}
              disabled={!file || isUploading || uploadSuccess}
              className={`w-full py-4 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2 ${
                uploadSuccess 
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                  : !file 
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25"
              }`}
            >
              {isUploading && <Loader2 size={18} className="animate-spin" />}
              {uploadSuccess && <CheckCircle2 size={18} />}
              {isUploading ? "Vectorizing..." : uploadSuccess ? "Pipeline Active" : "Process Document"}
            </button>
          </div>

          {/* R: Chat Pane */}
          <div className="flex-1 flex flex-col h-[600px] bg-[#0A0F1C] rounded-[1.5rem] border border-white/5 relative overflow-hidden">
            
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

            {/* Chat header */}
            <div className="p-5 border-b border-white/5 flex items-center gap-3 bg-white/[0.01]">
              <div className={`w-3 h-3 rounded-full ${uploadSuccess ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-rose-500'}`}></div>
              <span className="font-medium text-sm text-slate-300">
                {uploadSuccess ? "OpenRouter Link Established" : "Awaiting Context Initialization"}
              </span>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              <AnimatePresence>
                {messages.length === 0 && !uploadSuccess && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-slate-500 gap-4 opacity-50">
                    <Bot size={56} className="text-indigo-400/50" />
                    <p className="text-center font-medium">No document detected.<br/>Please upload context to begin.</p>
                  </motion.div>
                )}

                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                      msg.role === "user" ? "bg-indigo-600" : "bg-slate-800 ring-1 ring-white/10"
                    }`}>
                      {msg.role === "user" ? <User size={18} /> : <Bot size={18} className="text-indigo-300" />}
                    </div>

                    <div className={`max-w-[80%] p-4 text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-100 rounded-2xl rounded-tr-sm" 
                        : "bg-white/[0.03] border border-white/5 text-slate-300 rounded-2xl rounded-tl-sm shadow-xl"
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-800 ring-1 ring-white/10 flex items-center justify-center">
                    <Bot size={18} className="text-indigo-300" />
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white/[0.01] border-t border-white/5 relative z-10">
              <form onSubmit={handleSendMessage} className="relative flex items-center group">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={uploadSuccess ? "Ask a question..." : "System locked."}
                  disabled={!uploadSuccess || isTyping}
                  className="w-full bg-slate-900/50 hover:bg-slate-900 focus:bg-slate-900 border border-white/10 rounded-xl py-4 pl-5 pr-14 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all disabled:opacity-50 text-sm"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || !uploadSuccess || isTyping}
                  className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-[0.6rem] transition-all disabled:text-slate-600"
                >
                  <Send size={18} className={inputValue.trim() && uploadSuccess ? "translate-x-0.5" : ""} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
