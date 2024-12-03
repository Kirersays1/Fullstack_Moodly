import { Request, Response } from 'express'
import Materia from '../models/Materia.model'
import {check, validationResult} from 'express-validator'
import colors from "colors";

export const createMateria = async (req: Request, res: Response) => {
    try {
        //Ningun campo puede estar vacio
        await check('titulo').notEmpty().withMessage('El campo titulo no puede ir vacio').run(req)
        await check('descripcion').notEmpty().withMessage('El campo descripcion no puede ir vacio').run(req)
        let errors = validationResult(req)

        if (!errors.isEmpty()) {

            //Mostrar en consola que hubo un error
            console.log(colors.red('ERROR AL CREAR MATERIA'))

            //Regresar peticion con array de errores (error 400)
            return res.status(400).json({errors: errors.array()})
        }
        const materia = await Materia.create(req.body)
        res.json({data: materia})
    } catch (error) {
        console.log(colors.red(error))
    }
}

export const getMaterias = async (req: Request, res: Response) => {
    try {
        console.log(colors.green("Solicitaron a todas las materias"))
        const materias = await Materia.findAll({
            order: [
                ['id_materia', 'DESC']
            ]
        })
        res.json({data: materias})
    } catch (error) {
        console.log(error)
    }
}

export const getMateriaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const materia = await Materia.findByPk(id)

        if(!materia) {
            return res.status(404).json({
                error: 'Materia no encontrada'
            })
        }

        res.json({data: materia})
    } catch (error) {
        console.log(error)
    }
}


export const updateMateria = async (req: Request, res: Response) => {
    const { id } = req.params
    const materia = await Materia.findByPk(id)

    if(!materia) {
        return res.status(404).json({
            error: 'Materia no encontrada'
        })
    }
    
    // Actualizar
    await materia.update(req.body)
    await materia.save()
    res.json({data: materia})
}

export const deleteMateria = async (req: Request, res: Response) => {
    const { id } = req.params
    const materia = await Materia.findByPk(id)

    if(!materia) {
        return res.status(404).json({
            error: 'Materia no encontrada'
        })
    }
    
    await materia.destroy()
    res.json({data: 'Materia Eliminada'})
}