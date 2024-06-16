const {sequelize} = require('../config/databaseLogin')

const { DataTypes } = require('sequelize')

const productVarient = sequelize.define('productvariants',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING(255),
        allowNull:false,
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    thumbnail:{
        type: DataTypes.STRING(255),
        allowNull:true,
    },
    color:{
        type: DataTypes.STRING(50),
        allowNull:false,
    },
    featuredimage:{
        type: DataTypes.STRING(255),
        allowNull:true,
    },
},{
    timestamps:false,
    logging:false
})

module.exports = productVarient