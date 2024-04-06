export function AppBar({onchange}){
  return <div className=" flex max-w-screen-xl rounded-xl max-h-10  ml-20 ">
   <input onChange={onchange}  placeholder = "Search User you want to send money" className=" flex w-full h-10 rounded-xl shadow-md font-medium text-md px-3 text-gray-100" type ="text"></input>
    </div>
}