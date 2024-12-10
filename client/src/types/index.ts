import { object, string, number, boolean, Output, array } from 'valibot'

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id : number(),
    name : string(),
    price : number(),
    availability : boolean()
})

export const UserSchema = object({
    id_usuario : number(),
    nombre : string(),
    email : string(),
    password : string(),
    rol : string()
})

export const DraftUserSchema = object({
    nombre: string(),
    email: string(),
    password: string(),
    rol : string()
})

export const ProductsSchema = array(ProductSchema)
export type Product = Output<typeof ProductSchema>

export const UsersSchema = array(UserSchema)
export type User = Output<typeof UserSchema>
