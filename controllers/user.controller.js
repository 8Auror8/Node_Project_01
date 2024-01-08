const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {encriptar, comprobar} = require('../helpers/encriptacion')
const Users = require('../models/user.model')

async function findAllUsers(){
    const allUsers = await User.find()
    return allUsers
}

async function buscarTodosPorMail(mail){
    const usuarios = await User.find({email: mail})
    return usuarios
}

async function buscarUnoPorMail(mail){
    const usuarioMail = await User.findOne({email: mail})
    return usuarioMail
}

async function findUserId(id){
    const userFound = await User.findById(id)
    return userFound
}


async function createUser(nam, sur, ema, pass, rol){
    const hash = await encriptar(pass)
    const newUser = new User({
        name: nam,
        surname: sur,
        email: ema,
        password: hash,
        rol: rol,
    })

    await newUser.save()

    return newUser
}

async function login(mail, pwd){
    const usuarioEncontrado = await User.findOne({email:mail})
    if(usuarioEncontrado){
        const resultadoComparacion = await comprobar(usuarioEncontrado.password, pwd)
        if(resultadoComparacion){
            const token = jwt.sign({id:usuarioEncontrado._id, name:usuarioEncontrado.email},process.env.JWTSecret,{expiresIn:'1h'})
            return{
                usuario: usuarioEncontrado,
                token: token,
                msg: null,
            }
        }
        else{
            return{
                usuario: null,
                token: null,
                msg: "password incorrecta"
            }
        }
    }
    else{
        return{
            usuario: null,
            token: null,
            msg: "email no encontrado"
        }
    }
}

async function deleteUser(id){
    const deleteTheUser = await User.findByIdAndDelete(id)
    return deleteTheUser
}

async function modifyUser(id, nam, sur, ema, pass){
    // importante, findByIdAndUpdate me devuelve el objeto antiguo (previo a la modificación)
    const userToModify =  await User.findByIdAndUpdate(id, {name: nam, surname: sur, email: ema, password: pass})
    return userToModify
}




module.exports  = {
    findAllUsers,
    findUserId,
    createUser,
    deleteUser,
    modifyUser,
    buscarTodosPorMail,
    buscarUnoPorMail,
    login
}