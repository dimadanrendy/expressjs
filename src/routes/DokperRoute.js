const express = require('express');

const dokperController = require('../controllers/Dokper');
const uploadDokper = require("../middleware/MulterDokper");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/",  dokperController.getDokper);
router.get("/:id",  dokperController.getDokperById);
router.post("/", veriFyUser,  uploadDokper.single('photo'), dokperController.createDokper);
router.patch("/:id", veriFyUser, uploadDokper.single('photo'), dokperController.updateDokper);
router.delete("/:id", veriFyUser,  uploadDokper.single('photo'), dokperController.deletedDokper);

module.exports = router;