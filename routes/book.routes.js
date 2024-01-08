const express = require('express')
const router = express.Router()

const { findAllBooks, findBookId, createBook, deleteBook, modifyBook, findByWord } = require('../controllers/book.controller')

const { validarCrearProducto } = require('../helpers/validator')

//GET de libros
router.get("/", async (req, res) => {
    try {
        let losLibros = []
        if(req.query.contiene){
            losLibros = await findByWord(req.query.contiene)
        }
        else{
            losLibros = await findAllBooks()
        }
        res.json(losLibros)

    } catch (error) {
        // logging
        console.log(String(error))
        res.status(500).json({msg: "error interno "})
    }
})

//GET de UN libro
router.get("/:id", async (req, res) => {
    try {
        const libroEncontrado = await findBookId(req.params.id)
        if (libroEncontrado) {
            res.json(libroEncontrado)
        }
        else {
            res.status(404).json({ msg: 'error: Libro no encontado' })
        }
    } catch (error) {
        res.status(500).json({msg: 'error interno'+String(error)})
    }


})

//POST de LIBRO
router.post("/", async (req, res) => {
    await createBook(
        req.body.title.trim(),
        req.body.author.trim(),
        req.body.pages)


    res.json({ msg: 'Libro creado correctamente' })
})


//DELETE de LIBRO
router.delete("/:id", async (req, res) => {
    const libroBorrado = await deleteBook(req.params.id)
    if (libroBorrado) {
        res.json({ msg: 'Libro borrado!' })
    }
    else {
        res.json({ msg: 'error: Libro no encontrado' })
    }
})

//PUT de LIBRO
router.put("/:id", async (req, res) => {
    let encontrado = null
    let msg = []
    // tengo que comprobar que todos los atributos que se pueden tocar, vienen al completo
    const resultadoValidacion = validarCrearProducto(req.body)
    if (!resultadoValidacion.valido) {
        res.status(400).json({ msg: resultadoValidacion.mensaje})
    }
    else {
        encontrado = await modifyBook(
            req.params.id,
            req.body.title.trim(),
            req.body.author.trim(),
            req.body.pages)

        res.json(encontrado === null ? { msg: 'error: Libro no encontrado' } : { msg: 'Libro actualizado con PUT correctamente'})
    }

})

//PATCH de LIBRO
router.patch("/:id", async (req, res) => {
    let encontrado = null
    let msg = []

    // solamente varío los atributos que yo considero que se podrían tocar
    encontrado = await modifyBook(
        req.params.id,
        req.body.title,
        req.body.author,
        req.body.pages)

    res.json(encontrado === null ? { msg: 'error: Libro no encontrado' } : { msg: 'Libro actualizado con PATCH correctamente'})

})

module.exports = router