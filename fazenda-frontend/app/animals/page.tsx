'use client'
import { deleteAnimal, getAnimals } from "@/lib/animalsAPI";
import { Animal } from "@/types/Animal";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [animais, setAnimais] = useState<Animal[]>([])

  const carregarAnimais = async () => {
    const res = await getAnimals()
    setAnimais(res.data)
  }

  useEffect(() => {
    carregarAnimais()
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm('Deseja remover o animal ' + id + '?')) {
      await deleteAnimal(id);
      carregarAnimais();
    }
  };

  return (
    <div className="list-page">
      <h1>Lista de animais:</h1>
      <Link className="list-add" href={'/animals/new'}>Cadastra animal</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Identificador</th>
            <th>Raça</th>
            <th>Peso</th>
            <th>Sexo</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {animais.map((a) =>
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.identificador}</td>
              <td>{a.raca}</td>
              <td>{a.peso} Kg</td>
              <td>{a.sexo}</td>
              <td><Link href={`/animals/${a.id}`}>+</Link></td>
              <td><button onClick={() => { handleDelete(a.id) }}>X</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
