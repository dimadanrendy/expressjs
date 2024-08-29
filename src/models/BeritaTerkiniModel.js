const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Berkin = db.define('berkin',{
    judul: DataTypes.STRING,
    descrip: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Berkin;

// (async()=>{
//     await db.sync();
// })();