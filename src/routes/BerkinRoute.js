const express = require('express');

const berkinController = require('../controllers/Berkin');
const uploadBerkin = require("../middleware/MulterBerkin");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/", uploadBerkin.single('photo'), berkinController.getBerkin);
router.get("/:id", uploadBerkin.single('photo'), berkinController.getBerkinById);
router.post("/", veriFyUser,  uploadBerkin.single('photo'), berkinController.createBerkin);
router.patch("/:id", veriFyUser, uploadBerkin.single('photo'), berkinController.updateBerkin);
router.delete("/:id", veriFyUser,  uploadBerkin.single('photo'), berkinController.deletedBerkin);

module.exports = router;