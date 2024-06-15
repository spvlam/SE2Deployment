const { sequelize } = require('../config/databaseLogin')
const { DataTypes } = require('sequelize')

const Users = sequelize.define('users', {
  user_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement: true
  },
  user_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.STRING(255),
    allowNull: true, // Assuming refresh_token is not always required
  },
  number_device: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
},{
  timestamps:false,
  logging: false
});


module.exports = Users