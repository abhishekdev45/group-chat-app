const express = require("express");
const groupControllers = require("../controllers/group");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/createGroup", auth.authenticate,groupControllers.createGroup);
// router.get("/getGroupDetails/:groupId" , groupControllers.getGroupDetails);
router.get("/getUserGroups" , auth.authenticate , groupControllers.getUserGroups);

module.exports = router