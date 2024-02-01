const express = require("express");
const router = express.Router();
const dessertCtrl = require("../controllers/desserts");
const userController = require("../controllers/users");

// Index /todos/notDelicious
router.get("/notdelicious", userController.auth, dessertCtrl.indexNotDelicious);
// Index /todos/delicious
router.get("/delicious", userController.auth, dessertCtrl.indexDelicious);
// Create /todos/:id
router.post("/", userController.auth, dessertCtrl.createDessert);
// Update /todos/:id
router.put("/:id", userController.auth, dessertCtrl.updateDessert);
// Show /todos/:id
router.get("/:id", userController.auth, dessertCtrl.showDessert);
// Delete /todos/:id
router.delete("/:id", userController.auth, dessertCtrl.deleteDessert);

module.exports = router;
