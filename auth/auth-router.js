const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const User = require("../users/users-model")

router.post('/register', async (req, res, next) => {
  // implement registration
  try { 
    const { username } = req.body
    const user = await User.findBy({ username }).first()

    if(user) {
      return res.status(409).json({
        message: "Username is already taken"
      })
    }
    res.status(201).json(await User.add(req.body))
  } catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  try {
    const {username, password } = req.body
    const user = await User.findBy({username}).first()
    const passwordValid = await bcrypt.compare(password, user.password)

    if(!user || !passwordValid) {
      return res.status(401).json({
        message : "Invalid Credentials"
      })
    }

    const payload = {
      userId : user.id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.json({
      message : `Welcome ${user.username}!`,
      // token: token
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
