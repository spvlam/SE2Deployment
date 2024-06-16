const { Carts, Product_cart } = require('../model/carts')
const Product = require('../model/productTable')

class ControllerOrder {
  async getUserCart (req, res) {
    try {
      console.log(req.params)
      console.log(req.query)
      let { user_id } = req.params
      Product_cart.findAll({
        include: [
          {
            model: Carts,
            where: { user_id }
          },
          {
            model: Product
          }
        ]
      })
        .then(result => {
          const products = result.map(item => item.product)
          res.status(200).json(products)
        })
        .catch(error => {
          res.status(500).json(error)
        })
    } catch (error) {
      res.status(500).json(error)
    }
  }
  async deleteProductFromCart (req, res) {
    try {
      let { cart_id, product_id } = req.params
      let result = await Product_cart.destroy({
        where: { cart_id, product_id }
      })
      console.log(result)
      if (result) {
        res.status(200).json({ message: 'Product deleted successfully' })
      } else {
        res.status(404).json({ message: 'Product not found' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json('123')
    }
  }
  async addProductCard (req, res) {
    let { cart_id, product_id } = req.params
    try {
      let result = await Product_cart.create({ cart_id, product_id })
      console.log(result)
      if (result) {
        res
          .status(200)
          .json({ message: 'Product created successfully', result })
      } else {
        res.status(500).json({ message: 'Failed to create product' })
      }
    } catch (error) {
      console.error('Error creating product:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = new ControllerOrder()
