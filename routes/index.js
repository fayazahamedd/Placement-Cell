const express = require("express");
const router = express.Router();

const homeController = require('../controllers/home_controller.js');

router.get("/", (req, res) => {
  return res.render("login_dashboard", {
    title: "Dashboard",
  });
});

router.use('/users', require('./users'));
router.use('/student',require('./student'));
router.get('/download-csv', homeController.download);
 
module.exports = router;