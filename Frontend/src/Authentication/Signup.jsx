import { BottomPlate } from "../Components/Bottomplate";
import { Button } from "../Components/Button";
import { Header } from "../Components/Header";
import { InputBox } from "../Components/InputBox";
import { useState } from "react";
import { Subheading } from "../Components/Subheading";



export function Signup() {
  const[username , setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[firstname , setFirstname] = useState("");
const[lastname , setLastname] = useState("");
const [signedup ,setSignedup] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-h-screen bg-true-gray-600">
      <div className={`flex justify-center items-center lg:items-center xl:justify-center`}>
        <div className={`bg-true-gray-200 lg:bg-true-gray-600 p-8 rounded-lg m-10 sm:w-3/4 lg:w-2/5 xl:w-2/5 items-center  ${signedup ? 'invisible duration-150' : 'visible' }`}>
          <div className={`font-medium text-xl text-gray-100 mb-1`}>
            <Header label="Get Started" />
          </div>
          <div className="font-medium text-xs text-gray-300 mb-7 ">
            <Subheading label= "Create a new account"/>
          </div>
          <div className="mb-6">
            <InputBox onchange={(e)=>{
              setUsername(e.target.value)
            }} label="Username" />
          </div>
          <div className="mb-6">
            <InputBox  onchange = {(e)=>{
               setPassword(e.target.value)
            }}label="Password" />
          </div>
          <div className="mb-6">
            <InputBox onchange={(e)=>{
               setFirstname(e.target.value)
            }} label="Firstname" />
          </div>
          <div className="mb-6">
            <InputBox  onchange = {(e)=>{
              setLastname(e.target.value)
            }}label="Lastname" />
          </div>
          <div className="bg-green-700 hover:bg-green-600  underline-offset-4 text-gray-200 border-gray-300 rounded-md min-w-72  text-center">

        <Button onClick={async()=>{
          const response = await fetch("https://paytm-clone-1-ppmo.onrender.com/api/v1/user/signup",{method : "POST",
          headers : {"Content-type": "application/json "
          
        },
        body :JSON.stringify({
          username : username,
          password :password,
           firstname : firstname,
           lastname:lastname,
          }
          
          )
          
        })
       

        const data = await response.json(); // Parse JSON response
        if(data.msg === "user already exists"){
          <div>
            Email already Taken
          </div>
        }
        
        localStorage.setItem("token", data.token); // Store token in local storage
        
        if(data.token){
          setSignedup(true);
        }
       else{
        setSignedup(false)
       }
      }}Name = "Signup"></Button>
        </div>

            <div className="hover:underline items-center justify-center text-sm ">
            <BottomPlate text = "Already a User ?" buttonname= "Already a User? Signin" to = "/signin"> </BottomPlate>
            </div>
      </div>
         
        <div>
      {signedup !== null && (
  <div className="grid grid-rows-2 ">
    {signedup ? (
      <div className="flex">
        <div className=" min-w-96">
        <Header  className ="text-supabaseGray-500 ,font-medium text-md" label = "Thank you for becoming a user. Signin to continue"/>
        <div className="bg-supabaseGreen-600 min-w-52 h-9hover:bg-supabaseGreen-500 rounded-lg font-medium">
        <BottomPlate className = "text-center "buttonname="Get Started" to = {"/Dashboard"}/>
        </div>

       
    </div>
      </div>
    ) : (
      <div>Invalid details</div>
    )}
    
  </div>
)}



</div>
      </div>
 
      
      <div className="hidden lg:flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white">
        <h2 className="text-3xl font-semibold mb-4">Hi there!</h2>
        <p className="text-lg text-center">Welcome to our platform. Sign up now to get started.</p>
    
      </div>
    </div>
  );
}
