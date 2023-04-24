import express from 'express'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'

const app = express()
const PORT = 8080


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


app.listen(PORT, () =>{
    console.log(`Server on port ${PORT}`)
})