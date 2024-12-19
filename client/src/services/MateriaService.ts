import {safeParse} from 'valibot';
import axios from 'axios';
import {MateriaSchema, Materia, MateriasSchema} from "../types";

type UserData = {
    [k: string]: FormDataEntryValue;
}

export async function addMateria(data : UserData) {
    try {
        const result = safeParse(MateriaSchema, {
            titulo: data.titulo,
            descripcion: data.descripcion
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/materia/create`
            await axios.post(url, {
                titulo: result.output.titulo,
                descripcion: result.output.descripcion,
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getMaterias() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/materia/getAll`
        const {data} = await axios(url)
        const result = safeParse(MateriasSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getMateriaById(id : Materia['id_materia']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/materia/${id}`
        const {data } = await axios(url)
        console.log(data)
        const result = safeParse(MateriaSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteMateria(id: Materia['id_materia']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/materia/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}


export async function updateMateria(data : UserData, id: Materia['id_materia'] ) {
    try {
        const result = safeParse(MateriaSchema, {
            titulo: data.titulo,
            descripcion: data.descripcion,
        })
        console.log(result)

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/materia/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}
