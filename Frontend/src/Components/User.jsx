import { useEffect, useState } from "react"
import { AppBar } from "./AppBar";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
export function Users(){


const [users , setUsers] = useState([]);
const[filter , setFilter] = useState([]);
 
useEffect(()=>{

  const fetchData = async ()=>{
    try{
      const response  = await fetch("https://paytm-clone-1-ppmo.onrender.com/api/v1/user/bulk?filter="+ filter , {method : "GET" , headers:{
        "Content-type": "application/json"
      }});
      if(!response.ok){
        throw new Error("Network response was not ok");
      }
      const json =  await response.json();
      setUsers(json.user);
    }
    catch(e){
      console.log("error" + e);

    }
    }
    fetchData();
  }

,[filter])


  return <div className= "m-9">
  
<AppBar onchange={async (e)=>{
  const response = await e.target.value
  setFilter(response);
}}/>
    <div>
      {users.map(user=><User user ={user}/>)}
    </div>
  </div>
}

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto my-3">

      <div className="flex items-center h-15 shadow-md bg-supabaseGray-900  rounded-lg">
        <div className="flex-shrink-0 w-11 h-11 bg-supabaseGray-600 shadow-lg rounded-full flex items-center justify-center mx-4">
          <span className=" text-gray-100 font-bold text-lg">{user.firstname[0].toUpperCase()}</span>
        </div>
        <div className="flex-grow px-5 py-2 flex items-center justify-between bg- rounded-md">
          <div className=" text-gray-100 font-medium text-lg">{user.firstname[0].toUpperCase() + user.firstname.slice(1)} {user.lastname}</div>
        
           
            <div className="bg-blue-950 text-gray-300 w-32 h-7  text-center rounded-lg hover:bg-blue-800 ">
             <Button Name= "Send Money" onClick={(e)=>{
              navigate("/Sendmoney?id=" + user._id + "&name=" + user.firstname);
              
             }}/>
            </div>
         
        </div>
      </div>
    </div>
  );
}