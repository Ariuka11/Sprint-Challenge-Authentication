const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser")

const restrict = require('./auth/authenticate-middleware.js');
const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();
const PORT = process.env.PORT || 3300;
require('dotenv').config()

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(cookieParser())

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict(), jokesRouter);

server.get("/", (req, res) => {
    res.json({
        message: "Welcome To my DAD JOKE API"
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message : "Something went wrong!"
    })
})

if(!module.parent){
    server.listen(PORT, () => {
        console.log(`\n=== Server listening on port ${PORT} ===\n`);
      });
}


module.exports = server;
