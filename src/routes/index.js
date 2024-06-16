const login = require('./login')
const productRouter = require('./product')
const orderRouter = require('./order')
const vnPayRouter = require('./subsystem/vnpay')
const isAuthen = require('../middlewares/auth')

function router(app) {
    app.use('/vnpay',vnPayRouter)
    app.use('/product/auth',isAuthen)
    app.use('/order/auth',isAuthen)
    app.use('/order',orderRouter)
    app.use('/login',login)
    app.use('/product',productRouter)
    
}

module.exports = router
