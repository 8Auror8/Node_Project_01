const express = require('express')
const router = express.Router()

const { findAllUsers, findUserId, createUser, deleteUser, modifyUser, login, buscarTodosPorMail, buscarUnoPorMail} = require('../controllers/user.controller')

/* const { validarUser } = require('../helpers/uservalidator') */

const {middlewareCrearUser, middlewareEmailValidacion, estaLoggeado, esAdmin, esMailDuplicado} = require('../middlewares/usuario_middleware')

//GET de users
router.get("/", async (req, res) => {
    try {
        let usuarios = []
        if(req.query.email){
            usuarios = await buscarTodosPorMail(req.query.email)
        }
        else{
            usuarios = await findAllUsers()
        }
        res.json(usuarios)
    } catch (error) {
        // logging
        console.log(String(error))
        res.status(500).json({msg: "error interno "})
    }
})

//GET de UN user
router.get("/:id", async (req, res) => {
    try {
        const usuarioEncontrado = await findUserId(req.params.id)
        if (usuarioEncontrado) {
            res.json(usuarioEncontrado)
        }
        else {
            res.status(404).json({ msg: 'error: Usuario no encontado' })
        }
    } catch (error) {
        res.status(500).json({msg: 'error interno'+String(error)})
    }
})

//GET PERFIL
router.get("/privado/perfil/:id", estaLoggeado, async(req, res)=>{

    const usuarioEncontrado = await findUserId(req.params.id)

    res.json({msg: 'bienvenido a tu perfil ' + usuarioEncontrado.email})
})

//GET ROL / GRUPOS USUARIOS

router.get("/zona-admin/home", esAdmin, async(req,res)=>{
    res.json({msg:"Hola Admin!"})
})

//POST de USER
router.post("/", middlewareCrearUser, middlewareEmailValidacion, esMailDuplicado, async (req, res) => {
    await createUser(
        req.body.name.trim(),
        req.body.surname.trim(),
        req.body.email.trim(),
        req.body.password,
        req.body.rol)


    res.json({ msg: 'Usuario creado correctamente' })
})


//DELETE de USER
router.delete("/:id", async (req, res) => {
    const usuarioBorrado = await deleteUser(req.params.id)
    if (usuarioBorrado) {
        res.json({ msg: 'Usuario borrado!' })
    }
    else {
        res.json({ msg: 'error: Usuario no encontrado' })
    }
})

//PUT de USER
router.put("/:id", async (req, res) => {
    let encontrado = null
    let msg = []
    // tengo que comprobar que todos los atributos que se pueden tocar, vienen al completo
    const resultadoValidacion = validarUser(req.body)
    if (!resultadoValidacion.valido) {
        res.status(400).json({ msg: resultadoValidacion.mensaje })
    }
    else {
        encontrado = await modifyUser(
            req.params.id,
            req.body.name.trim(),
            req.body.surname.trim(),
            req.body.email.trim())

        res.json(encontrado === null ? { msg: 'error: User no encontrado' } : {msg: 'Usuario actualizado con PUT correctamente!' })
    }

})

//PATCH de USER
router.patch("/:id", async (req, res) => {
    let encontrado = null
    let msg = []

    // solamente varío los atributos que yo considero que se podrían tocar
    encontrado = await modifyUser(
        req.params.id,
        req.body.name,
        req.body.surname,
        req.body.email)

    res.json(encontrado === null ? { msg: 'error: User no encontrado' } : { msg: 'Usuario actualizado con PATCH correctamente!' })

})

//POST para hacer login

router.post("/login", async(req, res)=>{
    try{
        const resultado = await login(req.body.email, req.body.password)
        res.json({token: resultado.token, msg: resultado.msg})
    }
    catch(error){
        res.status(500).json({msg:"error interno en el servidor"})
    }
})


module.exports = router