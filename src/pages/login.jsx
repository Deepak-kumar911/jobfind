import React, {useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { authUser } from '../services/auth';

export const Login = () => {
  const navigate = useNavigate()
    const [data,setData] = useState({email:"",password:"",role:"employee"})

    const handleOnchange =(e)=>{
        const {name,value} = e.target;
        setData({...data,[name]:value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();      
        if(data.role==="employee"){
       const res= await authUser(data,"employee","login");
       if(res){
        navigate("/")
       }
      }else if(data.role==="employer"){
        const res= await authUser(data,"employer","login");
        if(res){
         navigate("/")
        }
      }else{
        alert("Please select your Role")
      }
    }
  return (
    <div className='flex bg-blue-600 h-[100vh] items-center justify-center w-[100%]'>
    <div className='flex flex-col bg-white border-blue-600 w-[90%] md:w-[30%] p-4 rounded-lg'>
        <h4 className='text-center text-indigo-800 mb-4 capitalize'>Login as {data.role}</h4>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-2 w-[100%] '>
            <input type="text" name="email" onChange={handleOnchange} value={data.email} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Email ID' id="email" />
            <input type="password" name="password" onChange={handleOnchange} value={data.password} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Password' id="password" />
            <select name="role" id="role" onChange={handleOnchange} value={data.role} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none'>
              <option value="employee">Employee</option>
              <option value="employer">Employer</option>
            </select>
            <button type="submit" className='w-[100%]  py-2 bg-violet-500 rounded-md text-white text-lg hover:bg-orange-500 mt-4'>Login</button>
        </form>
        <div className='mt-3 text-center'>
            <h6 className='text-indigo-500'>Don't have a Account ?</h6>
            <NavLink to="/register" className="flex no-underline"><div className='w-[100%]  py-2 bg-red-500 rounded-md text-white text-lg hover:bg-orange-500'>Register</div></NavLink>
            </div>
    </div>
</div>
  )
}