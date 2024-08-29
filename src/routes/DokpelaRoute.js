const express = require('express');

const dokpelaController = require('../controllers/Dokpela');
const uploadDokper = require("../middleware/MulterDokpela");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/",  dokpelaController.getDokpela);
router.get("/:id",  dokpelaController.getDokpelaById);
router.post("/", veriFyUser,  uploadDokper.single('photo'), dokpelaController.createDokpela);
router.patch("/:id", veriFyUser, uploadDokper.single('photo'), dokpelaController.updateDokpela);
router.delete("/:id", veriFyUser,  uploadDokper.single('photo'), dokpelaController.deletedDokpela);

module.exports = router;