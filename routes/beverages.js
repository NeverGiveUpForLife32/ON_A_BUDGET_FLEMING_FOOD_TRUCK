const express = require("express");
const router = express.Router();
const beverageCtrl = require("../controllers/beverages");
const userController = require("../controllers/users");

// Index /todos/notCompleted
router.get("/", userController.auth, beverageCtrl.indexNotComplete);
// Index /todos/completed
router.get("/Completed", userController.auth, beverageCtrl.indexComplete);
// Create /todos/:id
router.post("/:id", userController.auth, beverageCtrl.createBeverage);
// Update /todos/:id
router.put("/:id", userController.auth, beverageCtrl.updateBeverage);
// Show /todos/:id
router.get("/:id", userController.auth, beverageCtrl.showBeverage);
// Delete /todos/:id
router.delete("/:id", userController.auth, beverageCtrl.deleteBeverage);

module.exports = router;
