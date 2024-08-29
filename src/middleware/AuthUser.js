const Users = require("../models/UserModel");

const veriFyUser = async (req, res, next) => {
    const session = req.get('authorization');
    if(!session){
        return res.status(401).json({msg: "Mohon login dahulu"});
    }
    const user = await Users.findOne({
            where: {
                uuid: session
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        req.userId = user.id;
        req.role = user.role;
        next();
}

const adminOnly = async (req, res, next) => {
        const session = req.get('authorization');
        const user = await Users.findOne({
            where: {
                uuid: session 
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


