const {Product} = require("../models/Product");

const ProductController ={
    async create(req,res){
        try {
            const product = await Product.create({...req.body })
            res.status(201).send(product)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el producto' })
        }
    },
}
module.exports = ProductController;