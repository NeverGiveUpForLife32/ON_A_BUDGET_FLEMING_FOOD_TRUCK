const express = require("express");
const router = express.Router();
const fruitCtrl = require("../controllers/fruits");
const userController = require("../controllers/users");

// Index /todos/notCompleted
router.get("/", userController.auth, fruitCtrl.indexNotComplete);
// Index /todos/completed
router.get("/Completed", userController.auth, fruitCtrl.indexComplete);
// Create /todos/:id
router.post("/:id", userController.auth, fruitCtrl.createFruit);
// Update /todos/:id
router.put("/:id", userController.auth, fruitCtrl.updateFruit);
// Show /todos/:id
router.get("/:id", userController.auth, fruitCtrl.showFruit);
// Delete /todos/:id
router.delete("/:id", userController.auth, fruitCtrl.deleteFruit);

module.exports = router;
