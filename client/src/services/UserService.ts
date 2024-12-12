import {coerce, safeParse} from 'valibot';
import axios from 'axios';
import { DraftUserSchema, User, UserSchema, UsersSchema} from "../types";

type UserData = {
    [k: string]: FormDataEntryValue;
}

export async function addUser(data : UserData) {
    try {
        const result = safeParse(DraftUserSchema, {
            nombre: data.nombre,
            email: data.email,
            password : data.password,
            rol : data.rol,

        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/user/create`
            await axios.post(url, {
                nombre: result.output.nombre,
                email: result.output.email,
                password : result.output.password,
                rol : result.output.rol,
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getUsers() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/user/getAll`
        const {data} = await axios(url)
        const result = safeParse(UsersSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getUserById(id : User['id_usuario']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/user/${id}`
        const {data } = await axios(url)
        console.log(data)
        const result = safeParse(UserSchema, data.data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteUser(id: User['id_usuario']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/user/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}


export async function updateUser(data : UserData, id: User['id_usuario'] ) {
    try {
        const NumberSchema = coerce(number(), Number)

        const result = safeParse(UserSchema, {
            id,
            nombre: data.nombre,
            password: parse(NumberSchema, data.price),
            rol: toBoolean(data.availability.toString())
        })

        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/user/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}
