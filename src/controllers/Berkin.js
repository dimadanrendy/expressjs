const Berkin = require("../models/BeritaTerkiniModel")
const fs = require("fs")



const getBerkin = async(req, res) => {
        try {
            const response = await Berkin.findAll();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const getBerkinById = async(req, res) => {
        
        try {
            const response = await Berkin.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const createBerkin = async(req, res) => {
        const {judul} = req.body;
        const {descrip} = req.body;
        const {tanggal} = req.body;
        const { filename } = req.file;
        const url = `${req.protocol}://${req.get("host")}/assets/berkin/${filename}`;
        try {
            await Berkin.create({judul: judul, descrip: descrip, tanggal: tanggal, image: filename, url: url})
            res.status(201).json({msg: "Image Created"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
}

const updateBerkin = async(req, res) => {
        const { filename } = req.file;
        const image = await Berkin.findOne({
            where: {
                id: req.params.id
            }
        }) 
        if(!image) return res.status(404).json({msg: "Data Not Found"})   

        if(req.file === null){
            filename = Berkin.image;
        }else{
            const filepath = `./public/berkin/${image.image}`;
            fs.unlinkSync(filepath);
        }
        const {judul} = req.body;
        const {descrip} = req.body;
        const {tanggal} = req.body;
        const url = `${req.protocol}://${req.get("host")}/assets/berkin/${filename}`;
        try {
            await Banner.update({judul: judul, descrip: descrip, tanggal: tanggal, image: filename, url: url},{
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({msg: "Image Updated"});
        } catch (error) {
            console.log(error.message);
        }
}

const deletedBerkin = async(req, res) => {
        const image = await Berkin.findOne({
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
            const filepath = `./public/berkin/${image.image}`;
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
    getBerkin,
    getBerkinById,
    createBerkin,
    updateBerkin,
    deletedBerkin
}