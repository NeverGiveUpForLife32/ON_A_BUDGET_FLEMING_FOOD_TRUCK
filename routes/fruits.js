const express = require("express");
const router = express.Router();
const fruitCtrl = require("../controllers/fruits");
const userController = require("../controllers/users");

// Index /todos/notRipe
router.get("/notripe", userController.auth, fruitCtrl.indexNotRipe);
// Index /todos/ripe
router.get("/ripe", userController.auth, fruitCtrl.indexRipe);
// Create /todos/:id
router.post("/", userController.auth, fruitCtrl.createFruit);
// Update /todos/:id
router.put("/:id", userController.auth, fruitCtrl.updateFruit);
// Show /todos/:id
router.get("/:id", userController.auth, fruitCtrl.showFruit);
// Delete /todos/:id
router.delete("/:id", userController.auth, fruitCtrl.deleteFruit);

module.exports = router;
