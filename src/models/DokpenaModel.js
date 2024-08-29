const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Dokpena = db.define('dokpena',{
    judul: DataTypes.STRING,
    file: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Dokpena;

