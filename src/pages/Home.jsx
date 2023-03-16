import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authProvider } from '../App';
// import img from '../../public/images/image1.png'

export const Home = () => {
  const userDetails = useContext(authProvider);
  const navigate = useNavigate()
  const auth = localStorage.getItem("token")

  useEffect(()=>{
    if(!auth){
        navigate("/login")
    }
  },[userDetails,navigate,auth])
  return (
    <div className='flex flex-col items-center justify-center h-[90vh]'>
      <div className="grid grid-cols-1 md:grid-cols-2">
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-indigo-500'>Welcome to FindJob</h1>
        <h4 className='capitalize text-orange-600'>{userDetails.name} !</h4>
        <p className='text-blue-600 text-xl font-medium'>Happy to see You</p>
        <p className='text-blue-600 text-xl font-medium'>{userDetails.employee  ? "Find best job that metch your profile" : "Hire Desire and impressive Candidate"}</p>
        </div >
        <div className='flex items-center  justify-center w-[100%] h-[100%]'><img src="images/image2.webp" className='flex items-center justify-center w-[80%] h-[80%]' alt="cover"/></div>
      </div>
    </div>
  )
}
