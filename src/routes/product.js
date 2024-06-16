const express = require('express')
const router = express.Router()
const ControllerProduct = require('../controllers/product')
router.get('/noauth/productVarient',ControllerProduct.getProductVarient)
router.get('/noauth/all',ControllerProduct.getAllProduct)
router.get('/noauth/product_detail/:id', ControllerProduct.getProductbyId)
router.delete('/auth/productDelete/:id',ControllerProduct.deleteProductById)
router.post('/auth/addproduct',ControllerProduct.addProduct)
module.exports = router