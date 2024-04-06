const express = require('express');
const {Account} = require("../db");
const {  authmiddleware} = require('../middleware');
const {default : mongoose} = require("mongoose")

const router = express.Router()

router.get("/balance" ,  authmiddleware, async (req,res)=>{
    const account = await Account.findOne({
    userID : req.userId
  })
 
  res.json({
    balance : account.balance
  })
}
)
router.post("/transfer" , authmiddleware , async (req,res)=>{

  try{


  const session =  await mongoose.startSession();

  session.startTransaction();
  const{amount , to} = req.body;

   const account =  await Account.findOne({
    userID : req.userId
   }).session(session)

   if(!account || account.balance < amount ){
    await session.abortTransaction();
    res.status(411).json({
      msg : "Invalid user or low balance"
    })
  }


    const toAccount = await Account.findOne({
      userID : to
    }).session(session)
    
    if(!toAccount){
      await session.abortTransaction();
      res.status(411).json({
        msg : "Reciever doesn't exists"
      })
    }


    // Transfer money 
    await Account.updateOne({userID : req.userId} , {$inc : {balance : -amount}}).session(session);
    await Account.updateOne({userID : to} , {$inc : {balance : amount}}).session(session)
     
   //commit transactions
   
   await session.commitTransaction();
   res.json({
     msg : "Transaction succesfull"
    })
  }
  catch(error){
    console.log("Transaction failed" , error)
    res.status(500).json({ msg: "An error occurred during the transaction" });
  }
  }
)

 
 module.exports = router;