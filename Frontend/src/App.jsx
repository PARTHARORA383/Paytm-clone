

import './App.css'
import { Signup } from './Authentication/Signup'
import { BrowserRouter , Route , Routes } from "react-router-dom";
import { Dashboard } from './Components/Dashboard';
import { Users } from './Components/User';
import { Navbar } from './Components/Navbar';

import { Sendmoney } from './Components/Sendmoney'
import { Signin } from './Authentication/Signin';






function App() {
 

  return (
  <>
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path = "/signup" element= {<Signup isSignup={true}/>} />
      <Route path = "/Dashboard" element={<Dashboard/>}/>
      <Route path = "/users" element={<Users/>}/>
      <Route path = "/signin" element = {<Signin/>} ></Route>
      <Route path = "/Sendmoney" element = {<Sendmoney/>} ></Route>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
