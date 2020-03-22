const db = require("../database/dbConfig")
const bcrypt = require('bcryptjs')

module.exports = {
    find,
    findBy,
    findById,
    add,
}

function find() {
    return db("users").select("id, username")
}

function findBy(filter){
    return db('users').where(filter)
}

function findById(id) {
    return db("users").where({id}).first()
}

async function add(user) {
    user.password = await bcrypt.hash(user.password, 13)
    const [id] = await db("users").insert(user)
    return findById(id)
}

