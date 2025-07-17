'use client'
import { getLote, updateLote } from "@/lib/lotesAPI";
import { Lote, UpdateLote } from "@/types/Lote";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Piquete } from "@/types/Piquete";
import { getPiquetes } from "@/lib/piquetesAPI";

export default function EditarLote() {
    const router = useRouter()
    const params = useParams()
    const id = params.id
    const [lote, setLote] = useState<Lote>()
    const [piquetes, setPiquetes] = useState<Piquete[]>([])
    const [form, setForm] = useState<UpdateLote>({ categoria: '', piqueteId: undefined })

    const carregarLote = async () => {
        const res = await getLote(Number(id))
        setLote(res.data)
    }

    const carregarPiquetes = async () => {
        const res = await getPiquetes()
        setPiquetes(res.data)
    }

    useEffect(() => {
        carregarLote()
        carregarPiquetes()
    }, []);

    useEffect(() => {
        if (lote) {
            setForm({
                categoria: lote.categoria ?? '',
                piqueteId: lote.piqueteId ?? undefined
            })
        }
    }, [lote]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === 'piqueteId') {
            if (Number(e.target.value) === 0) {
                setForm({ ...form, piqueteId: undefined });
                return
            }
            setForm({ ...form, piqueteId: Number(e.target.value) });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateLote(Number(id), form);
        router.push('/lotes');
    };

    return (
        <div className="edit-page">
            <h1>Editar lote</h1>
            {!lote ? (
                <p>Carregando...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="categoria">Categoria</label>
                    <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} required />
                    {/* Não ta modificando o valor do piqueteId, provavelmente o problema é no back */}
                    <select name="piqueteId" value={form.piqueteId ?? 0} onChange={handleChange} required>
                        <option value="0">0 - Nenhum piquete</option>
                        {piquetes.map((a) => (
                            //Precisaria tratar para piquetes já com lotes não serem exibidos
                            <option key={a.id} value={a.id}>{a.id} - {a.nome}</option>
                        ))}
                    </select>
                    <button type="button" className="voltar" onClick={() => { router.push('/lotes') }}>Cancelar</button>
                    <button type="submit">Salvar</button>
                </form>
            )}
        </div>
    );
}