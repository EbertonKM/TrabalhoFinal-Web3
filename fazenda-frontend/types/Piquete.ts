export interface Piquete {
  id: number;
  nome: string;
  atividade: string;
  cultivo: string;
}

export interface CreatePiquete {
  nome: string;
  atividade: string;
  cultivo: string;
}

export interface UpdatePiquete {
  nome?: string;
  atividade?: string;
  cultivo?: string;
}