import { Request, Response } from 'express'
import Test from '../models/Test.model'
import {check, validationResult} from 'express-validator'
import colors from "colors";


// Crea usuario mediante HTTP
export const createTest = async (req: Request, res: Response) => {
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
        const test = await Test.create(req.body)
        res.json({data: test})
    } catch (error) {
        console.log(colors.red(error))
    }
}

// Obten todos los usuarios
export const getTests = async (req: Request, res: Response) => {
    try {
        console.log(colors.green("Solicitaron a todos los usuarios"))

        const users = await Test.findAll({
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
export const getTestById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const TestId = await Test.findByPk(id)

        console.log(colors.green("Solicitaron al usuario:") + id)

        if(!TestId) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            })
        }

        res.json({data: TestId})
    } catch (error) {
        console.log(error)
    }
}

// Actualizar usuario
export const updateTest = async (req: Request, res: Response) => {
    const { id } = req.params
    const testID = await Test.findByPk(id)

    console.log(colors.blue("Actualice al usuario con el id: " + id))

    if(!testID) {
        return res.status(404).json({
            error: 'Usuario no encontrado'
        })
    }
    
    // Actualizar
    await testID.update(req.body)
    await testID.save()
    res.json({data: testID})
}

// Eliminar usuario
export const deleteTest = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await Test.findByPk(id)

    if(!user) {
        return res.status(404).json({
            error: 'Usuario No Encontrado'
        })
    }
    
    await user.destroy()
    res.json({data: 'Usuario Eliminado'})
}