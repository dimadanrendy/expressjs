const express = require('express');

const dokpenaController = require('../controllers/Dokpena');
const uploadDokper = require("../middleware/MulterDokpena");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/",  dokpenaController.getDokpena);
router.get("/:id",  dokpenaController.getDokpenaById);
router.post("/", veriFyUser,  uploadDokper.single('photo'), dokpenaController.createDokpena);
router.patch("/:id", veriFyUser, uploadDokper.single('photo'), dokpenaController.updateDokpena);
router.delete("/:id", veriFyUser,  uploadDokper.single('photo'), dokpenaController.deletedDokpena);

module.exports = router;