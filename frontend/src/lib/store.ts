import { create } from 'zustand';
import { UserData } from './api';

interface AuthStore {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: UserData | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  selectedDocuments: number[];
  addMessage: (role: 'user' | 'bot', content: string) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setSelectedDocuments: (ids: number[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  selectedDocuments: [],
  addMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { id: Date.now().toString(), role, content, timestamp: new Date() },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
  setLoading: (isLoading) => set({ isLoading }),
  setSelectedDocuments: (ids) => set({ selectedDocuments: ids }),
}));
