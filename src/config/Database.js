const { Sequelize } = require("sequelize");

const db = new Sequelize('express', 'express', 'express123', {
    host: '127.0.0.1',
    dialect: "mysql"
});

module.exports = db;
