const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Banner = db.define('banner',{
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Banner;

// (async()=>{
//     await db.sync();
// })(); 
