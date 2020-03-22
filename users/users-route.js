const express = require("express")
const User = require("./users-model")
const route = express.Router()

route.get("/", async (req, res, next) => {
    try {
        res.json(await User.find())
    } catch(err) {
        next(err)
    }
})