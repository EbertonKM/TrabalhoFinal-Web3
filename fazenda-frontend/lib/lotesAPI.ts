import axios from 'axios';
import { Lote, CreateLote, UpdateLote } from '@/types/Lote';

const api = axios.create({
  baseURL: 'http://localhost:3000/lotes',
});

export const getLotes = () => api.get<Lote[]>('/');
export const getLote = (id: number) => api.get<Lote>(`/${id}`);
export const createLote = (data: CreateLote) => api.post<Lote>('/', data);
export const updateLote = (id: number, data: UpdateLote) => api.patch<Lote>(`/${id}`, data);
export const deleteLote = (id: number) => api.delete(`/${id}`);