import { Button } from "./Button";
import { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Header } from "./Header";

export function Sendmoney(){
    
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [transfer , setTransfer] = useState(null);
  const name = searchParams.get("name");
  const[amount  , setAmount] = useState();

return <div className=" flex justify-center items-center h-screen ">
  <div className=" bg-supabaseGray-900 w-96 h-96 rounded-lg " > 
  <div className="flex flex-col px-4 py-20 justify-center items-center ">
 <div className=" text-2xl font-medium pb-3 ">
  Send Money !
 </div>
 <div className="flex w-1/2 mx-5 my-1">
  <div className="rounded-full  font-medium text-center text-md text-supabaseGreen-900 mx-2 bg-white h-6 w-6">
    <Header label = {name[0].toUpperCase()}/>
  </div>
 <div className="ml-3 font-semibold">
  <Header label={name.toUpperCase()}/>
</div>
</div>
 <div className="py-7 w-72">
   <input  className = "rounded-md w-full h-8" onChange={(e)=>{
      setAmount(e.target.value)
  }}  placeholder=" $ " type ="number" ></input>
 </div>

  <div className= " flex bg-supabaseGreen-600 rounded-md w-32 h-7 justify-center items-center hover:bg-supabaseGreen-500 ">
   <Button Name= "Transfer"  onClick={async ()=>{
    try{
      const token =  localStorage.getItem("token")

      if(!token){
       console.log("Invalid Token")
      }
      
    const Transfermoney = await fetch("https://paytm-clone-1-ppmo.onrender.com/api/v1/account/transfer" , {
      method : "POST",
      headers : {
        "Content-Type": "application/json",
       Authorization : "Bearer " +  token,
      } ,
      body : JSON.stringify({
        to : id,
        amount : Number(amount)
      })
    }
    )
    console.log("hello")
   
   const response = await Transfermoney.json();
    
   if(response.msg == "Transaction succesfull"){

    setTransfer(true);
   }
   else{
    setTransfer(false);
   }
  
  }
  catch(error){
    console.log("Transfer failed" , error);
  }
}
   }
  />
  </div>
  </div>
  <div className="flex justify-center ">
    
    {transfer !== null && <div>
      {transfer ? (<div className = "text-supabaseBlue-200 ">
      <Header  label = "Transanction Successfull"> </Header>

    </div>) : (
      <div className = "text-red-500 "> 
        <Header  label = "Insufficient Balance"></Header>
      </div>
    )}
 </div>}
  </div>
  </div>
</div>
}