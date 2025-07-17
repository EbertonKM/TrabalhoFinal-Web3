'use client'
import { getAnimal, updateAnimal } from "@/lib/animalsAPI";
import { getLotes } from "@/lib/lotesAPI";
import { Animal, CreateAnimal, UpdateAnimal } from "@/types/Animal";
import { Lote } from "@/types/Lote";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditarAnimal() {
    const router = useRouter()
    const params = useParams()
    const id = params.id
    const [animal, setAnimal] = useState<Animal>()
    const [form, setForm] = useState<UpdateAnimal>({ identificador: '', raca: '', peso: '', sexo: '', loteId: undefined })
    const [lotes, setLotes] = useState<Lote[]>([])

    const carregarAnimal = async () => {
        const res = await getAnimal(Number(id))
        setAnimal(res.data)
    }

    const carregarLotes = async () => {
        const res = await getLotes()
        setLotes(res.data)
    }

    useEffect(() => {
        carregarAnimal()
        carregarLotes()
    }, []);

    useEffect(() => {
        if (animal) {
            setForm({
                identificador: animal.identificador ?? '',
                raca: animal.raca ?? '',
                peso: animal.peso ?? '',
                sexo: animal.sexo ?? '',
                loteId: animal.loteId ?? undefined
            })
        }
    }, [animal]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === 'loteId') {
            if (Number(e.target.value) === 0) {
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
        await updateAnimal(Number(id), form);
        router.push('/animals');
    };

    return (
        <div className="edit-page">
            <h1>Editar animal</h1>
            {!animal ? (
                <p>Carregando...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="identificador">Identificador</label>
                    <input name="identificador" placeholder="Identificador" value={form.identificador} onChange={handleChange} required />
                    <label htmlFor="raca">Raça</label>
                    <input name="raca" placeholder="Raça" value={form.raca} onChange={handleChange} required />
                    <label htmlFor="peso">Peso</label>
                    <input name="peso" placeholder="Peso (Kg)" value={form.peso} onChange={handleChange} required />
                    <label htmlFor="sexo">Sexo</label>
                    <select name="sexo" onChange={handleChange} value={form.sexo} required>
                        <option value="macho">Macho</option>
                        <option value="femea">Fêmea</option>
                    </select>
                    <label htmlFor="loteId">Lote</label>
                    <select name="loteId" value={form.loteId} onChange={handleChange} required>
                        <option value="0">0 - Nenhum lote</option>
                        {lotes.map((a) => (
                            <option key={a.id} value={a.id}>{a.id} - {a.categoria}</option>
                        ))}
                    </select>
                    <button className="voltar" onClick={() => { router.push('/animals') }}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </form>
            )}
        </div>
    );
}