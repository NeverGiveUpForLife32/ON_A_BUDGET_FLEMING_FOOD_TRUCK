const express = require("express");
const router = express.Router();
const proteinCtrl = require("../controllers/proteins");
const userController = require("../controllers/users");

// Index /todos/notCompleted
router.get("/", userController.auth, proteinCtrl.indexNotComplete);
// Index /todos/completed
router.get("/Completed", userController.auth, proteinCtrl.indexComplete);
// Create /todos/:id
router.post("/:id", userController.auth, proteinCtrl.createProtein);
// Update /todos/:id
router.put("/:id", userController.auth, proteinCtrl.updateProtein);
// Show /todos/:id
router.get("/:id", userController.auth, proteinCtrl.showProtein);
// Delete /todos/:id
router.delete("/:id", userController.auth, proteinCtrl.deleteProtein);

module.exports = router;
