const Transpad = require("../models/TranspadModel")
const fs = require("fs")



const getTranspad = async(req, res) => {
        try {
            const response = await Transpad.findAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const getTranspadById = async(req, res) => {
        
        try {
            const response = await Transpad.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const createTranspad = async(req, res) => {
        const currentTime = new Date();
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        const {judul} = req.body;
        const { filename } = req.file;
        const url = `${req.protocol}://${req.get("host")}/assets/transpad/${filename}`;
        try {
            await Transpad.create({judul: judul, tanggal: tanggal, file: filename, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const updateTranspad = async(req, res) => {
        const { filename } = req.file;
        const image = await Transpad.findOne({
            where: {
                id: req.params.id
            }
        }) 
        if(!image) return res.status(404).json({msg: "Data Not Found"})   

        if(req.file === null){
            filename = Transpad.image;
        }else{
            const filepath = `./public/transpad/${image.image}`;
            fs.unlinkSync(filepath);
        }
        const currentTime = new Date();
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()} Updated`;
        const {judul} = req.body;
        const url = `${req.protocol}://${req.get("host")}/assets/transpad/${filename}`;
        try {
            await Transpad.update({judul: judul, tanggal: tanggal, file: filename, url: url},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Image Updated"});
        } catch (error) {
            console.log(error.message);
        }
}

const deletedTranspad = async(req, res) => {
        const image = await Transpad.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!image) return res.status(404).json({msg: "Data Not Found"})
        if(!image.image){
            await image.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Photo deleted"});
        }
        try {
            const filepath = `./public/transpad/${image.image}`;
            fs.unlinkSync(filepath);
            
            await image.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Photo deleted"});
        } catch (error) {
            console.log(error.message);
        }
}

module.exports = {
    getTranspad,
    getTranspadById,
    createTranspad,
    updateTranspad,
    deletedTranspad
}