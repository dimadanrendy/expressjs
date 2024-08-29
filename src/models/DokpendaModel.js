const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Dokpenda = db.define('dokpenda',{
    judul: DataTypes.STRING,
    file: DataTypes.STRING,
    dokumen: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Dokpenda;

