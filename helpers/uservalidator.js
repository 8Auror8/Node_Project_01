function validarUser(body){
    if (body.name === undefined
        || body.name.trim() === ""
        || body.surname === undefined
        || body.surname.trim() === ""
        || body.email === undefined
        || body.email.trim() === ""
        || body.password === undefined
        || body.password.trim() === "") {
        return {
            valido: false,
            mensaje: "falta name, surname, email o password"
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