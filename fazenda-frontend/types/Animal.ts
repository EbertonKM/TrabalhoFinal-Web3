export interface Animal {
  id: number;
  identificador: string;
  raca?: string;
  peso?: string;
  sexo?: string;
  loteId?: number;
}

export interface CreateAnimal {
  identificador: string;
  raca?: string;
  peso?: string;
  sexo?: string;
  loteId?: number;
}

export interface UpdateAnimal {
  identificador?: string;
  raca?: string;
  peso?: string;
  sexo?: string;
  loteId?: number;
}
