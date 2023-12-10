function validarCrearProducto(body){
    if (body.title === undefined
        || body.title.trim() === ""
        || body.author === undefined
        || body.author.trim() === "") {
        return {
            valido: false,
            mensaje: "falta title o author"
        }
    }
    else{
        return {
            valido: true,
            mensaje: "Libro actualizado correctamente!",
        }
    }
}

module.exports = {
    validarCrearProducto,
}