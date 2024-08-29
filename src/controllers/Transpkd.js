const Transpkd = require("../models/TranspkdModel")
const fs = require("fs")



const getTranspkd = async(req, res) => {
        try {
            const response = await Transpkd.findAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const getTranspkdById = async(req, res) => {
        
        try {
            const response = await Transpkd.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const createTranspkd = async(req, res) => {
    console.log(req.file);  
        const currentTime = new Date();
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        const {judul} = req.body;
        const { filename } = req.file;
        const url = `${req.protocol}://${req.get("host")}/assets/transpkd/${filename}`;
        try {
            await Transpkd.create({judul: judul, tanggal: tanggal, file: filename, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message}); 
        }
}

const updateTranspkd = async(req, res) => {
        const { filename } = req.file;
        const image = await Transpkd.findOne({
            where: {
                id: req.params.id
            }
        }) 
        if(!image) return res.status(404).json({msg: "Data Not Found"})   
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        if(req.file === null){
            filename = image.file;
        }else{
            const filepath = `./public/transpkd/${image.file}`;
            fs.unlinkSync(filepath);
        }
        const currentTime = new Date();
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()} Updated`;
        const {judul} = req.body;
        const url = `${req.protocol}://${req.get("host")}/assets/transpkd/${filename}`;
        try {
            await Transpkd.update({judul: judul, tanggal: tanggal, file: filename, url: url},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Image Updated"});
        } catch (error) {
            console.log(error.message);
        }
}

const deletedTranspkd = async(req, res) => {
         const image = await Transpkd.findOne({
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
            console.log(image.file);
            const filepath = `./public/transpkd/${image.file}`;
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
    getTranspkd,
    getTranspkdById,
    createTranspkd,
    updateTranspkd,
    deletedTranspkd
}