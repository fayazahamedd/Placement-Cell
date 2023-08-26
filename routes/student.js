const express = require("express");
const router = express.Router();

const studentController = require('../controllers/student_controller.js');

router.get("/add", studentController.add);
router.get("/interview", studentController.interview);
router.post("/addStudent", studentController.addStudent);
router.post("/addinterview", studentController.addInterview);
router.get("/placement", studentController.placement);
router.post("/processinterview", studentController.processinterview);


module.exports = router;