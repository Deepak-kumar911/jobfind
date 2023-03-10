import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { userJobs } from '../services/auth'

export const ViewAllJobs = () => {
    const [data,setData] = useState([])
    const [query,SetQuery] = useState("")
    const selectedData = query.length===0 ? data : data.filter(details=>details.job.toLowerCase().includes(query.toLowerCase()))
    console.log(selectedData);
        useEffect(()=>{
           async function fetch(){
            const {data:serverData} =   await userJobs()
            setData(serverData)
            }fetch()
        },[])
const handleSearch = (e) =>{
    SetQuery(e.target.value)
}
console.log(query.toLowerCase());
  return (
    <div className='container mt-4'>
        <div className='border-2 rounded-lg border-blue-600'><input type="text" name="search" value={query} onChange={handleSearch} id="search"  className='flex outline-none w-[100%] px-2 py-1' placeholder='Search Desire Job'/></div>
        
        <div className='flex items-center justify-center py-2 text-indigo-600 text-md'><h1>All Jobs</h1></div>
        <div className='grid grid-cols-12 gap-2'>
            {selectedData.map((details=> <NavLink key={details._id} to={`/view job/apply/${details._id}/${details.employer_id}`} className='col-span-6 md:col-span-4 lg:col-span-3 cursor-pointer no-underline  rounded-md border-2 border-orange-400 text-blue-600 p-2'>
                 <h5 className='capitalize'>{details.job}</h5>
                 <hr className='border-4 border-orange-600 ' />
                 <div className='flex flex-col leading-4'>
                 <p className='capitalize'>Skills: {details.skills}</p>
                 <p className='capitalize'>salary: {details.salary}</p>
                 </div>
            </NavLink>  
                ))}
        </div>
        </div>
  )
}
