const express = require('express');

const transpadController = require('../controllers/Transpad');
const uploadTranspad = require("../middleware/MulterTranspad");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/", uploadTranspad.single('photo'), transpadController.getTranspad);
router.get("/:id", uploadTranspad.single('photo'), transpadController.getTranspadById);
router.post("/", veriFyUser,  uploadTranspad.single('photo'), transpadController.createTranspad);
router.patch("/:id", veriFyUser, uploadTranspad.single('photo'), transpadController.updateTranspad);
router.delete("/:id", veriFyUser,  uploadTranspad.single('photo'), transpadController.deletedTranspad);

module.exports = router;