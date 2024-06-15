const login = require('./login')

function router(app) {
    app.use('/login',login)
}

module.exports = router
