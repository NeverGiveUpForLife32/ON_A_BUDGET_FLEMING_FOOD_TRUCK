const express = require("express");
const router = express.Router();
const mealCtrl = require("../controllers/meals");
const userController = require("../controllers/users");

// Index /todos/notCompleted
router.get("/", userController.auth, mealCtrl.indexNotComplete);
// Index /todos/completed
router.get("/Completed", userController.auth, mealCtrl.indexComplete);
// Create /todos/:id
router.post("/:id", userController.auth, mealCtrl.createMenu);
// Update /todos/:id
router.put("/:id", userController.auth, mealCtrl.updateMenu);
// Show /todos/:id
router.get("/:id", userController.auth, mealCtrl.showMenu);
// Delete /todos/:id
router.delete("/:id", userController.auth, mealCtrl.deleteMenu);

module.exports = router;
