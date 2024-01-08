const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lineasPedidoSchema = new Schema({
    comprador:{
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    lineaPedido: [{
        type: mongoose.Types.ObjectId,
        ref:"lineasPedido",
        required: true,

    }]
})

const lineaPedido = mongoose.model("Lineaspedidos", lineasPedidoSchema)

module.exports = lineaPedido