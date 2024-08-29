const express = require("express");

const authController = require("../controllers/Auth");

const router = express.Router();


router.post('/', authController.Login);
router.get('/', authController.Me);
router.delete('/', authController.logOut);

module.exports = router;