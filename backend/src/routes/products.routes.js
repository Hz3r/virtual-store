import express from 'express'
import Product from "../models/Product.js";

const router = express.Router()

router.get('/products',async (req,res) => {
    
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        console.error('Error al obtener los productos', error);
        res.status(500).json({
            message: 'Hubo un error al obtener los productos'
        })

    }
})

router.get('/products/:id',async (req,res) => {
    const {id} = req.params

    try {
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({
                message:'producto no encontrado'
            })
        }

        res.status(200).json(product)


    } catch (error) {

        console.error('Error al obtener el producto', error);
        res.status(500).json({
            message: 'Hubo un error al obtener el producto'
        });
    }
})






export default router
