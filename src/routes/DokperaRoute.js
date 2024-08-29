const express = require('express');

const dokperaController = require('../controllers/Dokpera');
const uploadDokpera = require("../middleware/MulterDokpera");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/",  dokperaController.getDokpera);
router.get("/:id",  dokperaController.getDokperaById);
router.post("/", veriFyUser,  uploadDokpera.single('photo'), dokperaController.createDokpera);
router.patch("/:id", veriFyUser, uploadDokpera.single('photo'), dokperaController.updateDokpera);
router.delete("/:id", veriFyUser,  uploadDokpera.single('photo'), dokperaController.deletedDokpera);

module.exports = router;