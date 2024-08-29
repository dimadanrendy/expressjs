const Dokper = require("../models/DokperModel")
const fs = require("fs")

const getDokper = async(req, res) => {
        try {
            const response = await Dokper.findAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}


const getDokperByDokumen = async(req, res) => {
    const dokumen = req.query.dokumen;
        try {
          if(dokumen){
             const response = await Dokper.findAll({
                where: {
                    dokumen: {
                        [Op.eq] : dokumen,
                    }
                }
            });
            res.status(200).json(response);
          }
          const response = await Dokper.findAll();
            res.status(200).json(response);
            
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const getDokperById = async(req, res) => {
        
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

const createDokper = async(req, res) => {
        const currentTime = new Date();
        const {judul} = req.body;
        const {dokumen} = req.body;
        const {filename} = req.file;
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

        const url = `${req.protocol}://${req.get("host")}/assets/dokper/${filename}`;
        try {
            await Dokper.create({judul: judul, dokumen: dokumen, tanggal: tanggal, file: filename, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const updateDokper = async(req, res) => {
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
            const filepath = `./public/dokper/${image.file}`;
            fs.unlinkSync(filepath);
        }
        const {judul} = req.body;
        const {dokumen} = req.body;
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()} Updated`;
        const url = `${req.protocol}://${req.get("host")}/assets/dokper/${filename}`;
        try {
            await Dokper.update({judul: judul, dokumen: dokumen, tanggal: tanggal, file: filename, url: url},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Image Updated"});
        } catch (error) {
            console.log(error.message);
        }
}

const deletedDokper = async(req, res) => {
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
            const filepath = `./public/dokper/${image.image}`;
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
    getDokper,
    getDokperById,
    createDokper,
    updateDokper,
    deletedDokper,
    getDokperByDokumen
}