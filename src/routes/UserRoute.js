const express = require('express');

const userController = require('../controllers/Users');

const router = express.Router();

const {veriFyUser, adminOnly} = require('../middleware/AuthUser');

// CREATE - POST
router.post("/", veriFyUser, adminOnly,  userController.createUser);

// READ - GET
router.get("/", veriFyUser, adminOnly, userController.getUsers);

// READ BY ID
router.get("/:id", veriFyUser, adminOnly, userController.getUserById);

// UPDATE - PATCH
router.patch("/:id", veriFyUser, adminOnly, userController.updateUser);

// DELETE - DELETE
router.delete("/:id", veriFyUser, adminOnly, userController.deleteUser);

module.exports = router;
