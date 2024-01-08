require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routes/user.routes')
const bookRouter = require('./routes/book.routes')
const pedidoRouter = require('./routes/pedido.routes')
const mongoose = require('mongoose');



const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set("secretkey", process.env.JWTSecret)

mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('Conectado a base de datos!'))
    .catch(err=> console.log('err'));



// BUENAS PRÁCTICAS (GOOD PRACTICES)
// ARQUITECTURA LIMPIA (CLEAN ARCHITECTURE)


// importar producto routes
app.use('/books',bookRouter)

// importar usuario routes
app.use('/users',userRouter)


//para pedidos
app.use('/pedidos', pedidoRouter)


app.listen(process.env.PORT)
