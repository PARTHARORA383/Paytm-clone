const express = require("express");
const  userRouter = require("./user")
const accountrouter = require("./account")



const router = express.Router()

router.use("/user" , userRouter);
router.use("/account" , accountrouter);



module.exports = router;


