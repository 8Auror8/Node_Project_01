const bcrypt = require('bcryptjs');

// pwd => recibe contraseña texto plano y devuelve el hash


async function encriptar(pwd){
    //decidimos el número de rondas o saltos a usar
    const salt = await bcrypt.genSalt(12)
    //creamos el hash
    const hash = await bcrypt.hash(pwd, salt)
    return hash
}

//recibe hash y contraseña en plano para comprobar si hacen match y devuelve true or false
async function comprobar(hash, pwd){
    const resultado = await bcrypt.compare(pwd, hash)
    return resultado
}

module.exports = {
    encriptar,
    comprobar
}