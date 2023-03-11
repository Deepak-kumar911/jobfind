import React, { useEffect, useState } from 'react'
import { authProvider } from '../App';
import { useContext } from 'react';
import { allPostJobs } from '../services/auth';
import {FcEmptyFilter} from 'react-icons/fc'
import { NavLink } from 'react-router-dom';
import { Card } from '../common/card';
export const AllJobs = () => {
    const [data,setData] = useState([])
    const userDetails = useContext(authProvider);
    useEffect(()=>{
           async function fetch(){
            console.log("details",userDetails._id);
            const {data:serverData} = await allPostJobs(userDetails._id)
            setData(()=>serverData)
            }fetch()
    },[userDetails])
    console.log("all jobs",data);
  return (
    <div className='container mt-4'>
            {data.length===0 ? <div className='flex flex-col items-center justify-center h-[80vh] text-center'>
               <div className='flex h-[4rem] w-[4rem] bg-blue-200 rounded-full justify-center items-center'><FcEmptyFilter className='text-5xl'/></div> 
                <h5 className='text-red-500'>No job posted yet</h5>
                <p>Fill free to post job and hire good candidate</p>
            </div>
            :<div className='grid grid-cols-12 gap-2'>
               {data.map(detail=><NavLink key={detail._id} to={`/view job/${detail._id}`} className='col-span-12 md:col-span-4 lg:col-span-3 no-underline border-2 rounded-lg bg-indigo-600  text-white border-white p-2 leading-4 cursor-pointer '>
                    <Card detail={detail}/>
                </NavLink>
                )}      
            </div>
            }

    </div>
  )
}
