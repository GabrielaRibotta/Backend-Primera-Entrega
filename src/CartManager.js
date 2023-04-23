import {promises as fs} from 'fs'


export class CartManager {
    constructor(path) {
        this.path = path
    }

    static incrementID(){
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    //Crear carrito
    async createCart(){
        const data = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(data)
        const cart = {
            id: CartManager.incrementID(),
            products: []
        }
        carts.push(cart)
        await fs.writeFile(this.path, JSON.stringify(carts))
        return "Carrito creado."
    }

    //Buscar carrito por id
    async getCartById(id){
        const data = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(data)
        const cartById = carts.some(el => el.id === parseInt(id))
        if(cartById){
            return carts.find(el => el.id === parseInt(id))
        } else {
            return "Carrito no encontrado."
        }
    }

    //Agregar producto a carrito
    async addProductToCart(idCart, idProduct, newQuantity){
        const data = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(data)
        const cartById = carts.find(el => el.id === parseInt(idCart))
        const productIsInCart = cartById.products.some(el => el.id === parseInt(id))
        if(productIsInCart){
            //Modifico la cantidad del producto en el cart
            const product = carts.find(el => el.id === parseInt(idProduct))
            product.quantity = quantity + newQuantity
            cartById.products.push(product)
            return "Cantidad modificada en el carrito."
        } else {
            //Creo el objeto con idProduct y quantity
            const newProduct = {id: idProduct, quantity: newQuantity}
            //Guardo en el carrito
            cartById.products.push(newProduct)
        }
        //Escribir en el txt
        await fs.writeFile(this.path, JSON.stringify(cartById))
        return "Producto agregado al carrito."
    }
}