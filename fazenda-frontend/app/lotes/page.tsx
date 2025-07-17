'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { Lote } from "@/types/Lote";
import { deleteLote, getLotes } from "@/lib/lotesAPI";

export default function Home() {
  const [lotes, setLotes] = useState<Lote[]>([])

  const carregarLotes = async () => {
    const res = await getLotes()
    setLotes(res.data)
  }

  useEffect(() => {
    carregarLotes()
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm('Deseja remover o lote ' + id + '?')) {
      await deleteLote(id);
      carregarLotes();
    }
  };

  return (
    <div className="list-page">
      <h1>Lista de lotes:</h1>
      <Link className="list-add" href={'/lotes/new'}>Cadastra lote</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoria</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {lotes.map((a) =>
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.categoria}</td>
              <td><Link href={`/lotes/${a.id}`}>+</Link></td>
              <td><button onClick={() => { handleDelete(a.id) }}>X</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}