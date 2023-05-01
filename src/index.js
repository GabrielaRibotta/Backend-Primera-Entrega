import express from 'express'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'

import { engine } from 'express-handlebars'
import { __dirname, __filename } from './path.js'
import * as path from 'path'
import { Server } from 'socket.io'

//Configs
const app = express()
const PORT = 8080

app.listen(PORT, () =>{
    console.log(`Server on port ${PORT}`)
})

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//ServerIO
const io = new Server

io.on('connection', (socket) => {
    console.log("Cliente conectado")
})

//Routes
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.get('/', (req, res)=>{
    res.render('index', {
        title: "Desafio 4"
    })
})


