const express = require("express");
const userControllers = require("../controllers/user");

const router = express.Router();

router.post("/sign-up",userControllers.signup);

module.exports = router;