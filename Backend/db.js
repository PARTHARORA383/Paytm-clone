const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://partharora9128:parth383@cluster0.c2xl46s.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
  username : String,  
  password : String,
  firstname : String,
  lastname : String
})
const User = mongoose.model("User" , userSchema);

//creating a accountschema 

const accountschema = new mongoose.Schema({
  userID : {
    type : mongoose.Schema.Types.ObjectId,
    ref : User ,
    required : true
  },
  balance : {
    type : Number , 
    required : true
  }
  ,
    username : {
       type : String,
       ref : User
    }
  
})

const Account = mongoose.model("Account" , accountschema);

module.exports={
  User,
  Account 
}