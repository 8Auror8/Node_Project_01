const Book = require('../models/book.model')

async function findAllBooks(){
    const allBooks = await Book.find()
    return allBooks
}

async function findBookId(id){
    const bookFinded = await Book.findById(id)
    return bookFinded
}

async function findByWord(word){
    const libros = await Book.find({title:{"$regex": word, "$options": "i"}})
    return libros
}

async function createBook(tit, aut, pag){
    const newBook = new Book({
        title: tit,
        author: aut,
        pages: pag,
    })

    await newBook.save()

    return newBook
}

async function deleteBook(id){
    const deleteBook = await Book.findByIdAndDelete(id)
    return deleteBook
}

async function modifyBook(id, tit, aut, pag){
    // importante, findByIdAndUpdate me devuelve el objeto antiguo (previo a la modificación)
    const bookToModify =  await Book.findByIdAndUpdate(id, {title: tit, author: aut, pages: pag})
    return bookToModify
}

module.exports  = {
    findAllBooks,
    findBookId,
    createBook,
    deleteBook,
    modifyBook,
    findByWord
}