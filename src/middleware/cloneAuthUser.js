const Users = require("../models/UserModel");

const veriFyUser = async (req, res, next) => {
    console.log(`ini adlah uuid${req.session.userId}`);
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login dahulu"});
    }
    const user = await Users.findOne({
            where: {
                uuid: req.session.userId
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        req.userId = user.id;
        req.role = user.role;
        next();
}

const adminOnly = async (req, res, next) => {
        const user = await Users.findOne({
            where: {
                uuid: req.session.userId 
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        if(user.role !== "admin") return res.status(403).json({msg: "Akses terlarang"});
        next();
}
module.exports = {
    veriFyUser,
    adminOnly
}


