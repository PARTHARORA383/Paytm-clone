export function InputBox({label ,onchange}){

return <div>

  <div  className="flex">
  <input onChange={onchange}  className = " bg-true-gray-600, border border-gray-500 text-gray-200 text-sm  focus:ring-blue-300 focus:border-blue-500 block  p-1 dark:bg-white-500 dark:border-true-gray-900  rounded-md dark:placeholder-gray-300 dark:grey-500- dark:focus:ring-blue-500 w-full  min-w-72" type = "text" placeholder= {label} required></input>
 </div>

</div>
}