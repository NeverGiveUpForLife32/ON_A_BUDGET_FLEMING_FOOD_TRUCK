const express = require("express");
const router = express.Router();
const vegetableCtrl = require("../controllers/vegetables");
const userController = require("../controllers/users");

// Index /todos/notCompleted
router.get("/", userController.auth, vegetableCtrl.indexNotComplete);
// Index /todos/completed
router.get("/Completed", userController.auth, vegetableCtrl.indexComplete);
// Create /todos/:id
router.post("/:id", userController.auth, vegetableCtrl.create);
// Update /todos/:id
router.put("/:id", userController.auth, vegetableCtrl.update);
// Show /todos/:id
router.get("/:id", userController.auth, vegetableCtrl.show);
// Delete /todos/:id
router.delete("/:id", userController.auth, vegetableCtrl.delete);

module.exports = router;
