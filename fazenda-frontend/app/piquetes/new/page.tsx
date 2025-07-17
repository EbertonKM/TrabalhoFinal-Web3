'use client'
import { createPiquete } from "@/lib/piquetesAPI";
import { CreatePiquete } from "@/types/Piquete";
import { useRouter } from "next/navigation";
import React, { useState } from "react"

export default function NovoPiquete() {
    const router = useRouter()
    const [form, setForm] = useState<CreatePiquete>({ nome: '', atividade: '', cultivo: ''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createPiquete(form);
        router.push('/piquetes');
    };

    return (
        <div className="add-page">
            <h1>Novo piquete</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome</label>
                <input name="nome" placeholder="Nome" onChange={handleChange} required />
                <label htmlFor="atividade">Atividade</label>
                <input name="atividade" placeholder="Atividade" onChange={handleChange} required />
                <label htmlFor="cultivo">Cultivo</label>
                <input name="cultivo" placeholder="Cultivo" onChange={handleChange} required />
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}