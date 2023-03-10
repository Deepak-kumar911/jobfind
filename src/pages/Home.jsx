import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authProvider } from '../App';

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
    <div className='flex flex-col items-center justify-center h-[80vh]'>
        <h1>Welcome to FindJob</h1>
        <h4 className='capitalize text-blue-800'>{userDetails.name} !</h4>
        <p className='text-red-600 text-xl font-medium'>Happy to see You</p>
    </div>
  )
}
