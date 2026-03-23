const jwt = require('jsonwebtoken')
require('dotenv').config()

const validateToken = async(req, res, next) => {
  try {
    console.log(req?.path)
    if(req?.path === '/user/login' || req?.path === '/user/register'){
      return next()
    }
    //console.log('req.headers:',req.headers)
    let token = req.headers.authorization
    //console.log('token:',token)

    if(token){
      // token Bearer

      if(token.startsWith('Bearer')){
        // remove Bearer from token
        const tokenValue = token.split(' ')[1]

        // verify token using jwt
        const decodedData = jwt.verify(tokenValue, process.env.JWT_SECRET)
        //console.log('decodedData: ',decodedData)

        req.user = decodedData

        next()
      } else {
        res.status(401).json({
        message: 'token is not Bearer token'
      })
      }
    } else {
      res.status(401).json({
        message: 'token is not present'
      })
    }

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'error while validating token',
      error: err
    })
  }
}

module.exports = validateToken