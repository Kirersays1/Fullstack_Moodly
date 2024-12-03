import { Request, Response } from 'express'
import User from '../models/User.model'
import {check, validationResult} from 'express-validator'
import colors from "colors";


// Crea usuario mediante HTTP
export const createUser = async (req: Request, res: Response) => {
    try {
        //Ningun campo puede estar vacio
        await check('nombre').notEmpty().withMessage('El campo nombre no puede ir vacio').run(req)
        await check('email').notEmpty().withMessage('El campo email no puede ir vacio').run(req)
        await check('password').notEmpty().withMessage('El campo password no puede ir vacio').run(req)
        await check('rol').notEmpty().withMessage('El campo rol no puede ir vacio').run(req)

        let errors = validationResult(req)

        if (!errors.isEmpty()) {

            //Mostrar en consola que hubo un error
            console.log(colors.red('ERROR AL CREAR USUARIO'))

            //Regresar peticion con array de errores (error 400)
            return res.status(400).json({errors: errors.array()})
        }

        //Enviar datos de usuario a base de datos
        const user = await User.create(req.body)
        res.json({data: user})
    } catch (error) {
        console.log(colors.red(error))
    }
}

// Obten todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
    try {
        console.log(colors.green("Solicitaron a todos los usuarios"))

        const users = await User.findAll({
            order: [
                ['id_usuario', 'DESC']
            ]
        })
        res.json({data: users})
    } catch (error) {
        console.log(error)
    }
}

// Solicita usuario por id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userId = await User.findByPk(id)

        console.log(colors.green("Solicitaron al usuario:") + id)

        if(!userId) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            })
        }

        res.json({data: userId})
    } catch (error) {
        console.log(error)
    }
}

// Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const userID = await User.findByPk(id)

    console.log(colors.blue("Actualice al usuario con el id: " + id))

    if(!userID) {
        return res.status(404).json({
            error: 'Usuario no encontrado'
        })
    }
    
    // Actualizar
    await userID.update(req.body)
    await userID.save()
    res.json({data: userID})
}

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await User.findByPk(id)

    if(!user) {
        return res.status(404).json({
            error: 'Usuario No Encontrado'
        })
    }
    
    await user.destroy()
    res.json({data: 'Usuario Eliminado'})
}