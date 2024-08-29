const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Dokpela = db.define('dokpela',{
    judul: DataTypes.STRING,
    file: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Dokpela;

// (async()=>{
//     await db.sync();
// })();