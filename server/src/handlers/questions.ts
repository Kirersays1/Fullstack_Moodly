import { Request, Response } from 'express'
import User from '../models/User.model'
import colors from "colors";

export const createQuestion = async (req: Request, res: Response) => {
    try {
        console.log(colors.blue(req.body))
        const user = await User.create(req.body)
        res.json({data: user})
    } catch (error) {
        console.log(colors.red(error))
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        console.log(colors.blue("Solicitaron a todos los usuarios"))
        const products = await User.findAll({
            order: [
                ['id_usuario', 'DESC']
            ]
        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

/*
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }

        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req : Request, res : Response) => {
    try {
        const product = await Product.create(req.body)
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    // Actualizar
    await product.update(req.body)
    await product.save()
    res.json({data: product})
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    // Actualizar
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
    
    await product.destroy()
    res.json({data: 'Producto Eliminado'})
}*/