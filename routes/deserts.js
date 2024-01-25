const express = require("express");
const router = express.Router();
const desertCtrl = require("../controllers/deserts");
const userController = require("../controllers/users");

// Index /todos/notCompleted
router.get("/", userController.auth, desertCtrl.indexNotComplete);
// Index /todos/completed
router.get("/Completed", userController.auth, desertCtrl.indexComplete);
// Create /todos/:id
router.post("/:id", userController.auth, desertCtrl.createDesert);
// Update /todos/:id
router.put("/:id", userController.auth, desertCtrl.updateDesert);
// Show /todos/:id
router.get("/:id", userController.auth, desertCtrl.showDesert);
// Delete /todos/:id
router.delete("/:id", userController.auth, desertCtrl.deleteDesert);

module.exports = router;
