//const { Sequelize } = require("sequelize");
const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress','root','Kipany!00', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;