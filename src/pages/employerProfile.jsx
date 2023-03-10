import React, { useState,useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { authProvider } from '../App';
import { createEmployerProfile,validateEmployer } from '../services/auth';

export const EmployerProfile = () => {
  const navigate = useNavigate()
  const userDetails = useContext(authProvider);
  const [data,setData] = useState({name:"",company_name:"",location:"",employee_no:"",since:"",about:"",contact:""});

  const handleOnchange = (e) =>{
      const {name,value} = e.target;
      setData({...data,[name]:value})
  }
  const handleSubmit = async (e)=>{
        e.preventDefault();
        const {error} = validateEmployer(data);
        if(error){
          toast.error(error.details[0].message)
        }else{
         const res = await createEmployerProfile(data,userDetails._id);
           console.log("res",res);
           if(res){
            toast.success("Profile created!")
            navigate("/")
           }
        }
        console.log(data);
  }
  return (
    <div className='flex bg-blue-600 h-[100vh] items-center justify-center w-[100%]'>
        <div className='flex flex-col bg-white border-blue-600 w-[90%] md:w-[30%] p-4 rounded-lg'>
            <h4 className='text-center text-indigo-800 mb-4'>Company Details</h4>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-2 w-[100%] '>
            <input type="text" name="name" onChange={handleOnchange} value={data.name} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Your Name' id="name" />
                <input type="text" name="company_name" onChange={handleOnchange} value={data.company_name} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Company Name' id="company_name" />
                <input type="text" name="location" onChange={handleOnchange} value={data.location} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Location' id="location" />
                <input type="text" name="employee_no" onChange={handleOnchange} value={data.employee_no} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='No. of Employee' id="employee_no" />
                <input type="date" name="since" onChange={handleOnchange} value={data.since} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Since' id="since" />
                <input type="number" name="contact" onChange={handleOnchange} value={data.contact} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Contact No.' id="contact" />
                <textarea type="text" name="about" onChange={handleOnchange} value={data.about} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='About Comapny' id="about" />
                <button type="submit" className='w-[100%]  py-2 bg-violet-600 rounded-md text-white text-lg hover:bg-orange-400 mt-4'>Submit</button>
            </form>
        </div>
    </div>
  )
}
