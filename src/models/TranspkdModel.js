const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Transpkd = db.define('transpkd',{
    judul: DataTypes.STRING,
    file: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Transpkd;

// (async()=>{
//     await db.sync();
// })();