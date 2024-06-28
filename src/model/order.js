const { sequelize } = require('../config/databaseLogin')
const { DataTypes } = require('sequelize')

const Orders = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total_price: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    shipping_fee: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    logging: false
  }
)

module.exports = { Orders }
