require('dotenv').config({ path: 'env.example' })

const validator = require('validator')
const transporter = require('../config/email')
const passCheck = require('../config/passwordSchema')
const bcrypt = require('bcrypt')
const jwtHelper = require('../utils/jwtHelper')
const helper = require('../utils/helper')

// datatable
// let users = require('../model/usersTable')

// enum

const Users = require('../model/usersTable')
const { LoginDevices, frontEndDirect } = require('../enum/login')
const hostWebName = process.env.HOST_NAME_WEB

class ControllerLogin {
  async register (req, res) {
    try {
      let { email, password, username } = req.body
      if (validator.isEmail(email)) {
        if (passCheck.validate(password)) {
          const hashPassword = await bcrypt.hash(password, 10)
          Users.findOne({ where: { email: email } })
            .then(user => {
              if (!user) {
                let html = `<button> <a href="${hostWebName}/login/noauth/verify?email=${email}&password=${hashPassword}&name=${username}">Click here comfirm your register</a></button>`
                let message = {
                  from: 'LAMNV WEB',
                  to: `${email}`,
                  subject: 'Comfirm Your Register',
                  html: html
                }
                transporter.sendMail(message)
                res.json({ mes: 'check your email' })
              } else {
                res.status(409).json({ message: 'This account has been exist' })
              }
            })
            .catch(err => {
              console.log(err)
              res.status(500).json({ message: 'Internal server error2' })
            })
        } else {
          res.json({ mes: 'weak password' })
        }
      } else {
        res.json({ mes: 'invalid email' })
      }
    } catch (err) {
      // mybot.bot.sendMessage(mybot.chatId, `Register account error : ${err}`)
      res.status(500).send('internal server error ')
    }
  }
  async verify (req, res) {
    try {
      let { email, password, name } = req.query
      Users.create({ email, password, user_name: name })
        .then(() => {
          res.redirect(frontEndDirect.directREGISTERSUCCESS)
        })
        .catch(err => {
          console.error('Error inserting user:', err)
          res.status(500).json({ message: 'Internal server error' })
        })
    } catch (err) {
      res.status(500).json({ mes: err })
    }
  }
  async login (req, res) {
    try {
      let { email, password } = req.body
      Users.findOne({ where: { email } })
        .then(user => {
          if (user) {
            let user_id = user.user_id
            bcrypt.compare(
              password,
              user.dataValues.password,
              (err, result) => {
                if (err) {
                  throw err
                }
                if (result && user.number_device < LoginDevices.numberDevices) {
                  let accessToken = jwtHelper.generateToken(
                    user,
                    LoginDevices.accessToken
                  )
                  let refreshToken = jwtHelper.generateToken(
                    user,
                    LoginDevices.refreshToken
                  )
                  Users.update(
                    {
                      refresh_token: refreshToken,
                      number_device: user.number_device + 1
                    },
                    { where: { email } }
                  )
                    .then(result => {
                      res.json({
                        name: user.user_name,
                        accessToken,
                        refreshToken,
                        user_id
                      })
                    })
                    .catch(err => {
                      res
                        .status(500)
                        .json({ message: 'Internal server error2' })
                    })
                } else {
                  res.status(300).json({ mes: 'more device' })
                }
              }
            )
          } else {
            res.status(300).json({ mes: 'user not found' })
          }
        })
        .catch(err => {
          res.status(500).json({ message: err })
        })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
  async logout (req, res) {
    try {
      let { refreshtoken } = req.headers

      Users.update(
        { refresh_token: null, number_device: 0 },
        { where: { refresh_token: refreshtoken } }
      )
        .then(result => {
          res.status(200).json({ mes: 'loging success' })
        })
        .catch(err => {
          res.status(500).json({ message: 'Internal server error' })
        })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  loginWithFacebook (req, res, next) {
    try {
      let user = req.session.passport.user
      let accessToken = jwtHelper.generateToken(user, LoginDevices.accessToken)
      let refreshToken = jwtHelper.generateToken(
        user,
        LoginDevices.refreshToken
      )
      Users.update(
        { refresh_token: refreshToken },
        { where: { email: user.email } }
      )
        .then(result => {
          console.log(
            `${frontEndDirect.loginFacebookSuccess}?accessToken=${accessToken}&refreshToken=${refreshToken}&name=${user.user_name}`
          )
          res.redirect(
            `${frontEndDirect.loginFacebookSuccess}?accessToken=${accessToken}&refreshToken=${refreshToken}&name=${user.user_name}`
          )
          //   res.json({ name: user.user_name, accessToken, refreshToken })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ message: 'Internal server error2' })
        })
    } catch (err) {
      console.log(err)
      // mybot.bot.sendMessage(mybot.chatId, `Login facebook error : ${err}`)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
  async autogetToken (req, res, next) {
    let refreshToken = req.headers.refreshtoken
    Users.findOne({ where: { refresh_token: refreshToken } })
      .then(result => {
        if (result) {
          let accessToken = jwtHelper.generateToken(
            user,
            LoginDevices.accessToken
          )
          let refreshToken = jwtHelper.generateToken(
            user,
            LoginDevices.refreshToken
          )
          Users.update(
            {
              refresh_token: refreshToken,
              number_device: user.number_device + 1
            },
            { where: { email } }
          )
            .then(result => {
              res.json({ name: user.user_name, accessToken, refreshToken })
            })
            .catch(err => {
              res.status(500).json({ message: err })
            })
        } else {
          res.status(301).json({ mes: 'invalid token' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: err })
      })
  }
  async getUser (req, res, next) {
    try {
      let userList = await Users.findAll()

      let result = userList.map(userInstance => {
        let user = userInstance.toJSON() 
        let { refresh_token, ...rest } = user
        return {
          ...rest,
          status: user.number_device !== 0 ? 'active' : 'inactive'
        }
      })
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new ControllerLogin()
