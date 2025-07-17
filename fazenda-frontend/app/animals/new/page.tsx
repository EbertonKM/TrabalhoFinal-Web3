'use client'
import { createAnimal } from "@/lib/animalsAPI";
import { getLotes } from "@/lib/lotesAPI";
import { CreateAnimal } from "@/types/Animal";
import { Lote } from "@/types/Lote";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

export default function NovoAnimal() {
    const router = useRouter()
    const [form, setForm] = useState<CreateAnimal>({ identificador: '', raca: '', peso: '', sexo: 'macho', loteId: undefined})
    const [lotes, setLotes] = useState<Lote[]>([])

    const carregarLotes = async () => {
        const res = await getLotes()
        setLotes(res.data)
    }

    useEffect(() => {
        carregarLotes()
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.name === 'loteId') {
            if(Number(e.target.value) === 0) {
                setForm({ ...form, loteId: undefined });    
                return
            }
            setForm({ ...form, loteId: Number(e.target.value) });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createAnimal(form);
        router.push('/animals');
    };

    return (
        <div className="add-page">
            <h1>Novo animal</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="identificador">Identificador</label>
                <input name="identificador" placeholder="Identificador" onChange={handleChange} required />
                <label htmlFor="raca">Raça</label>
                <input name="raca" placeholder="Raça" onChange={handleChange} required />
                <label htmlFor="peso">Peso</label>
                <input name="peso" placeholder="Peso (Kg)" onChange={handleChange} required />
                <label htmlFor="sexo">Sexo</label>
                <select name="sexo" onChange={handleChange} required>
                    <option value="macho">Macho</option>
                    <option value="femea">Fêmea</option>
                </select>
                <label htmlFor="loteId">Lote</label>
                <select name="loteId" onChange={handleChange} required>
                    <option value="0">0 - Nenhum lote</option>
                    {lotes.map((a) => (
                        <option key={a.id} value={a.id}>{a.id} - {a.categoria}</option>
                    ))}
                </select>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}