import {safeParse} from 'valibot';
import axios from 'axios';
import {MaterialesSchema, Material, MaterialSchema} from "../types";

type UserData = {
    [k: string]: FormDataEntryValue;
}

export async function addMaterial(data : UserData) {
    try {
        const result = safeParse(MaterialSchema, {
            tipo: data.tipo,
            url: data.url
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/materialD/create`
            await axios.post(url, {
                tipo: result.output.tipo,
                url: result.output.url,
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getMateriales() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/materialD/getAll`
        const {data} = await axios(url)
        const result = safeParse(MaterialesSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getMaterialById(id : Material['id_material_didactico']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/materialD/${id}`
        const {data } = await axios(url)
        console.log(data)
        const result = safeParse(MaterialSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteMaterial(id: Material['id_material_didactico']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/materialD/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}


export async function updateMaterial(data : UserData, id: Material['id_material_didactico'] ) {
    try {
        const result = safeParse(MaterialSchema, {
            tipo: data.tipo,
            url: data.url,
        })
        console.log(result)

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/materialD/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}
