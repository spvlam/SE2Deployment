require('dotenv').config({path:'.env.example'})
const express = require('express')
const router = require('./routes/index')
const { databaseSYNC } = require('./config/databaseLogin')
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const isAuthen = require('./middlewares/auth');

const app = express()
const port = process.env.PORT
const secret = process.env.TOKEN_SECRET

// consider this url as non CORS object
// app.use('/login/noauth/facebook/callback', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
// allow sending data from 8080 port to 3000
app.use(cors());
// Use express-session middleware
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));

app.use('/products',isAuthen)

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// synchronic database
databaseSYNC()

// parse the request body to json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
router(app)
app.listen(port, () => {
    console.log("connect successfully to local  ", port)
})
