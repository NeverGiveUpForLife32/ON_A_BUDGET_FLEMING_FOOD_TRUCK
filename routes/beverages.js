const express = require("express");
const router = express.Router();
const beverageCtrl = require("../controllers/beverages");
const userController = require("../controllers/users");

// Index /todos/notCold
router.get("/notcold", userController.auth, beverageCtrl.indexNotCold);
// Index /todos/cold
router.get("/cold", userController.auth, beverageCtrl.indexCold);
// Create /todos/:id
router.post("/", userController.auth, beverageCtrl.createBeverage);
// Update /todos/:id
router.put("/:id", userController.auth, beverageCtrl.updateBeverage);
// Show /todos/:id
router.get("/:id", userController.auth, beverageCtrl.showBeverage);
// Delete /todos/:id
router.delete("/:id", userController.auth, beverageCtrl.deleteBeverage);

module.exports = router;
