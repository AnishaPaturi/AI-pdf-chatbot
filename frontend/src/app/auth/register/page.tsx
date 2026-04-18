'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const data = await authAPI.register(name, email, phone, password);
      setToken(data.access_token);

      const user = {
        id: data.user_id,
        name: data.name,
        email: data.email,
        phone: phone,
        created_at: new Date().toISOString(),
      };
      setUser(user);

      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Registration failed. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-950" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
            <p className="text-slate-400">Join DocuMind and start chatting with your PDFs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                  required
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-400">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900/50 text-slate-500">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link href="/auth/login">
            <button className="w-full py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition border border-slate-700">
              Sign in
            </button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          By creating an account, you agree to our Terms of Service
        </p>
      </motion.div>
    </div>
  );
}
