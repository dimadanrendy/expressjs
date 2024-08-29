const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Dokpera = db.define('dokpera',{
    judul: DataTypes.STRING,
    file: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Dokpera;

// (async()=>{
//     await db.sync();
// })();