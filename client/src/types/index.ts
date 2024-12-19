import { object, string, number,optional, Output, array } from 'valibot'


export const UserSchema = object({
    id_usuario : number(),
    nombre : string(),
    email :optional(string()) ,
    password : optional(string()),
    rol : optional(string())
})

export const UserEditSchema = object({
    nombre : string(),
    password : string(),
    rol : string()
})

export const DraftUserSchema = object({
    nombre: string(),
    email: string(),
    password: string(),
    rol : string()
})

export const MateriaSchema = object({
    id_materia: optional(number()),
    titulo: optional(string()),
    descripcion: optional(string()),
});

export const MaterialSchema = object({
    id_material_didactico: optional(number()),
    tipo: optional(string()),
    url : optional(string()),
});

export const CourseSchema = object({
    id_curso: number(),
    id_usuario: number(),
    id_materia: number(),
    id_material_didactico: number(),
    usuario_nombre: string(),
    usuario_email: string(),
    materia_titulo: string(),
    material_tipo: string(),
    material_url: string(),
});

export const DraftCourseSchema = object({
    id_usuario: string(),
    id_materia: string(),
    id_material_didactico: string()});


export const UsersSchema = array(UserSchema)
export type User = Output<typeof UserSchema>
export type UserEdit = Output<typeof UserEditSchema>

export const CoursesSchema = array(CourseSchema)
export type Course = Output<typeof CourseSchema>

export const MateriasSchema = array(MateriaSchema)
export type Materia = Output<typeof MateriaSchema>

export const MaterialesSchema = array(MaterialSchema)
export type Material = Output<typeof MaterialSchema>
