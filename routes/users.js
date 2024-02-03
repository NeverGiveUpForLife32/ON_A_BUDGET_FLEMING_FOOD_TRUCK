const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

// Create a User
router.post("/", userController.createUser);

// logs a User in
router.post("/login", userController.loginUser);

// Updates a user
router.put("/:id", userController.auth, userController.updateUser);

// Dispalys 1 User
router.get("/:id", userController.showUser);

// Deletes a user
router.delete("/:id", userController.auth, userController.deleteUser);

module.exports = router;
