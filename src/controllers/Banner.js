const Banner = require("../models/BannerModel")
const fs = require("fs")



const getBanner = async(req, res) => {
        try {
            const response = await Banner.findAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const getBannerById = async(req, res) => {
        
        try {
            const response = await Banner.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const createBanner = async(req, res) => {
    console.log(req.body);
        const {name} = req.body;
        const {tanggal} = req.body;
        const { filename } = req.file;
        const url = `${req.protocol}://${req.get("host")}/assets/banner/${filename}`;
        try {
            await Banner.create({name: name, tanggal: tanggal, image: filename, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const updateBanner = async(req, res) => {
        const { filename } = req.file;
        const image = await Banner.findOne({
            where: {
                id: req.params.id
            }
        }) 
        if(!image) return res.status(404).json({msg: "Data Not Found"})   

        if(req.file === null){
            filename = Banner.image;
        }else{
            const filepath = `./public/banner/${image.image}`;
            fs.unlinkSync(filepath);
        }
        const {name} = req.body;
        const {tanggal} = req.body;
        const url = `${req.protocol}://${req.get("host")}/assets/banner/${filename}`;
        try {
            await Banner.update({name: name, tanggal: tanggal, image: filename, url: url},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Image Updated"});
        } catch (error) {
            console.log(error.message);
        }
}

const deletedBanner = async(req, res) => {
        const image = await Banner.findOne({
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
            const filepath = `./public/banner/${image.image}`;
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
    getBanner,
    getBannerById,
    createBanner,
    updateBanner,
    deletedBanner
}