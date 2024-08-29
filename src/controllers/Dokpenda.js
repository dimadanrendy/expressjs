const DokPenda = require("../models/DokpendaModel")
const fs = require("fs")
const { Op } = require('sequelize')



const getDokPenda = async(req, res) => {
    const dokumen = req.query.dokumen;
    console.log(dokumen)
        try {
          if(dokumen){
             const response = await DokPenda.findAll({
                where: {
                    dokumen: {
                        [Op.eq] : dokumen,
                    }
                }
            });
            res.status(200).json(response);
          }else{

              const response = await DokPenda.findAll();
                res.status(200).json(response);
          }
            
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const getDokPendaById = async(req, res) => {
        
        try {
            const response = await DokPenda.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const createDokPenda = async(req, res) => {
    console.log(req.body);
        const currentTime = new Date();
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        const {judul} = req.body;
        const { filename } = req.file;
        const {dokumen} = req.body;
        const url = `${req.protocol}://${req.get("host")}/assets/dokpenda/${filename}`;
        try {
            await DokPenda.create({judul: judul, tanggal: tanggal, file: filename, dokumen: dokumen, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const updateDokPenda = async(req, res) => {
        const { filename } = req.file;
        const image = await DokPenda.findOne({
            where: {
                id: req.params.id
            }
        }) 
        if(!image) return res.status(404).json({msg: "Data Not Found"})   

        if(req.file === null){
            filename = image.file;
        }else{
            const filepath = `./public/dokpenda/${image.file}`;
            fs.unlinkSync(filepath);
        }
        const {dokumen} = req.body;
        const {judul} = req.body;
        const url = `${req.protocol}://${req.get("host")}/assets/dokpenda/${filename}`;
        try {
            await DokPenda.update({judul: judul, file: filename, dokumen: dokumen, url: url},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Image Updated"});
        } catch (error) {
            console.log(error.message);
        }
}

const deletedDokPenda = async(req, res) => {
        const image = await DokPenda.findOne({
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
            const filepath = `./public/dokpenda/${image.image}`;
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
    getDokPenda,
    getDokPendaById,
    createDokPenda,
    updateDokPenda,
    deletedDokPenda
}