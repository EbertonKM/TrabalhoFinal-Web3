'use client'
import { createLote } from "@/lib/lotesAPI";
import { CreateLote } from "@/types/Lote";
import { useRouter } from "next/navigation";
import React, { useState } from "react"

export default function NovoLote() {
    const router = useRouter()
    const [form, setForm] = useState<CreateLote>({ categoria: ''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createLote(form);
        router.push('/lotes');
    };

    return (
        <div className="add-page">
            <h1>Novo lote</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="categoria">Categoria</label>
                <input name="categoria" placeholder="Categoria" onChange={handleChange} required />
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}