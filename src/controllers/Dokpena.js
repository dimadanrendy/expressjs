const Dokper = require("../models/DokpenaModel")
const fs = require("fs")



const getDokpena = async(req, res) => {
        try {
            const response = await Dokper.findAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const getDokpenaById = async(req, res) => {
        
        try {
            const response = await Dokper.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const createDokpena = async(req, res) => {
        const currentTime = new Date();
        const {judul} = req.body;
        const { filename } = req.file;
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

        const url = `${req.protocol}://${req.get("host")}/assets/dokpena/${filename}`;
        try {
            await Dokper.create({judul: judul, tanggal: tanggal, file: filename, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const updateDokpena = async(req, res) => {
        const currentTime = new Date();
        const { filename } = req.file;
        const image = await Dokper.findOne({
            where: {
                id: req.params.id
            }
        }) 
        if(!image) return res.status(404).json({msg: "Data Not Found"})   

        if(req.file === null){
            filename = image.file;
        }else{
            const filepath = `./public/dokpena/${image.file}`;
            fs.unlinkSync(filepath);
        }
        const {judul} = req.body;
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()} Updated`;
        const url = `${req.protocol}://${req.get("host")}/assets/dokpena/${filename}`;
        try {
            await Dokper.update({judul: judul, tanggal: tanggal, file: filename, url: url},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Image Updated"});
        } catch (error) {
            console.log(error.message);
        }
}

const deletedDokpena = async(req, res) => {
        const image = await Dokper.findOne({
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
            const filepath = `./public/dokpena/${image.image}`;
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
    getDokpena,
    getDokpenaById,
    createDokpena,
    updateDokpena,
    deletedDokpena
}