const orderENum = require('../enum/order')
const { Carts, Product_cart } = require('../model/carts')
const { Orders } = require('../model/order')
const Product = require('../model/productTable')
const { Op } = require('sequelize')

class ControllerOrder {
  async getUserCart (req, res) {
    try {
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
  async getOrder (req, res) {
    let { month, year } = req.params
    // Define start and end date of the month
    let startDate = new Date(year, month - 1, 1)
    let endDate = new Date(year, month, 1)
    try {
      const orders = await Orders.findAll({
        where: {
          order_date: {
            [Op.and]: [{ [Op.gte]: startDate }, { [Op.lt]: endDate }]
          }
        }
      })
      res.status(200).json(orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      res
        .status(500)
        .json({ error: 'An error occurred while fetching orders.' })
    }
  }
  async ConvertStatus (req, res) {
    try {
      let { orderID, status } = req.query
     
      let newStatus
      if (status == orderENum.preparing) {
        newStatus = orderENum.delivering
      } else if (status == orderENum.delivering) {
        newStatus = orderENum.received
      }
      // use KAFKA here to make anounce to customer

      let [updateOrder] = await Orders.update(
        { status: newStatus },
        { where: { id: orderID } }
      )
      if (updateOrder) {
        res
          .status(200)
          .json('order has been successfully transformation in status aspect')
      } else {
        res
          .status(500)
          .json('order has been failure transformation in status aspect')
      }
    } catch (err) {
      res.status(500).json('internal server error')
    }
  }
  async CancelOrder(req,res){
    try {
      let {orderID, action} = req.query
      action = Number(action)
      if(action){
        let [updateOrder] = await Orders.update(
          { status: orderENum.canceled },
          { where: { id: orderID } }
        )
        if (updateOrder) {
          res
            .status(200)
            .json('order has been successfully cancel')
        } else {
          res
            .status(500)
            .json('order has been failure cancel')
        }
      }else{
        //  make announce to customer that it is not accpectable
        let [updateOrder] = await Orders.update(
          { status: orderENum.delivering },
          { where: { id: orderID } }
        )
        
        res.status(201).json('reject the cancel requirement')
      }
    } catch (error) {
      console.log(error)
      res.status(500).json('internal server error')
    }
  }
  async getOrderByUser(req,res){
     try {
      let {user_id} = req.params
      let orderUser =await Orders.findAll({where:{user_id}})
      res.status(200).json(orderUser)
     } catch (error) {
      console.log(error)
      res.status(500).json('internal server error')
     }
  }
  async makeCancelRequirement(req,res){
    try {
     let {id} = req.params
     let orderUser =await Orders.update({status:orderENum.cancelRequiring},{where:{id}})
     res.status(200).json('cancel require done')
    } catch (error) {
     console.log(error)
     res.status(500).json('internal server error')
    }
 }
}

module.exports = new ControllerOrder()
