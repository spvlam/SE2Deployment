const Product = require('../model/productTable')
const productVarient = require('../model/productVarient')
const productEnum = require('../enum/product')

class ControllerProduct {
  async getAllProduct (req,res) {
    try {
      Product.findAll({ limit: productEnum.limitProduct })
        .then(result => {
            
          res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
          res.status(500).json('server error')
        })
    } catch (error) {
      res.status(500).json(error)
    }
  }
  async getProductbyId (req, res) {
    try {
        let {id} = req.params
      Product.findOne({ where: { id: id} })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          res.status(500).json('server error')
        })
    } catch (error) {
      res.status(500).json(error)
    }
  }
  async deleteProductById (req, res) {
    const { id } = req.params
    try {
      const product = await Product.findByPk(id)
      if (product) {
        await product.destroy()
        res.status(200).send({ message: 'Product deleted successfully' })
      } else {
        res.status(404).send({ message: 'Product not found' })
      }
    } catch (error) {
      res.status(500).send({
        message: 'An error occurred while deleting the product',
        error
      })
    }
  }
  async addProduct (req, res) {
    const {
      name,
      description,
      price,
      image,
      category,
      tags,
      link,
      varianttype,
      sizes,
      allofsizes,
      status,
      rating,
      numberofreviews
    } = req.body
    try {
      const newProduct = await Product.create({
        name,
        description,
        price,
        image,
        category,
        tags,
        link,
        varianttype,
        sizes,
        allofsizes,
        status,
        rating,
        numberofreviews
      })
      res.status(200).send(newProduct)
    } catch (error) {
      res
        .status(500)
        .send({ message: 'An error occurred while adding the product', error })
    }
  }
  async getProductVarient(req,res){
    try {
      productVarient.findAll({limit:productEnum.limitProduct})
      .then((rel)=>{
        res.status(200).json(rel)
      })
      .catch((err)=>{
        res.status(500).json(err)
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new ControllerProduct()
