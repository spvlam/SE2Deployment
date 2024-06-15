require('dotenv').config({path:'.env.example'})
const { Sequelize } = require('sequelize');
// set logginf information

// database information
let DATABASE_USER = process.env.DATABASE_USER,
    DATABASE_HOST = process.env.DATABASE_HOST,
    DATABASE_NAME = process.env.DATABASE_NAME,
    DATABASE_PW = process.env.PASSWORD_DB,
    DATABASE_PORT = process.env.DATABASE_PORT,
    DATABASE_DIALECT = process.env.DATABASE_DIALECT

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PW, {
    host: DATABASE_HOST,
    port : DATABASE_PORT,
    dialect: DATABASE_DIALECT,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // This is for self-signed certificates
        }
      }
});

// Sync the model with the database

let databaseSYNC = ()=>{
    // { alter: true } for create table if not exist
    sequelize.sync({ logging: false })
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
}
module.exports = {sequelize,databaseSYNC}