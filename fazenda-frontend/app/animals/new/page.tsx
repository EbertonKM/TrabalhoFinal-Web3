'use client'
import { createAnimal } from "@/lib/animalsAPI";
import { CreateAnimal } from "@/types/Animal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

export default function Entregas() {
    const router = useRouter()
    const [form, setForm] = useState<CreateAnimal>({ identificador: '', raca: '', peso: '', sexo: ''})

    useEffect(() => {

    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Payload enviado:', form);
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
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}