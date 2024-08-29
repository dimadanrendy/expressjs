const Dokpera = require("../models/DokperaModel")
const fs = require("fs")



const getDokpera = async(req, res) => {
        try {
            const response = await Dokpera.findAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const getDokperaById = async(req, res) => {
        
        try {
            const response = await Dokpera.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const createDokpera = async(req, res) => {
        const currentTime = new Date();
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        const {judul} = req.body;
        const { filename } = req.file;
        const url = `${req.protocol}://${req.get("host")}/assets/dokpera/${filename}`;
        try {
            await Dokpera.create({judul: judul, tanggal: tanggal, file: filename, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const updateDokpera = async(req, res) => {
        const { filename } = req.file;
        const image = await Dokpera.findOne({
            where: {
                id: req.params.id
            }
        }) 
        if(!image) return res.status(404).json({msg: "Data Not Found"})   

        if(req.file === null){
            filename = image.file;
        }else{
            const filepath = `./public/dokpera/${image.file}`;
            fs.unlinkSync(filepath);
        }
        const {judul} = req.body;
        const url = `${req.protocol}://${req.get("host")}/assets/dokpera/${filename}`;
        try {
            await Dokpera.update({judul: judul, file: filename, url: url},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Image Updated"});
        } catch (error) {
            console.log(error.message);
        }
}

const deletedDokpera = async(req, res) => {
        const image = await Dokpera.findOne({
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
            const filepath = `./public/dokpera/${image.image}`;
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
    getDokpera,
    getDokperaById,
    createDokpera,
    updateDokpera,
    deletedDokpera
}