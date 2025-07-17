import axios from 'axios';
import { Piquete, CreatePiquete, UpdatePiquete } from '@/types/Piquete';

const api = axios.create({
  baseURL: 'http://localhost:3000/piquetes',
});

export const getPiquetes = () => api.get<Piquete[]>('/');
export const getPiquete = (id: number) => api.get<Piquete>(`/${id}`);
export const createPiquete = (data: CreatePiquete) => api.post<Piquete>('/', data);
export const updatePiquete = (id: number, data: UpdatePiquete) => api.patch<Piquete>(`/${id}`, data);
export const deletePiquete = (id: number) => api.delete(`/${id}`);