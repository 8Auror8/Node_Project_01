const Pedido = require('../models/linea.pedido.model')

async function obtenerTodos(){
    const pedidos = await Pedido.find().populate('libro').populate('usuario','-password', '-__v')

    return pedidos
}

async function crearPedido(usuario, libro, cantidad){
    const nuevoPedido = new Pedido({
        comprador: usuario,
        book: libro,
        unidades: cantidad
    })
}
module.exports = {
    obtenerTodos,
    crearPedido
}