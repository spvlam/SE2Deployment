require('dotenv').config({path:'.env.example'})
const nodemailer = require("nodemailer");

let email = process.env.EMAIL_AUTH
let email_key = process.env.EMAIL_KEY
let email_host = process.env.EMAIL_HOST
let email_port = process.env.EMAIL_PORT

let transporter = nodemailer.createTransport({
    host: email_host,
    port: email_port,
    secure: false,
    auth: {
      user: email,
      pass: email_key
    }
  });
  
module.exports = transporter
