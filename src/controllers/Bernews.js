const Bernews = require("../models/BeritaNewsModel")
const fs = require("fs")



const getBernews = async(req, res) => {
        try {
            const response = await Bernews.findAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const getBernewsById = async(req, res) => {
        
        try {
            const response = await Bernews.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const createBernews = async(req, res) => {
        const {judul} = req.body;
        const {descrip} = req.body;
        const {tanggal} = req.body;
        const { filename } = req.file;
        const url = `${req.protocol}://${req.get("host")}/assets/bernews/${filename}`;
        try {
            await Bernews.create({judul: judul, descrip: descrip, tanggal: tanggal, image: filename, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const updateBernews = async(req, res) => {
        const { filename } = req.file;
        const image = await Bernews.findOne({
            where: {
                id: req.params.id
            }
        }) 
        if(!image) return res.status(404).json({msg: "Data Not Found"})   

        if(req.file === null){
            filename = Bernews.image;
        }else{
            const filepath = `./public/bernews/${image.image}`;
            fs.unlinkSync(filepath);
        }
        const {judul} = req.body;
        const {descrip} = req.body;
        const url = `${req.protocol}://${req.get("host")}/assets/bernews/${filename}`;
        try {
            await Banner.update({judul: judul, descrip: descrip, image: filename, url: url},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Image Updated"});
        } catch (error) {
            console.log(error.message);
        }
}

const deletedBernews = async(req, res) => {
        const image = await Bernews.findOne({
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
            const filepath = `./public/bernews/${image.image}`;
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
    getBernews,
    getBernewsById,
    createBernews,
    updateBernews,
    deletedBernews
}