const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    pages:{
        type: String,
        required: false,
    }
})

const Books = mongoose.model("books",bookSchema)

module.exports = Books