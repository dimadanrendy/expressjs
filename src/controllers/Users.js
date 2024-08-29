const Users = require("../models/UserModel");
const argon2 = require("argon2");

 const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

 const getUserById = async(req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

 const createUser = async(req, res) => {
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirmasi Password tidak sama"});
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Registrasi Berhasil"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

 const updateUser = async(req, res) => {
    console.log(req.body);
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        const {name, email, password, confPassword, role} = req.body;
        // let hashPassword;
        // if(password === "" || password === null) {
        //     hashPassword = user.password
        // }else{
        //     hashPassword = await argon2.hash(password);
        // }
        // if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirmasi Password tidak sama"});
        try {
            await Users.update({
                name: name,
                email: email,
                // password: hashPassword,
                role: role
            },{
                where: {
                    id: user.id
                }
            });
            res.status(200).json({msg: "User updated"});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
}

 const deleteUser = async(req, res) => {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        try {
            await Users.destroy({
                where: {
                    id: user.id
                }
            });
            res.status(200).json({msg: "User deleted"});
        } catch (error) {
            res.status(400).json({msg: error.message});
        }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}