const express = require('express');

const bernewsController = require('../controllers/Bernews');
const uploadBernews = require("../middleware/MulterBernews");


const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/", uploadBernews.single('photo'), bernewsController.getBernews);
router.get("/:id", uploadBernews.single('photo'), bernewsController.getBernewsById);
router.post("/", veriFyUser,  uploadBernews.single('photo'), bernewsController.createBernews);
router.patch("/:id", veriFyUser, uploadBernews.single('photo'), bernewsController.updateBernews);
router.delete("/:id", veriFyUser,  uploadBernews.single('photo'), bernewsController.deletedBernews);

module.exports = router;