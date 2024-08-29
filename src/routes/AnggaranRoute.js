const express = require('express');

const dokanggaranController = require('../controllers/DokAnggaran');
const uploadDokAnggaran = require("../middleware/MulterAnggaran");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/",  dokanggaranController.getDokAnggaran);
router.get("/:id",  dokanggaranController.getDokAnggaranById);
router.post("/",  uploadDokAnggaran.single('photo'), dokanggaranController.createDokAnggaran);
router.patch("/:id", veriFyUser, uploadDokAnggaran.single('photo'), dokanggaranController.updateDokAnggaran);
router.delete("/:id", veriFyUser,  uploadDokAnggaran.single('photo'), dokanggaranController.deletedDokAnggaran);

module.exports = router;