const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Dokper = db.define('dokper',{
    judul: DataTypes.STRING,
    file: DataTypes.STRING,
    dokumen: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Dokper;

// (async()=>{
//     await db.sync();
// })();