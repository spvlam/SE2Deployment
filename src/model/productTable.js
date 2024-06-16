const { sequelize } = require('../config/databaseLogin')
const { DataTypes } = require('sequelize')

const Product = sequelize.define(
  'products',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    varianttype: {
      type: DataTypes.ENUM,
      values: ['Image', 'Color'],
      allowNull: false
    },
    sizes: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    allofsizes: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['New in', 'Limited edition', 'Sold Out', '50% Discount'],
      allowNull: false
    },
    rating: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    numberofreviews: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
    logging: false,
    
  }
)



module.exports = Product
