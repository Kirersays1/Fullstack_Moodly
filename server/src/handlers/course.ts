import { Request, Response } from 'express'
import Course from '../models/Course.model'
import {check, validationResult} from 'express-validator'
import colors from "colors";


// Crea curso mediante HTTP
export const createCourse = async (req: Request, res: Response) => {
    try {
        //Ningun campo puede estar vacio
        await check('id_usuario').notEmpty().withMessage('El id_usuario no puede ir vacio').run(req)
        await check('id_materia').notEmpty().withMessage('El id_materia no puede ir vacio').run(req)
        await check('id_material_didactico').notEmpty().withMessage('El id_material_didactico no puede ir vacio').run(req)

        let errors = validationResult(req)

        if (!errors.isEmpty()) {

            //Mostrar en consola que hubo un error
            console.log(colors.red('ERROR AL REGISTRAR A CURSO'))

            //Regresar peticion con array de errores (error 400)
            return res.status(400).json({errors: errors.array()})
        }

        //Enviar datos de usuario a base de datos
        const course = await Course.create(req.body)
        res.json({data: course})
    } catch (error) {
        console.log(colors.red(error))
    }
}

// Obten todos los cursos
export const getCourses = async (req: Request, res: Response) => {
    try {
        console.log(colors.green("Solicitaron a todos los usuarios"))

        const courses = await Course.findAll({
            order: [
                ['id_curso', 'DESC']
            ]
        })
        res.json({data: courses})
    } catch (error) {
        console.log(error)
    }
}

// Solicita curso por id
export const getCourseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const courseId = await Course.findByPk(id)

        console.log(colors.green("Solicitaron al curso:") + id)

        if(!courseId) {
            return res.status(404).json({
                error: 'Curso no encontrado'
            })
        }

        res.json({data: courseId})
    } catch (error) {
        console.log(error)
    }
}

// Actualizar curso
export const updateCourse = async (req: Request, res: Response) => {
    const { id } = req.params
    const courseID = await Course.findByPk(id)

    console.log(colors.blue("Actualice CURSO con el id: " + id))

    if(!courseID) {
        return res.status(404).json({
            error: 'Curso no encontrado'
        })
    }
    
    // Actualizar
    await courseID.update(req.body)
    await courseID.save()
    res.json({data: courseID})
}

// Eliminar curso
export const deleteCourse = async (req: Request, res: Response) => {
    const { id } = req.params
    const course = await Course.findByPk(id)
    if(!course) {
        return res.status(404).json({
            error: 'Curso No Encontrado'
        })
    }
    
    await course.destroy()
    res.json({data: 'Curso Eliminado'})
}