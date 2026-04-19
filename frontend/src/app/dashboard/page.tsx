'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut,
  Send,
  Upload,
  FileText,
  Loader2,
  MessageSquare,
  Settings,
  X,
  Plus,
  ChevronDown
} from 'lucide-react';
import { useAuthStore, useChatStore } from '@/lib/store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { authAPI, documentAPI, chatAPI, DocumentData } from '@/lib/api';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { messages, isLoading, addMessage, setLoading } = useChatStore();

  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [input, setInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [docLoading, setDocLoading] = useState(true);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch user documents on mount
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const fetchDocuments = async () => {
      try {
        const response = await documentAPI.getDocuments();
        setDocuments(response.documents);
      } catch (err) {
        console.error('Failed to fetch documents:', err);
      } finally {
        setDocLoading(false);
      }
    };

    fetchDocuments();
  }, [user, router]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type === 'application/pdf'
    );

    if (files.length > 0) {
      await handleUpload(files as File[]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleUpload(files);
    }
  };

  const handleUpload = async (files: File[]) => {
    setLoading(true);
    try {
      const response = await documentAPI.upload(files);
      setDocuments([...documents, ...response.results.filter((r: any) => r.status === 'success').map((r: any) => ({
        id: r.document_id,
        filename: r.filename,
        chunk_count: r.chunks,
        created_at: new Date().toISOString(),
      }))]);
      toast.success(`${response.files_processed} file(s) uploaded successfully!`);
      setShowUpload(false);
    } catch (err: any) {
      toast.error('Failed to upload files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || documents.length === 0) return;

    const query = input;
    setInput('');
    addMessage('user', query);
    setLoading(true);

    try {
      const response = await chatAPI.chat(query);
      addMessage('bot', response.answer);
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Failed to get response';
      toast.error(errorMsg);
      addMessage('bot', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="h-screen flex bg-black">
      {/* Sidebar */}
      <motion.div
        className="w-64 bg-slate-900/50 border-r border-slate-800 flex flex-col overflow-hidden"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* User Section */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-slate-800 rounded-lg transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <button className="m-4 py-2.5 px-4 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          New Chat
        </button>

        {/* Documents Section */}
        <div className="flex-1 overflow-y-auto px-4">
          <h3 className="text-xs font-semibold text-slate-400 mb-3 uppercase">Documents</h3>
          {docLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
            </div>
          ) : documents.length === 0 ? (
            <p className="text-sm text-slate-500 py-8 text-center">No documents yet</p>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <motion.div
                  key={doc.id}
                  className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg cursor-pointer transition group"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{doc.filename}</p>
                      <p className="text-xs text-slate-500">{doc.chunk_count} chunks</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setShowUpload(true)}
            className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload PDF
          </button>
          <button className="w-full py-2 px-3 bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-lg transition flex items-center justify-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Messages Area */}
        <motion.div
          className="flex-1 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {documents.length === 0 ? 'Upload a PDF to start' : 'Start chatting'}
                </h2>
                <p className="text-slate-400 max-w-sm">
                  {documents.length === 0
                    ? 'Upload one or more PDF documents to begin asking questions'
                    : 'Ask questions about your uploaded documents'}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto w-full py-8 px-4 space-y-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                      <div
className={`max-w-2xl lg:max-w-3xl px-4 py-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-white text-black'
                            : 'bg-slate-800 text-white'
                        }`}
                      >
                        {msg.role === 'user' ? (
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        ) : (
                          <div className="prose prose-invert max-w-none prose-sm prose-headings:font-bold prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-code:before:content-none prose-code:after:content-none prose-pre:p-2 prose-pre:rounded prose-pre:bg-slate-900/50 prose-pre:text-xs prose-ul:my-1 prose-li:my-0">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-slate-400"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </motion.div>

        {/* Input Area */}
        {documents.length > 0 && (
          <motion.div
            className="border-t border-slate-800 p-4 bg-slate-900/50"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about your documents..."
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpload(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Upload PDFs</h2>
                  <button
                    onClick={() => setShowUpload(false)}
                    className="p-1 hover:bg-slate-800 rounded-lg transition"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${
                    isDragging
                      ? 'border-white bg-slate-800/50'
                      : 'border-slate-700 bg-slate-800/20 hover:border-slate-600'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-white mb-1">Drag PDFs here</p>
                  <p className="text-xs text-slate-500">or click to browse</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-4">
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <motion.div
                        className="bg-white h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-2 text-center">{uploadProgress}%</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
