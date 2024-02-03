const express = require("express");
const router = express.Router();
const mealCtrl = require("../controllers/meals");
const userController = require("../controllers/users");

// List of all not ready to eat meals
router.get("/notreadytoeat", userController.auth, mealCtrl.indexNotReadyToEat);

// List of all ready to eat meals
router.get("/readytoeat", userController.auth, mealCtrl.indexReadyToEat);

// Creates a meal
router.post("/", userController.auth, mealCtrl.createMeal);

// Updates a meal
router.put("/:id", userController.auth, mealCtrl.updateMeal);

// Displays a meal
router.get("/:id", userController.auth, mealCtrl.showMeal);

// Deletes a meal
router.delete("/:id", userController.auth, mealCtrl.deleteMeal);

module.exports = router;
