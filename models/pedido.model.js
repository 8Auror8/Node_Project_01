const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pedidoSchema = new Schema({
    comprador:{
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref:"books",
        required: true,

    },
    unidades:{
        type: Number,
        required: true,
    }
})

const Pedido = mongoose.model("pedidos", pedidoSchema)

module.exports = Pedido