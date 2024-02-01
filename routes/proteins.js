const express = require("express");
const router = express.Router();
const proteinCtrl = require("../controllers/proteins");
const userController = require("../controllers/users");

// Index /todos/notOrganic
router.get("/notorganic", userController.auth, proteinCtrl.indexNotOrganic);
// Index /todos/organic
router.get("/organic", userController.auth, proteinCtrl.indexOrganic);
// Create /todos/:id
router.post("/", userController.auth, proteinCtrl.createProtein);
// Update /todos/:id
router.put("/:id", userController.auth, proteinCtrl.updateProtein);
// Show /todos/:id
router.get("/:id", userController.auth, proteinCtrl.showProtein);
// Delete /todos/:id
router.delete("/:id", userController.auth, proteinCtrl.deleteProtein);

module.exports = router;
