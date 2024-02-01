const express = require("express");
const router = express.Router();
const mealCtrl = require("../controllers/meals");
const userController = require("../controllers/users");

// Index /todos/notReadyToEat
router.get("/notreadytoeat", userController.auth, mealCtrl.indexNotReadyToEat);
// Index /todos/completed
router.get("/readytoeat", userController.auth, mealCtrl.indexReadyToEat);
// Create /todos/:id
router.post("/", userController.auth, mealCtrl.createMeal);
// Update /todos/:id
router.put("/:id", userController.auth, mealCtrl.updateMeal);
// Show /todos/:id
router.get("/:id", userController.auth, mealCtrl.showMeal);
// Delete /todos/:id
router.delete("/:id", userController.auth, mealCtrl.deleteMeal);

module.exports = router;
