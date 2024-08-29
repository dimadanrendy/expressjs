const express = require('express');

const bannerController = require('../controllers/Banner');
const uploadBanner = require("../middleware/MulterBanner");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/", uploadBanner.single('photo'), bannerController.getBanner);
router.get("/:id", uploadBanner.single('photo'), bannerController.getBannerById);
router.post("/", veriFyUser,  uploadBanner.single('photo'), bannerController.createBanner);
router.patch("/:id", veriFyUser, uploadBanner.single('photo'), bannerController.updateBanner);
router.delete("/:id", veriFyUser,  uploadBanner.single('photo'), bannerController.deletedBanner);

module.exports = router;