const express = require('express')
const router = express.Router()

const ControllerProduct = require('../controllers/product')
const ProductCloudController = require('../controllers/storageCloud/productStorage')

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.get('/noauth/productVarient',ControllerProduct.getProductVarient)
router.get('/noauth/all',ControllerProduct.getAllProduct)
router.get('/noauth/product_detail/:id', ControllerProduct.getProductbyId)
router.delete('/auth/productDelete/:id',ControllerProduct.deleteProductById)
router.post('/auth/addproduct',ControllerProduct.addProduct)
router.post('/noauth/addProduct',upload.single('filename'),ProductCloudController.uploadImage)
module.exports = router