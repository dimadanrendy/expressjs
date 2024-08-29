const express = require('express');

const dokpendaController = require('../controllers/Dokpenda');
const uploadDokPenda = require("../middleware/MulterDokpenda");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/",  dokpendaController.getDokPenda);
router.get("/:id",  dokpendaController.getDokPendaById);
router.post("/",  uploadDokPenda.single('photo'), dokpendaController.createDokPenda);
router.patch("/:id", veriFyUser, uploadDokPenda.single('photo'), dokpendaController.updateDokPenda);
router.delete("/:id", veriFyUser,  uploadDokPenda.single('photo'), dokpendaController.deletedDokPenda);

module.exports = router;