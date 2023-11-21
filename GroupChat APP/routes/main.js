
const express = require("express");
const mainControllers = require("../controllers/main")

const router = express.Router();

router.get("/",mainControllers.getMainPage);
router.get("/login_page",mainControllers.getLoginPage);
router.get("/chat_page",mainControllers.getChatPage);

module.exports = router;