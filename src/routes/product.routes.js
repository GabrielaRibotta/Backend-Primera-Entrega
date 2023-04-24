import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const PRODUCTS_PATH_TXT = './products.txt'
const productManager = new ProductManager(PRODUCTS_PATH_TXT)

const productRouter = Router()

//GET
//Productos + limit
productRouter.get('/', async (req, res) =>{
    //Leer txt
    const products = await productManager.getProducts()
    //limit
    let limit = req.query.limit
    if(!limit){
        return res.send(products)
    }
    const productsLimit = products.slice(0, req.query.limit)
    return res.send(productsLimit)
})

//Producto por id
productRouter.get('/:pid', async (req, res) =>{
    let id = req.params.pid
    //Leer txt
    const products = await productManager.getProductById(id)
    res.send(products)
})

//POST
productRouter.post('/', async (req, res) =>{
    const { title, description, price, thumbnail, code, stock } = req.body
    const newProduct = await productManager.addProduct({ title, description, price, thumbnail, code, stock })
    res.send(newProduct)
})

//PUT
productRouter.put('/:pid', async (req, res) =>{
    let id = req.params.pid
    const { title, description, price, thumbnail, code, stock } = req.body
    const updateProduct = await productManager.updateProduct(id, title, description, price, thumbnail, code, stock)
    res.send(updateProduct)
})

//DELETE
productRouter.delete('/:pid', async (req, res) =>{
    let id = req.params.pid
    //Leer txt
    const delProduct = await productManager.deleteProduct(id)
    res.send(delProduct)
})

export default productRouter