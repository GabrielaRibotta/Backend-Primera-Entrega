import express from 'express'
import productRouter from './routes/product.routes'
import cartRouter from './routes/cart.routes'

const app = express()
const PORT = 8080


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes
app.use('/products', productRouter)
app.use('api/carts', cartRouter)


app.listen(PORT, () =>{
    console.log(`Server on port ${PORT}`)
})