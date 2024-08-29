const express = require('express');

const transpkdController = require('../controllers/Transpkd');
const uploadTranspkd = require("../middleware/MulterTranspkd");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/", transpkdController.getTranspkd);
router.get("/:id", transpkdController.getTranspkdById);
router.post("/", veriFyUser, uploadTranspkd.single('photo'), transpkdController.createTranspkd);
router.patch("/:id", veriFyUser, uploadTranspkd.single('photo'), transpkdController.updateTranspkd);
router.delete("/:id", veriFyUser,  uploadTranspkd.single('photo'), transpkdController.deletedTranspkd);

module.exports = router;