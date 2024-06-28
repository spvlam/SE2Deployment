const express = require('express')
const router = express.Router()
const ControllerOrder = require('../controllers/order')


router.get('/noauth/userOrder/:user_id',ControllerOrder.getOrderByUser)
router.get('/noauth/cancelRequirement/:id',ControllerOrder.makeCancelRequirement)
router.get('/noauth/orderUser/:user_id',ControllerOrder.getOrderByUser)
router.get('/noauth/ordercancel',ControllerOrder.CancelOrder)
router.get('/noauth/OrderChange',ControllerOrder.ConvertStatus)
router.get('/noauth/getOrder/:month/:year',ControllerOrder.getOrder)
router.get('/auth/addToCarts/:cart_id/:product_id',ControllerOrder.addProductCard)
router.get('/auth/getCartUser/:user_id',ControllerOrder.getUserCart)
router.delete('/auth/deleteProductCart/:cart_id/:product_id',ControllerOrder.deleteProductFromCart)
module.exports = router