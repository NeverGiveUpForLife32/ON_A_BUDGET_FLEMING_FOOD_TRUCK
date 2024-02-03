const express = require("express");
const router = express.Router();
const proteinCtrl = require("../controllers/proteins");
const userController = require("../controllers/users");

// List of all non organic proteins
router.get("/notorganic", userController.auth, proteinCtrl.indexNotOrganic);

// List of all organic proteins
router.get("/organic", userController.auth, proteinCtrl.indexOrganic);

// Creates a protein
router.post("/", userController.auth, proteinCtrl.createProtein);

// Updates a protein
router.put("/:id", userController.auth, proteinCtrl.updateProtein);

// Displays a protein
router.get("/:id", userController.auth, proteinCtrl.showProtein);

// Deletes a protein
router.delete("/:id", userController.auth, proteinCtrl.deleteProtein);

module.exports = router;
