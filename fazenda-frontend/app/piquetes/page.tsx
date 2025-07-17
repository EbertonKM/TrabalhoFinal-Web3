'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { Piquete } from "@/types/Piquete";
import { deletePiquete, getPiquetes } from "@/lib/piquetesAPI";

export default function Home() {
  const [piquetes, setPiquetes] = useState<Piquete[]>([])

  const carregarPiquetes = async () => {
    const res = await getPiquetes()
    setPiquetes(res.data)
  }

  useEffect(() => {
    carregarPiquetes()
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm('Deseja remover o piquete ' + id + '?')) {
      await deletePiquete(id);
      carregarPiquetes();
    }
  };

  return (
    <div className="list-page">
      <h1>Lista de piquetes:</h1>
      <Link className="list-add" href={'/piquetes/new'}>Cadastra piquete</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Atividade</th>
            <th>Cultivo</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {piquetes.map((a) =>
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.nome}</td>
              <td>{a.atividade}</td>
              <td>{a.cultivo}</td>
              <td><Link href={`/piquetes/${a.id}`}>+</Link></td>
              <td><button onClick={() => { handleDelete(a.id) }}>X</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
