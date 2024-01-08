function validarUser(body){
    if (body.name === undefined
        || body.name.trim() === ""
        || body.surname === undefined
        || body.surname.trim() === ""
        || body.email === undefined
        || body.email.trim() === ""
        || body.password === undefined
        || body.password.trim() === ""
        || body.rol === undefined
        || body.rol.trim() === "") {
        return {
            valido: false,
            mensaje: "falta name, surname, email, rol o password"
        }
    }
    else{
        return {
            valido: true,
            mensaje: null,
        }
    }
}

module.exports = {
    validarUser,
}