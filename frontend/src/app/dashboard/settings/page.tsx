'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Bell, Shield, Trash2, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Chat
        </button>

        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold">Account</h2>
            </div>
            <p className="text-slate-400 text-sm">Manage your account settings</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            <p className="text-slate-400 text-sm">Configure notification preferences</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold">Privacy & Security</h2>
            </div>
            <p className="text-slate-400 text-sm">Control your data and security settings</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-semibold">Data Management</h2>
            </div>
            <p className="text-slate-400 text-sm">Delete your documents and chat history</p>
          </div>

          <button
            onClick={() => router.push('/auth/login')}
            className="w-full bg-red-600/20 border border-red-600/50 hover:bg-red-600/30 text-red-400 p-4 rounded-xl flex items-center gap-3 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
