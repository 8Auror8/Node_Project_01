const { validarUser } = require("../helpers/uservalidator")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { findUserId, buscarUnoPorMail } = require('../controllers/user.controller')
const { findById } = require("../models/user.model")

function middlewareCrearUser(req, res, next){
    const resultadoValidacion = validarUser(req.body)
    if(resultadoValidacion.valido){
        next()
    }
    else{
        res.status(400).json({msg:resultadoValidacion.mensaje})
    }
}

function middlewareEmailValidacion(req, res, next){
    if(req.body.email.includes("@")){
        next()
    }
    else{
        res.status(400).json({msg: "el formato de mail no es correcto"})
    }
}

function estaLoggeado(req, res, next){
    if(req.query.token){
        try{
            const resultado = jwt.verify(req.query.token, process.env.JWTSECRET)
            if(resultado.id === req.params.id){
                next()
            }
            else{
                res.status(403).json({msg: 'No tienes permisos para este recurso'})
            }
        }
        catch(error){
            res.status(401).json({msg: 'token no valido'})
        }
    }
    else{
        res.status(400).json({msg: "no has proporcionado token"})
    }
}

async function esAdmin(req, res, next){
    if(req.query.token){
        try{
            const resultado = jwt.verify(req.query.token, process.env.JWTSECRET)
            const usuarioAdmin = await findUserId(resultado.id)
            if(usuarioAdmin.rol === "admin"){
                next()
            }
            else{
                res.status(403).json({msg: 'No tienes permisos para este recurso'})
            }
        }
        catch(error){
            res.status(401).json({msg: 'token no valido'})
        }
    }
    else{
        res.status(400).json({msg: "no has proporcionado token"})
    }
}

async function esMailDuplicado(req,res,next){
    const usuarioMismoMail = await buscarUnoPorMail(req.body.email)
    if(usuarioMismoMail){
        res.status(400).json({msg:"email duplicado"})
    }
    else{
        next()
    }
}




module.exports = {
    middlewareCrearUser,
    middlewareEmailValidacion,
    estaLoggeado,
    esAdmin,
    esMailDuplicado
}