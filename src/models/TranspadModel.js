const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Transpad = db.define('transpad',{
    judul: DataTypes.STRING,
    file: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Transpad;

// (async()=>{
//     await db.sync();
// })();