const express = require('express');

const imageController = require('../controllers/Images');
const upload = require("../middleware/Multer");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/", upload.single('photo'), imageController.getImage);
router.get("/:id", upload.single('photo'), imageController.getImageById);
router.post("/", veriFyUser,  upload.single('photo'), imageController.createImage);
router.patch("/:id", veriFyUser, upload.single('photo'), imageController.updateImage);
router.delete("/:id", veriFyUser,  upload.single('photo'), imageController.deletedImage);

module.exports = router;