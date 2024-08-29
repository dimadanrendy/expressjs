const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Bernews = db.define('bernews',{
    judul: DataTypes.STRING,
    descrip: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Bernews;

// (async()=>{
//     await db.sync();
// })();