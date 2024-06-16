const express = require('express')
const router = express.Router()
const ControllerOrder = require('../controllers/order')

router.get('/auth/addToCarts/:cart_id/:product_id',ControllerOrder.addProductCard)
router.get('/auth/getCartUser/:user_id',ControllerOrder.getUserCart)
router.delete('/auth/deleteProductCart/:cart_id/:product_id',ControllerOrder.deleteProductFromCart)
module.exports = router