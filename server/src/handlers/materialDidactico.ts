import { Request, Response } from 'express'
import Material from '../models/Material.model'
import {check, validationResult} from 'express-validator'
import colors from "colors";


// Crea material mediante HTTP
export const createMaterial = async (req: Request, res: Response) => {
    try {

        //Ningun campo puede estar vacio
        await check('tipo').notEmpty().withMessage('El campo tipo no puede ir vacio').run(req)
        await check('url').notEmpty().withMessage('El campo url no puede ir vacio').run(req)

        let errors = validationResult(req)

        if (!errors.isEmpty()) {

            //Mostrar en consola que hubo un error
            console.log(colors.red('ERROR AL CREAR MATERIAL DIDACTICO'))

            //Regresar peticion con array de errores (error 400)
            return res.status(400).json({errors: errors.array()})
        }

        //Enviar datos de material a base de datos
        const user = await Material.create(req.body)
        res.json({data: user})
    } catch (error) {
        console.log(colors.red(error))
    }
}

// Obten todos los materiales
export const getMaterials = async (req: Request, res: Response) => {
    try {
        console.log(colors.green("Solicitaron a todos los Materials"))

        const materials = await Material.findAll({
            order: [
                ['id_material_didactico', 'DESC']
            ]
        })
        res.json({data: materials})
    } catch (error) {
        console.log(error)
    }
}

// Solicita material por id
export const getMaterialById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const materialId = await Material.findByPk(id)

        console.log(colors.green("Solicitaron al material:") + id)

        if(!materialId) {
            return res.status(404).json({
                error: 'Material no encontrado'
            })
        }

        res.json({data: materialId})
    } catch (error) {
        console.log(error)
    }
}

// Actualizar Material
export const updateMaterial = async (req: Request, res: Response) => {
    const { id } = req.params
    const materialID = await Material.findByPk(id)

    console.log(colors.blue("Actualice al Material con el id: " + id))

    if(!materialID) {
        return res.status(404).json({
            error: 'Material no encontrado'
        })
    }

    // Actualizar
    await materialID.update(req.body)
    await materialID.save()
    res.json({data: materialID})
}

// Eliminar Material
export const deleteMaterial = async (req: Request, res: Response) => {
    const { id } = req.params
    const material = await Material.findByPk(id)

    if(!material) {
        return res.status(404).json({
            error: 'Material No Encontrado'
        })
    }

    await material.destroy()
    res.json({data: 'Material Eliminado'})
}