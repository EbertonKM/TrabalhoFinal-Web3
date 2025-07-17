export interface Lote {
  id: number;
  categoria: string;
  piqueteId?: number;
}

export interface CreateLote {
  categoria: string;
  piqueteId?: number;
}

export interface UpdateLote {
  categoria?: string;
  piqueteId?: number;
}