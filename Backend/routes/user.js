const express = require("express")
const router = express.Router();
const { authmiddleware}  = require("../middleware");
const zod = require("zod")
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const  {JWT_SECRET} = require("../config");

router.use(express.json());
const SignupBody = zod.object({
  username : zod.string().email(),
  password : zod.string(),
  firstname : zod.string(),
  lastname : zod.string(),

})
router.post("/signup" , async function(req,res){
  const signup  = SignupBody.safeParse(req.body)
  
if(!signup.success){
return res.json({
  msg : "Email already taken / Invalid Inputs"
})
}


const existingUser = await User.findOne({
  username : req.body.username
})

if(existingUser){
  return res.json({
    msg : "user already exists"
  })
}

const user = await User.create({
username : req.body.username,
password : req.body.password,
firstname : req.body.firstname,
lastname : req.body.lastname

})

const userId = user._id;

await Account.create({
  username : user.username,
  userID : userId, 
  balance  : 1 + Math.random() * 1000
})

const token = jwt.sign({
  userId
}, JWT_SECRET);

res.json({
  message: "User created successfully",
  token: token
})

})

const SigninBody = zod.object({
  username : zod.string().email(),
password : zod.string()
})

router.post('/signin' , async function(req,res){

  const signin  = SigninBody.safeParse(req.body)
  if(!signin.success){
    return res.json({
      msg : "User does't exist"
    })
  }

  const user = await User.findOne({
    username :req.body.username,
    password : req.body.password
  })
 
  
if(user){
  const token = jwt.sign({
    userId  : user._id
  } , JWT_SECRET)

  res.json({
    token : token
  })
  return;
}

res.status(411).json({
  msg : " Error while logging"
})
  
})

const updateBody = zod.object({
  password : zod.string().optional(),
  firstname : zod.string().optional(),
  lastname : zod.string().optional(),
})

//Update user information
router.put("/",  authmiddleware ,  async(req ,res)=>{
const update = updateBody.safeParse(req.body)

if(!update.success){
  return res.status(403).json({
    msg : " user doesn't exist"
  })

  
}
await User.updateOne({_id : req.userId} , req.body)

res.json({
  msg : "updated succesfully"
})
})



router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  
  const users = await User.find({
      $or: [{
          firstname: {
              "$regex": filter
          }
      }, {
          lastname: {
              "$regex": filter
          }
      }]
  })

  res.json({
      user: users.map(user => ({
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          _id: user._id
      }))
  })

})


module.exports = router;

