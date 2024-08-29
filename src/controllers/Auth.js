const Users = require("../models/UserModel");
const argon2 = require("argon2");
const { Session } = require("express-session");
const session = require("express-session");

const Login = async (req, res) => {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        const match = await argon2.verify(user.password, req.body.password);
        if(!match) return res.status(400).json({msg: "Wrong password"});
        req.session.userId = user.uuid;
        const uuid = user.uuid;
        const name = user.name;
        const email = user.email;
        const role = user.role;
        res.status(200).json({uuid, name, email, role});
        console.log(req.session.userId);
        console.log(req.session)
}

const Me = async (req, res) => { 
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login dahulu"});
    }
    const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        res.status(200).json(user);
}

const logOut = async(req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.clearCookie('connect.sid');
        res.status(200).json({msg: "Anda telah logout"});
        // res.clearCookie('name');
    });
}

module.exports = {
    Login,
    Me,
    logOut
}