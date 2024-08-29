const Images = require("../models/ImagesModel")
const fs = require("fs")



const getImage = async(req, res) => {
        try {
            const response = await Images.findAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const getImageById = async(req, res) => {
        
        try {
            const response = await Images.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const createImage = async(req, res) => {
        const {name} = req.body;
        const { filename } = req.file;
        const url = `${req.protocol}://${req.get("host")}/assets/images/${filename}`;
        try {
            await Images.create({name: name, image: filename, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const updateImage = async(req, res) => {
        const { filename } = req.file;
        const image = await Images.findOne({
            where: {
                id: req.params.id
            }
        }) 
        if(!image) return res.status(404).json({msg: "Data Not Found"})   

        if(req.file === null){
            filename = Images.image;
        }else{
            const filepath = `./public/images/${image.image}`;
            fs.unlinkSync(filepath);
        }
        const {name} = req.body;
        const url = `${req.protocol}://${req.get("host")}/assets/images/${filename}`;
        try {
            await Images.update({name: name, image: filename, url: url},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Image Updated"});
        } catch (error) {
            console.log(error.message);
        }
}

const deletedImage = async(req, res) => {
        const image = await Images.findOne({
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
            const filepath = `./public/images/${image.image}`;
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
    getImage,
    getImageById,
    createImage,
    updateImage,
    deletedImage
}