import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  email: string;
  name: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export interface DocumentData {
  id: number;
  filename: string;
  chunk_count: number;
  created_at: string;
}

export const authAPI = {
  register: async (name: string, email: string, phone: string, password: string) => {
    const response = await api.post<LoginResponse>('/register', {
      name,
      email,
      phone,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post<LoginResponse>('/login', {
      email,
      password,
    });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get<UserData>('/me');
    return response.data;
  },
};

export const documentAPI = {
  upload: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getDocuments: async () => {
    const response = await api.get('/documents');
    return response.data;
  },
};

export const chatAPI = {
  chat: async (query: string, documentIds?: number[]) => {
    const response = await api.post('/chat', {
      query,
      document_ids: documentIds,
    });
    return response.data;
  },

  getHistory: async (limit: number = 50) => {
    const response = await api.get(`/history?limit=${limit}`);
    return response.data;
  },

  getSummary: async (documentId?: number) => {
    const params = documentId ? { document_id: documentId } : {};
    const response = await api.post('/summary', params);
    return response.data;
  },
};

export interface HighlightData {
  id: number;
  document_id: number;
  text: string;
  color: string;
  page_number: number;
  created_at: string;
}

export interface NoteData {
  id: number;
  document_id: number;
  content: string;
  page_number: number;
  created_at: string;
}

export const highlightAPI = {
  create: async (documentId: number, text: string, color: string = "#FFEB3B", pageNumber: number = 1) => {
    const response = await api.post('/highlights', {
      document_id: documentId,
      text,
      color,
      page_number: pageNumber,
    });
    return response.data;
  },

  getAll: async (documentId?: number) => {
    const params = documentId ? { document_id: documentId } : {};
    const response = await api.get('/highlights', { params });
    return response.data;
  },

  delete: async (highlightId: number) => {
    const response = await api.delete(`/highlights/${highlightId}`);
    return response.data;
  },
};

export const noteAPI = {
  create: async (documentId: number, content: string, pageNumber: number = 1) => {
    const response = await api.post('/notes', {
      document_id: documentId,
      content,
      page_number: pageNumber,
    });
    return response.data;
  },

  getAll: async (documentId?: number) => {
    const params = documentId ? { document_id: documentId } : {};
    const response = await api.get('/notes', { params });
    return response.data;
  },

  delete: async (noteId: number) => {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  },
};

export default api;
