import axios from 'axios';
import { Animal, CreateAnimal, UpdateAnimal } from '@/types/Animal';

const api = axios.create({
  baseURL: 'http://localhost:3000/animals',
});

export const getAnimals = () => api.get<Animal[]>('/');
export const getAnimal = (id: number) => api.get<Animal>(`/${id}`);
export const createAnimal = (data: CreateAnimal) => api.post<Animal>('/', data);
export const updateAnimal = (id: number, data: UpdateAnimal) => api.patch<Animal>(`/${id}`, data);
export const deleteAnimal = (id: number) => api.delete(`/${id}`);