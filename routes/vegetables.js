const express = require("express");
const router = express.Router();
const vegetableCtrl = require("../controllers/vegetables");
const userController = require("../controllers/users");

// List of all non organic vegetables
router.get("/notorganic", userController.auth, vegetableCtrl.indexNotOrganic);

// List of all organic vegetables
router.get("/organic", userController.auth, vegetableCtrl.indexOrganic);

// Creates a vegetable
router.post("/", userController.auth, vegetableCtrl.createVegetable);

// Updates a vegetable
router.put("/:id", userController.auth, vegetableCtrl.updateVegetable);

// Displays a vegetable
router.get("/:id", userController.auth, vegetableCtrl.showVegetable);

// Deletes a vegetable
router.delete("/:id", userController.auth, vegetableCtrl.deleteVegetable);

module.exports = router;
