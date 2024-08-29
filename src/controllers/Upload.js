const Images = require("../models/ImagesModel")


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
        const currentTime = new Date();
        const tanggal = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
        const name = req.body.title;
        const { filename } = req.file;
        const url = `${req.protocol}://${req.get("host")}/assets/${filename}`;
        try {
            await Images.create({name: name, tanggal: tanggal, image: filename, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const updateImage = async(req, res) => {
    
}

const deletedImage = async(req, res) => {
    
}

module.exports = {
    getImage,
    getImageById,
    createImage,
    updateImage,
    deletedImage
}