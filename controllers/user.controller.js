const User = require('../models/user.model')

async function findAllUsers(){
    const allUsers = await User.find()
    return allUsers
}

async function findUserId(id){
    const userFound = await User.findById(id)
    return userFound
}


async function createUser(nam, sur, ema, pass){
    const newUser = new User({
        name: nam,
        surname: sur,
        email: ema,
        password: pass,
    })

    await newUser.save()

    return newUser
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
}