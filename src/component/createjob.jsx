import React, { useState,useEffect } from 'react';
import { useContext } from 'react';
import { BsBuildingFillCheck } from 'react-icons/bs';
import { authProvider } from '../App';
import { createJob } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

export const Createjob = () => {
    const userDetails = useContext(authProvider)
    const navigate = useNavigate()
     const [data,setData] = useState({employer_id:userDetails._id,job:"",skills:"",description:"",timing:"",salary:"",openings:"",experience:"fresher",english:"basic",qualification:"12th Pass"})
  useEffect(()=>{
        if(userDetails && userDetails.employee){
            navigate("/")
        }
        
  },[userDetails,navigate])

     const handleOnchange = (e)=>{
        const {name,value} = e.target;
        setData({...data,[name]:value})
     }
     
     const handleSubmit = async (e)=>{
        e.preventDefault();
        setData({...data,employer_id:userDetails._id})
        console.log(data);
        const res = await createJob(data)
        if(res){
        toast.success("Posted new Job!")
        navigate("/")
        }
     }
    return (
        <>
            <div className='flex items-center  m-auto w-[90%]  md:w-[50%] h-[90vh]'>
                <div className=' border-2 border-indigo-400 rounded-lg w-[100%] h-[80vh] p-4'>
                    <div className='flex  items-center  justify-between'>
                        <div className='flex items-center gap-x-2'><BsBuildingFillCheck className='text-4xl md:text-5xl text-green-500' /><h5 className='text-sm md:text-2xl capitalize'>{userDetails.name}</h5></div>
                        <div className='cursor-pointer' onClick={handleSubmit}>
                            <h6 className='border rounded-md bg-green-400 border-green-400 text-white hover:bg-indigo-500 cursor-pointer px-1 md:px-2 py-1 text-center text-xs md:text-xl'>Post Job</h6>
                        </div>
                    </div>
                    <hr />
                    <div>
                      <h4>About Job</h4>
                    </div>
                    <div className=' w-[100%] h-[50vh] overflow-auto'>
                        <div className='grid grid-cols-1 place-self-center gap-y-2'>
                            {/* job details */}
                            <input type="text" name="job" value={data.job} onChange={handleOnchange}  className='border-b-2 border-indigo-400 outline-none' placeholder='Job type' id="job" />
                            <h6>Qualification:</h6>
                            <select name="qualification" value={data.qualification} onChange={handleOnchange} id="qualification"  className='border-2 rounded-md border-blue-600 px-2 outline-none'>
                                <option value="Below 12th">Below 12th</option>
                                <option value="12th Pass">12th Pass</option>
                                <option value="Under Graduate">Under Graduate</option>
                                <option value="Master Graduate">Master Graduate</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Degree">Degree</option>
                                <option value="Others">Others</option>
                            </select>
                            <h6>English:</h6>
                            <select name="english" id="english" value={data.english} onChange={handleOnchange} className='border-2 rounded-md border-blue-600 px-2 outline-none'>
                            <option value="no Need">No need</option>
                                <option value="basic">Basic</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="fluant english">Fluant English</option>
                            </select>
                            <h6>Experience:</h6>
                            <select name="experience" value={data.experience} onChange={handleOnchange} id="experience" className='border-2 rounded-md border-blue-600 px-2 outline-none'>
                            <option value="fresher can apply">Fresher</option>
                                <option value="below 6 month">Below 6 month</option>
                                <option value="more than 6 month">More than 6 month</option>
                                <option value="more than 1 year">more than 1 year</option>
                            </select>
                            <h6>Responsibility:</h6>
                            <textarea name="description" value={data.description} onChange={handleOnchange} className='border-2 border-indigo-400 outline-none px-2' id="description" cols="25" rows="5"/>
                            <input type="text" value={data.skills} onChange={handleOnchange} className='border-b-2 border-indigo-400 outline-none px-2' name="skills" placeholder='Skills' id="skills" />
                            <input type="number" value={data.salary} onChange={handleOnchange} className='border-b-2 border-indigo-400 outline-none px-2' name="salary" placeholder='Salary' id="salary" />
                            <input type="text" value={data.timing} onChange={handleOnchange} className='border-b-2 border-indigo-400  outline-none px-2' placeholder='Timing' name="timing" id="timing" />
                            <input type="number" value={data.openings} onChange={handleOnchange} className='border-b-2 border-indigo-400 outline-none px-2' placeholder='Openings' name="openings" id="openings" />
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
