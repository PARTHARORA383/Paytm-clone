import { Signup } from "../Authentication/Signup";
import { BottomPlate } from "./Bottomplate";


export function Navbar({isSignup , isSignin}){

if(isSignin || isSignup){
  return null;
}

  return<div>

  
  <div className="flex  max-w-screen min-h-14  bg-supabaseGray-900 border-supabaseGray-100 border-b-2 shadow-md justify-between items-center">
      <div className="px-7 text-white font-medium text-lg hover:text-supabaseYellow-400 ">
        <BottomPlate buttonname={"PayBank"} to={"/Dashboard"}/>
      </div>
      <div className="flex ">
        <div className=" text-white hover:text-supabaseGray-300">
          <BottomPlate buttonname={"Pay Money"} to ={"/users"}/>
        </div>
        <div className=" text-white hover:text-supabaseGray-300">
          <BottomPlate buttonname={"Balance and History"}/>
        </div>
      </div>
      <div className="flex ">
        <div className="text-white hover:text-green-500">

       <BottomPlate buttonname={"Signup"} to={"/signup"} />
        </div>
      </div>
      
   


  </div>
  </div>
}