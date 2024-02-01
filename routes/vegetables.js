const express = require("express");
const router = express.Router();
const vegetableCtrl = require("../controllers/vegetables");
const userController = require("../controllers/users");

// Index /todos/notOrganic
router.get("/notorganic", userController.auth, vegetableCtrl.indexNotOrganic);
// Index /todos/organic
router.get("/organic", userController.auth, vegetableCtrl.indexOrganic);
// Create /todos/:id
router.post("/", userController.auth, vegetableCtrl.createVegetable);
// Update /todos/:id
router.put("/:id", userController.auth, vegetableCtrl.updateVegetable);
// Show /todos/:id
router.get("/:id", userController.auth, vegetableCtrl.showVegetable);
// Delete /todos/:id
router.delete("/:id", userController.auth, vegetableCtrl.deleteVegetable);

module.exports = router;
