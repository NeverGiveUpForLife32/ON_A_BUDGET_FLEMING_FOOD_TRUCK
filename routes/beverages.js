const express = require("express");
const router = express.Router();
const beverageCtrl = require("../controllers/beverages");
const userController = require("../controllers/users");

// List of all warm beverages
router.get("/notcold", userController.auth, beverageCtrl.indexNotCold);

// List of all cold beverages
router.get("/cold", userController.auth, beverageCtrl.indexCold);

// Create a beverage
router.post("/", userController.auth, beverageCtrl.createBeverage);

// Update a beverage
router.put("/:id", userController.auth, beverageCtrl.updateBeverage);

// Display a beverage
router.get("/:id", userController.auth, beverageCtrl.showBeverage);

// Delete a beverage
router.delete("/:id", userController.auth, beverageCtrl.deleteBeverage);

module.exports = router;
