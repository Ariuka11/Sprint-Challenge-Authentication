/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken")

function restrict(){
  return async (req, res, next) => {
    try {
      const { token } = req.cookies
      if(!token ){
        res.status(401).json({ you: 'shall not pass!' })
      }
      
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
          res.status(401).json({ you: 'shall not pass!' })
        }
        req.token = decoded
        next()
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = restrict
