const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/register", authController.getRegister);
router.post("/login", authController.postRegister);
router.get("/login", authController.getLogin);
router.post("/admin", authController.postLogin);

module.exports = router;
