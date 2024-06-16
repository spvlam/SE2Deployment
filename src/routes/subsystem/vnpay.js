const express = require('express')
const router = express.Router()
const vnPayController = require('../../sybsystem/vnPayController/vnPayController')

router.post('/createPayment',vnPayController.CreatePaymentUrl)

router.get('/vnp_ReturnUrl',vnPayController.vnpay_return)
module.exports = router