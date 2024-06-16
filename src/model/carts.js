const {sequelize} = require('../config/databaseLogin')
const Product = require('./productTable')
const { DataTypes } = require('sequelize')

const Carts = sequelize.define('carts',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    total_price:{
        type: DataTypes.DOUBLE,
        allowNull:false
    }
    
},{
    timestamps:false,
    logging:false
})

const Product_cart = sequelize.define('cart_products',{
    cart_id:{
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    product_id:{
        type:DataTypes.INTEGER 
    }
},{
    timestamps:false,
    logging:false
})

Product_cart.belongsTo(Carts, { foreignKey: 'cart_id' });
Product_cart.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {Carts,Product_cart}