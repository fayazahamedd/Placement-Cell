const express = require("express");
const router = express.Router();

const homeController = require('../controllers/home_controller.js');

router.get("/signin", homeController.signIn);
router.get("/signup", homeController.signUp);
router.post("/create", homeController.createUser);
router.post("/login", homeController.login);
router.get("/dashboard", homeController.dashboard);

module.exports = router;