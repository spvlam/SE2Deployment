require('dotenv').config()
const jwt = require("jsonwebtoken")

let accesstokenLife = process.env.ACCESS_TOKEN_LIFE
let refreshTokenLife = process.env.REFRESH_TOKEN_LIFE
let tokenSecret = process.env.TOKEN_SECRET

let generateToken = (user,type_token)=>{
    let tokenLife = type_token ? refreshTokenLife : accesstokenLife 
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
          }
        return jwt.sign({data:userData},tokenSecret,{
            algorithm: "HS256",
            expiresIn: tokenLife,
        })
}
let verifyToken = (token)=>{
    return jwt.verify(token,tokenSecret,(err,decoded)=>{
        if(err) return err
        return decoded
    })
}
module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
  };
