const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/", userController.indexUser);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/:id", userController.auth, userController.updateUser);
router.get("/:id", userController.showUser);
router.delete("/:id", userController.auth, userController.deleteUser);

module.exports = router;
