import{Link, useNavigate} from 'react-router-dom'
import React, {useState} from 'react'
import {useDispatch } from 'react-redux';
import apiService from '../utils/apiService.js';
import loginImage from "../assets/loginImage.webp"
import { login } from '../Redux/authSlice.js';
import NavBar from '../components/navBar.js';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await apiService.post("/user/login", {email, password})
      
      if (response.status===200) {
        const isAdmin = response.data.isAdmin
        console.log("response........",response.data)
        navigate('/');
        dispatch(login({isAdmin}));
      } else {
        console.error("Login Failed");
      }
    } catch (error){
      console.error("Error: ", error);
    }
  };


  return (    
    <>
    <NavBar />
    <div className="bg-gray-100 flex justify-center items-center h-screen">
          {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block ">
        <img src={loginImage} className="h-screen"/>
      </div>

     {/* Right: Login Form  */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 h-screen">
        <h1 className="text-2xl font-semibold">Login</h1>
        <form action="#" method="POST">
          
          {/* Email Input */}
          <div className="mb-4 mt-8">
            <label className="block text-gray-600 ">Email</label>
            <input 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="email" 
              name="email"
              placeholder="Email"
              value={email} 
              onChange={(e)=>setEmail(e.target.value)}
              />
          </div>
          
          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" 
              autoComplete="off" 
              type="password"
              name="password" 
              placeholder="Password" 
              value={password}
              onChange= {(e)=> setPassword(e.target.value)}
              />
          </div>
          
          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
            <label className="text-gray-600 ml-2">Remember Me</label>
          </div>
          
          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
          </div>
          
          {/* Login Button */}
          <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
        </form>
        
        {/* Sign up Link */}
        <div className="mt-6 text-blue-500 text-center">
          <Link to="/register" className="hover:underline">Sign up Here</Link>
        </div>
      </div>
    </div>
    </>
  )
}
  
export default Login;
    