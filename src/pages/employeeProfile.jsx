import React, { useContext, useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { authProvider } from '../App';
import { createEmployeeProfile,validateProfile } from '../services/auth';

export const EmployeeProfile = () => {
  const navigate = useNavigate()
  const userDetails = useContext(authProvider);
  const [data,setData] = useState({name:"",DOB:"",gender:"male",status:"Single",education:"12th pass", profession:"",address:"",skills:"",about:"",experience:"fresher",contact:"",hobbies:""})
  const handleOnchange = (e) =>{
    const {name,value} = e.target;
    setData({...data,[name]:value})
  }

  useEffect(()=>{
        if(userDetails.profileStatus){
          navigate("/")
          }
  },[userDetails,navigate])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {error} = validateProfile(data);
    if(error){
      toast.error(error.details[0].message)
    }else{
     const res = await createEmployeeProfile(data,userDetails._id);
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
    <div className='flex flex-col bg-white border-blue-600 w-[95%] md:w-[40%] md:p-4  p-2 rounded-lg'>
        <h4 className='text-center text-indigo-800 mb-4'>Your Profile Details</h4>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-2 w-[100%] '>
          <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
            <input type="text" name="name" onChange={handleOnchange} value={data.name} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Name' id="name" />
            <input type="date" name="DOB" onChange={handleOnchange} value={data.DOB} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='DOB' id="DOB" />
            <select name="gender" id="gender" onChange={handleOnchange} value={data.gender} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none'>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select name="status" id="status" onChange={handleOnchange} value={data.status} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none'>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            <input type="text" name="profession" onChange={handleOnchange} value={data.profession} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Profession' id="profession" />
            <select name="education" id="education" onChange={handleOnchange} value={data.education} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none'>
              <option value="below 12th">Below 12th</option>
              <option value="12th pass">12th pass</option>
              <option value="under graduate">Under Graduate</option>
              <option value="master graduate">Master Graduate</option>
              <option value="diploma">Diploma</option>
              <option value="degree">Degree</option>
              <option value="others">Others</option>
            </select>
            <input type="text" name="skills" onChange={handleOnchange} value={data.skills} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Skills' id="skill" />
            <input type="text" name="address" onChange={handleOnchange} value={data.address} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Address' id="address" />
            <input type="number" name="contact" onChange={handleOnchange} value={data.contact} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='contact No.' id="contact" />
            <select name="experience" id="experience" onChange={handleOnchange} value={data.experience} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none'>
              <option value="fresher">Fresher</option>
              <option value="below 6 month">Below 6 month</option>
              <option value="more than 6 month">More than 6 month</option>
              <option value="more than 1 year">More than 1 year</option>
            </select>
            <input type="text" name="hobbies" onChange={handleOnchange} value={data.hobbies} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='Hobbies' id="hobbies" />
            <textarea type="text" name="about" onChange={handleOnchange} value={data.about} className='border-b-2 rounded-md border-indigo-600 w-[100%] px-2 py-1 outline-none' placeholder='About' id="about" />
            </div>
            <button type="submit" className='w-[100%]  py-2 bg-violet-600 rounded-md text-white text-lg hover:bg-orange-400 mt-4'>Submit</button>
        </form>
    </div>
</div>
  )
}
