import React, { useEffect, useState} from 'react'
import { authProvider } from '../App';
import { useContext } from 'react';
import { pendingJob } from '../services/auth';
import {FcEmptyFilter} from 'react-icons/fc'
import { NavLink } from 'react-router-dom';

export const PendingRequest = () => {
    const [data,setData] = useState([])
    const userDetails = useContext(authProvider);

    useEffect(()=>{
           async function fetch(){
            const {data:serverData} = await pendingJob(userDetails._id)
            setData(()=>serverData)
            }fetch()
    },[userDetails])

  return (
    <div className='container mt-4'>
            {data.length===0 ? <div className='flex flex-col items-center justify-center h-[80vh] text-center'>
               <div className='flex h-[4rem] w-[4rem] bg-blue-200 rounded-full justify-center items-center'><FcEmptyFilter className='text-5xl'/></div> 
                <h5 className='text-red-500'>No Pending Job yet ?</h5>
                <p>Fill free to post job and hire good candidate</p>
            </div>
            :<div className='grid grid-cols-12 gap-2'>
               {data.map(detail=> detail.status.map(user => <NavLink key={user.employee_id} to={`/view profile/${user.employee_id}/${detail._id}`} className='col-span-12 md:col-span-4 lg:col-span-3 no-underline border-2 rounded-lg bg-orange-400  text-white border-white p-2 leading-3 cursor-pointer '>
                    <p className='capitalize text-xl text-center'>Job: {detail.job} </p>
                    <hr className='border-4'/>
                    <div className=''>
                    <p className='capitalize'>skills: {detail.skills}</p>
                    <p className='capitalize'>salary: {detail.salary}</p>
                    <div className='flex gap-x-2'>
                    <p className='capitalize '>openings:</p>
                    <div className='w-[1rem] h-[1rem] text-white rounded-full bg-indigo-500 flex justify-center items-center text-sm'>
                      {detail.openings}
                    </div>
                    </div>
                    </div>
                </NavLink>
                ))}      
            </div>
            }

    </div>
  )
}
