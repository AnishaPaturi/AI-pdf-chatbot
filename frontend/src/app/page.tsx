'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, BarChart3, MessageSquare, CheckCircle, Globe , Mail } from 'lucide-react';

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

           {/* Amazon Lex Summary Card */}
           <motion.div
             variants={fadeInUp}
             initial="initial"
             whileInView="animate"
             viewport={{ once: true }}
             transition={{ delay: 0.5 }}
             className="mt-20"
           >
             <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white/80 mb-6">
               Amazon Lex V2 Concepts
             </div>
             <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-white/10 rounded-2xl p-8 md:p-10">
               <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                 Building Conversational Interfaces
               </h3>
               <p className="text-white/60 text-lg mb-8 max-w-3xl">
                 Amazon Lex is a fully-managed AI service for creating chatbots with natural language understanding and speech recognition.
               </p>

               <div className="grid md:grid-cols-2 gap-6">
                 {[
                   {
                     title: 'Bot',
                     desc: 'Main resource; languages add intents and slot types'
                   },
                   {
                     title: 'Intent',
                     desc: 'The goal a user wants to achieve; each intent has sample utterances'
                   },
                   {
                     title: 'Utterances',
                     desc: 'Phrases users say to trigger an intent; can contain slot names in braces to capture values'
                   },
                   {
                     title: 'Slots',
                     desc: 'Pieces of information required to fulfill an intent; each has a slot type (e.g., Number, Date)'
                   },
                   {
                     title: 'Initial Response',
                     desc: 'Sent after the intent is determined but before slot values are elicited'
                   },
                   {
                     title: 'Confirmation',
                     desc: 'Validates intent details with the user before proceeding'
                   },
                   {
                     title: 'Fulfillment',
                     desc: 'Messages that inform the user about the status of completing the intent'
                   },
                   {
                     title: 'Closing Response',
                     desc: 'Sent after fulfillment to end the conversation'
                   }
                 ].map((item, i) => (
                   <div
                     key={i}
                     className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition"
                   >
                     <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                       <span className="w-6 h-6 rounded-full bg-white/10 text-xs flex items-center justify-center text-white/80">
                         {String(i + 1).padStart(2, '0')}
                       </span>
                       {item.title}
                     </h4>
                     <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                   </div>
                ))}
               </div>
             </div>
           </motion.div>
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
              <Globe className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition" />
              {/* <Twitter className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition" /> */}
              <Mail className="w-5 h-5 text-white/60 hover:text-white cursor-pointer transition" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}