const express = require("express");
const router = express.Router();
const fruitCtrl = require("../controllers/fruits");
const userController = require("../controllers/users");

// Lists all unriped fruits
router.get("/notripe", userController.auth, fruitCtrl.indexNotRipe);

// Lists all riped fruits
router.get("/ripe", userController.auth, fruitCtrl.indexRipe);

// Creates a fruit
router.post("/", userController.auth, fruitCtrl.createFruit);

// Updates a fruit
router.put("/:id", userController.auth, fruitCtrl.updateFruit);

// Displays a fruit
router.get("/:id", userController.auth, fruitCtrl.showFruit);

// Deletes a fruit
router.delete("/:id", userController.auth, fruitCtrl.deleteFruit);

module.exports = router;
