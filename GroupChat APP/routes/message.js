const express = require("express");
const messageControllers = require("../controllers/message");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/postMessage", auth.authenticate,messageControllers.postMessage);
router.get("/getMessages/:lastMessageid" , messageControllers.getMessages);

module.exports = router;