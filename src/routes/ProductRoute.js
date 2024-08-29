const express = require('express');

const userController = require('../controllers/Products');

const router = express.Router();

const {veriFyUser} = require('../middleware/AuthUser');

router.get("/", veriFyUser, userController.getProduts);
router.get("/:id", veriFyUser, userController.getProdutById);
router.post("/", veriFyUser, userController.createProdut);
router.patch("/:id", veriFyUser, userController.updateProdut);
router.delete("/:id", veriFyUser, userController.deleteProdut);

module.exports = router;