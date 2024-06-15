require('dotenv').config()
let jwt = require('jsonwebtoken');
const util = require('util');
let verify_token = util.promisify(jwt.verify)

let secretKey = process.env.TOKEN_SECRET

let isAuthen = async (req, res, next) => {
	try {
		let accessToken = req.headers.accesstoken
		let accessTokenVerify = await verify_token(accessToken, secretKey)
		next()
	} catch (err) {
		if(err instanceof jwt.TokenExpiredError){
			try {
				let refreshToken = req.headers.accesstoken
				let refreshVerify = await verify_token(refreshToken, secretKey)
				next()
			} catch (error) {
				if(error instanceof jwt.TokenExpiredError){
                    res.status(403).json({mes:"time expired, need to be login"})
				}else{
					res.status(403).json({mes:"invalid  token, need to be login"})
				}
			}
		}else {
			res.status(403).json({mes:"invalid access token, need to be login"})
		}
	}
}

module.exports = isAuthen