const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routes/user.routes')
const bookRouter = require('./routes/book.routes')
const mongoose = require('mongoose');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



mongoose.connect('mongodb+srv://aurzarcas:94u8yuAv8Ne42fPI@cluster0.nlps2cm.mongodb.net/Library',{
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

app.listen(3000)
