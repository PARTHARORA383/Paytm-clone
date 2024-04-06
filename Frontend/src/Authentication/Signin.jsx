import { useState } from "react"
import { Header } from "../Components/Header"
import { InputBox } from "../Components/InputBox"
import { Button } from "../Components/Button";
import { useNavigate } from 'react-router-dom';

export function Signin(){
  
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");

  const navigate = useNavigate();


  return <div className=" grid grid-cols-2 max-h-screen ">
    <div className= "  flex flex-col justify-center items-center ">
      <div className="text-white  text-xl  mb-5">    
       <Header label = "Welcome Back ! "/>
      </div>
      <div className="bg-supabaseGray-800 text-white mb-4">
        
      <InputBox label = "Email" onchange={(e)=>{
        setUsername(e.target.value);
      }}/>
      </div>
      <div className=" mb-2">
      <InputBox label = "Password" onchange={(e)=>{
        setPassword(e.target.value);
      }}/>
      </div>
      {errormessage && <p className="text-red-600 duration-300 text-sm">{errormessage}</p>}
       <div className="flex text-white mt-2 bg-supabaseGreen-600 w-32 justify-center rounded-lg hover:bg-supabaseGreen-500  ">
         
      <Button  Name = "Signin" onClick = {async()=>{ 
       
        
        const response = await fetch("http://localhost:3000/api/v1/user/signin" , { 
          method : "POST" ,
          
          body : JSON.stringify({
            username : username,
            password : password
            
          }),
          headers : {
            "Content-type" : "application/json"
          }
        }) 


        const data = await response.json();
         
        if(data){
          localStorage.setItem("token" ,data.token)
        }
        if(data.msg == "User does't exist"){
        setErrormessage("Invalid Email or Password");
        }

        else{
          navigate("/Dashboard");
          
        }

        
      }
      
      
    }/>
    </div>
   



    </div>
    <div className=" hidden lg:flex flex-col bg-gradient-to-br min-h-screen from-purple-500 to-blue-800 justify-center items-center">
      <h2 className="font-semibold text-2xl mb-4 "> Hi There!</h2>
      <p className="text-md ">Signin and enjoy seamless transactions</p>

    </div>



  </div>


}