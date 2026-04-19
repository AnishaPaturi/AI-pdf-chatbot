'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loader2, X, MessageSquare } from 'lucide-react';
import { DocumentData } from '@/lib/api';

interface PDFViewerProps {
  pdfDoc: DocumentData;
  onTextSelect: (text: string) => void;
  onAskAI: (text: string) => void;
  onClose: () => void;
}

export default function PDFViewer({ pdfDoc: document, onTextSelect, onAskAI, onClose }: PDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`/api/document/${document.id}/file`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        }
      } catch (error) {
        console.error('Error fetching PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
    
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [document.id]);

  const handleAskAIPressed = () => {
    if (selectedText.trim()) {
      // Clean the text to remove any image/file references
      const cleanText = selectedText.replace(/\[.*?\]\(.*?\)/g, '').replace(/image\.png/gi, '');
      if (cleanText.trim()) {
        onAskAI(cleanText.trim());
        setSelectedText('');
      }
    }
  };

  if (!pdfUrl) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-800">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-800">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 z-10">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
        className="w-full flex-1 border-0"
        title="PDF Viewer"
        onLoad={() => setLoading(false)}
      />
      
      {/* Text Selection Panel */}
      <div className="p-3 border-t border-slate-700 bg-slate-900">
        <p className="text-xs text-slate-400 mb-2">Select text in PDF and paste here, or type a passage to ask about:</p>
        <div className="flex gap-2">
          <textarea
            value={selectedText}
            onChange={(e) => setSelectedText(e.target.value)}
            placeholder="Paste or type text from PDF you want to ask about..."
            className="flex-1 h-20 bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm resize-none placeholder-slate-500"
          />
          <button
            onClick={handleAskAIPressed}
            disabled={!selectedText.trim()}
            className="px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg flex flex-col items-center justify-center"
          >
            <MessageSquare className="w-5 h-5 mb-1" />
            <span className="text-xs">Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
}