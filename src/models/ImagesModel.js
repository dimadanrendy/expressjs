const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Images = db.define('images',{
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

module.exports = Images;

// (async()=>{
//     await db.sync();
// })();