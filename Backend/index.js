const express = require('express');
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());

const rootrouter= require("./routes/index");

app.use("/api/v1" , rootrouter);


app.listen(3000 , (req , res)=>{
  console.log("paytm-running")

})
