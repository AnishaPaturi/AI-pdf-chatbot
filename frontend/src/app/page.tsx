'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, BarChart3, MessageSquare, CheckCircle, Github, Twitter, Mail } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <div className="bg-black text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold">
            DocuMind
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button className="text-white/70 hover:text-white transition">Features</button>
            <button className="text-white/70 hover:text-white transition">Pricing</button>
            <button className="text-white/70 hover:text-white transition">Docs</button>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <button className="text-white/70 hover:text-white transition text-sm font-medium">Sign in</button>
            </Link>
            <Link href="/auth/register">
              <button className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/90 transition">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white/80">
              The future of document intelligence
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-bold leading-tight mb-6"
          >
            Chat with your documents
            <br />
            <span className="text-white/60">in seconds</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 mb-12 max-w-2xl mx-auto"
          >
            Upload PDFs and ask questions. Our AI reads your documents intelligently and answers with precision.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/auth/register">
              <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition flex items-center justify-center gap-2 group">
                Start free trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20">
              Watch demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mt-24 pt-12 border-t border-white/10"
          >
            <div>
              <div className="text-3xl font-bold">10k+</div>
              <div className="text-white/60 text-sm mt-2">Users worldwide</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99%</div>
              <div className="text-white/60 text-sm mt-2">Accuracy rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold">&lt;1s</div>
              <div className="text-white/60 text-sm mt-2">Response time</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Everything you need
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: Zap,
                title: 'Lightning fast',
                description: 'Get answers in milliseconds with our optimized vector search engine'
              },
              {
                icon: Shield,
                title: 'Secure & private',
                description: 'Your documents stay on your device. End-to-end encryption'
              },
              {
                icon: BarChart3,
                title: 'Analytics included',
                description: 'Track queries, understand patterns, and optimize your workflow'
              },
              {
                icon: MessageSquare,
                title: 'Natural language',
                description: 'Ask questions in plain English just like talking to a colleague'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition"
              >
                <feature.icon className="w-8 h-8 mb-4 text-white" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            How it works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Upload',
                description: 'Drag and drop your PDFs. We handle the rest.'
              },
              {
                step: '02',
                title: 'Ask',
                description: 'Type your questions in natural language'
              },
              {
                step: '03',
                title: 'Get answers',
                description: 'AI extracts relevant information instantly'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-white/20 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Simple pricing
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: 'Free',
                desc: 'Perfect for trying us out',
                features: ['Up to 5 PDFs', '100 messages/month', 'Basic support']
              },
              {
                name: 'Pro',
                price: '$29/mo',
                desc: 'For power users',
                features: ['Unlimited PDFs', 'Unlimited messages', 'Email support', 'Query analytics'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                desc: 'For teams',
                features: ['Everything in Pro', 'SSO & SCIM', 'Advanced security', 'Dedicated support']
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-xl border transition ${
                  plan.highlighted
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className={plan.highlighted ? 'text-black/60 text-sm mb-4' : 'text-white/60 text-sm mb-4'}>{plan.desc}</p>
                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? 'bg-black text-white hover:bg-white/20'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}>
                  Get started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/10">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-white/60 text-lg mb-8">Join thousands of users who are already using DocuMind</p>
          <Link href="/auth/register">
            <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition">
              Start free trial
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-8">
            <div>
              <div className="text-lg font-bold mb-4">DocuMind</div>
              <p className="text-white/60 text-sm">Chat with your PDFs</p>
            </div>
            <div>
              <div className="font-semibold mb-4">Product</div>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><button className="hover:text-white transition">Features</button></li>
                <li><button className="hover:text-white transition">Pricing</button></li>
                <li><button className="hover:text-white transition">Security</button></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">Company</div>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><button className="hover:text-white transition">About</button></li>
                <li><button className="hover:text-white transition">Blog</button></li>
                <li><button className="hover:text-white transition">Contact</button></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">Legal</div>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><button className="hover:text-white transition">Privacy</button></li>
                <li><button className="hover:text-white transition">Terms</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex items-center justify-between">
            <p className="text-white/60 text-sm">© 2024 DocuMind. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Github className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition" />
              <Twitter className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition" />
              <Mail className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
      
      {/* Intense Glowing Orbs Background */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none"></div>

      {/* --- TOP NAVIGATION --- */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <MessageSquare size={22} className="text-white fill-white/20" />
          </div>
          <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            VaatBot<span className="text-indigo-500">.</span>
          </span>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide text-slate-300">
          <button className="text-white relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-indigo-500 after:rounded-full">Home</button>
          <button className="hover:text-white transition-colors">Platform</button>
          <button className="hover:text-white transition-colors">Pricing</button>
          <button className="hover:text-white transition-colors">Enterprise</button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-6 text-sm font-bold">
          <button className="hidden sm:block text-slate-300 hover:text-white transition-colors">Log in</button>
          <button className="bg-white hover:bg-slate-100 text-slate-900 px-7 py-3 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-0.5 relative group overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">Book a call</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
          </button>
        </motion.div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-24 pb-40 flex flex-col items-center min-h-[85vh] text-center mt-10">
        
        {/* Floating Avatars */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[3%] lg:left-[10%] top-1/4 hidden lg:flex flex-col items-center"
        >
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-slate-800/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-3xl rounded-br-none shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative mb-6">
            <p className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Hello AI!
            </p>
          </motion.div>
          <div className="relative w-64 h-64 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            <Image src="/hero_boy.png" alt="3D Boy" fill className="object-contain" />
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 25, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[3%] lg:right-[10%] top-1/3 hidden lg:flex flex-col items-center"
        >
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-[#1a1c2e]/90 backdrop-blur-xl border border-indigo-500/40 px-6 py-4 rounded-3xl rounded-bl-none shadow-[0_20px_40px_-10px_rgba(99,102,241,0.3)] relative mb-6">
            <p className="text-sm font-semibold text-indigo-200">How can I help<br/>you today?</p>
          </motion.div>
          <div className="relative w-72 h-72 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            <Image src="/hero_robot.png" alt="3D Robot" fill className="object-contain" />
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative z-10 max-w-4xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold uppercase tracking-widest text-indigo-300 mb-10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Sparkles size={14} className="text-indigo-400" /> Version 2.0 Access
          </div>
          
          <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tight leading-[1.05] mb-8">
            Supercharge Your Team <br className="hidden md:block"/> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">AI Conversations</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-14 leading-relaxed font-medium">
            From customer service to lead generation — pipeline your raw PDFs directly into an intelligent LLM interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button onClick={scrollToChat} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-[0_20px_40px_-10px_rgba(99,102,241,0.6)] transform hover:-translate-y-1 flex items-center gap-3 relative group">
              <span className="relative z-10">Get Started Free</span> 
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-sm border border-white/10 text-white px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center gap-3">
              See Live Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- INFINITE TRUSTED LOGOS --- */}
      <section className="w-full border-y border-white/10 bg-[#080B1A]/80 backdrop-blur-sm py-12 relative z-10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030614] to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030614] to-transparent z-10"></div>
        
        <div className="flex w-[200%] animate-marquee opacity-40 hover:opacity-80 transition-opacity duration-500">
          {logos.map((logo, i) => (
            <div key={i} className="flex-1 flex items-center justify-center px-12 shrink-0 w-64">
              <span className="text-3xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* --- RAG APPLICATION PLATFORM --- */}
      <section ref={chatSectionRef} className="max-w-[90rem] mx-auto px-6 py-40 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Smart Chat Experience</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium">Inject your corporate data into our secure pipeline and let LangChain handle the vector math instantly.</p>
        </div>

        {/* Glossy Wrapper around the RAG tool */}
        <div className="p-[2px] bg-gradient-to-br from-indigo-500/30 via-slate-800 to-purple-500/30 rounded-[2.5rem] shadow-[0_0_100px_rgba(99,102,241,0.15)] relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 blur-3xl"></div>
          <div className="flex flex-col lg:flex-row gap-0 bg-[#0A0D1E] rounded-[2.5rem] overflow-hidden">
            
            {/* L: Upload Sidebar */}
            <div className="w-full lg:w-[400px] bg-white/[0.02] border-r border-white/5 flex flex-col p-8 dot-grid relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0D1E] pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="font-bold text-2xl mb-3 flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg"><File className="text-indigo-400" size={24} /></div> Document Vault
                </h3>
                <p className="text-base text-slate-400 mb-10 leading-relaxed">Establish your context constraints. Select a high-density PDF payload.</p>
                
                <input type="file" id="pdf-upload" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                <label 
                  htmlFor="pdf-upload"
                  className="group flex flex-col min-h-[300px] border-2 border-dashed border-indigo-500/20 hover:border-indigo-400 bg-indigo-500/[0.02] hover:bg-indigo-500/10 transition-all duration-300 rounded-[2rem] p-10 items-center justify-center cursor-pointer text-center mb-8 shadow-inner"
                >
                  <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-indigo-500/20">
                    <UploadCloud size={32} className="text-indigo-400" />
                  </div>
                  <p className="font-bold text-lg text-slate-200 mb-2">{file ? file.name : "Drag & Drop PDF"}</p>
                  <p className="text-sm text-slate-500">Supports encrypted .pdf up to 50MB</p>
                </label>

                <button 
                  onClick={handleUpload}
                  disabled={!file || isUploading || uploadSuccess}
                  className={`w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                    uploadSuccess 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]" 
                      : !file 
                        ? "bg-slate-800/50 text-slate-600 cursor-not-allowed" 
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_15px_30px_-10px_rgba(99,102,241,0.5)] transform hover:-translate-y-1"
                  }`}
                >
                  {isUploading && <Loader2 size={22} className="animate-spin" />}
                  {uploadSuccess && <CheckCircle2 size={22} />}
                  {isUploading ? "Vectorizing Payload..." : uploadSuccess ? "Context Initialized" : "Process Payload"}
                </button>
              </div>
            </div>

            {/* R: Chat Engine */}
            <div className="flex-1 flex flex-col h-[800px] lg:h-auto bg-[#0A0D1E] relative">
              
              {/* Header */}
              <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center">
                    <div className={`w-4 h-4 rounded-full ${uploadSuccess ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    {uploadSuccess && <div className="absolute inset-0 bg-emerald-500 blur-sm animate-pulse"></div>}
                  </div>
                  <span className="font-bold tracking-wide text-slate-200">
                    {uploadSuccess ? "LLM Node: ONLINE" : "Awaiting Context..."}
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                  <div className="w-3 h-3 rounded-full bg-white/10"></div>
                </div>
              </div>

              {/* Chat Viewport */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
                <AnimatePresence>
                  {messages.length === 0 && !uploadSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-slate-500 gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-[50px] opacity-20"></div>
                        <Bot size={80} className="text-indigo-400/40 relative z-10" />
                      </div>
                      <p className="text-center font-bold text-xl tracking-tight text-slate-600">Terminal awaiting input.<br/>Upload context to begin simulation.</p>
                    </motion.div>
                  )}

                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`flex gap-5 w-full ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl ${
                        msg.role === "user" ? "bg-gradient-to-br from-indigo-500 to-purple-600" : "bg-slate-800 border border-white/10"
                      }`}>
                        {msg.role === "user" ? <User size={22} className="text-white" /> : <Bot size={22} className="text-indigo-300" />}
                      </div>

                      <div className={`p-6 text-base leading-relaxed font-medium bg-white/[0.02] border border-white/5 shadow-2xl rounded-3xl ${
                        msg.role === "user" 
                          ? "bg-indigo-600/10 border-indigo-500/20 text-indigo-50 rounded-tr-sm max-w-[80%]" 
                          : "text-slate-200 rounded-tl-sm max-w-[90%]"
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
                      <Bot size={22} className="text-indigo-300" />
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl rounded-tl-sm p-6 flex gap-2 items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} className="h-4" />
              </div>

              {/* Input Core */}
              <div className="p-6 bg-white/[0.01] border-t border-white/5 backdrop-blur-md">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={uploadSuccess ? "Transmit query to LLM..." : "Input disabled."}
                    disabled={!uploadSuccess || isTyping}
                    className="w-full bg-[#030614] border border-white/10 rounded-2xl py-5 pl-6 pr-20 outline-none focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 transition-all disabled:opacity-50 text-base font-medium shadow-inner"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || !uploadSuccess || isTyping}
                    className="absolute right-3 p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:shadow-none"
                  >
                    <Send size={20} className={inputValue.trim() && uploadSuccess ? "translate-x-1" : ""} />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
