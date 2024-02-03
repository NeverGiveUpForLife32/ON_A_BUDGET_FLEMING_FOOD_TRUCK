const express = require("express");
const router = express.Router();
const dessertCtrl = require("../controllers/desserts");
const userController = require("../controllers/users");

// list of all nasty desserts
router.get("/notdelicious", userController.auth, dessertCtrl.indexNotDelicious);

// List of all delicious desserts
router.get("/delicious", userController.auth, dessertCtrl.indexDelicious);

// Creates a dessert
router.post("/", userController.auth, dessertCtrl.createDessert);

// Updates a dessert
router.put("/:id", userController.auth, dessertCtrl.updateDessert);

// Displays a dessert
router.get("/:id", userController.auth, dessertCtrl.showDessert);

// Deletes a dessert
router.delete("/:id", userController.auth, dessertCtrl.deleteDessert);

module.exports = router;
