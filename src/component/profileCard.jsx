import React, { useEffect, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { userProfile } from '../services/auth';
import { jobResponse } from '../services/auth';
import {toast} from 'react-toastify'

export const ProfileCard = () => {
    const param = useParams()
    const navigate = useNavigate()
    console.log(param.job_id);
    const [data, setData] = useState({ DOB: "", about: "", address: "", education: "", email: "", experience: "", name: "", profession: "", skills: "", contact: "", hobbies: "", status: "", gender: "" })
    const [toogle, setToggle] = useState(0)
    const dateDOB = data.DOB ? new Date(data.DOB).toLocaleDateString() : ""
    useEffect(() => {
        async function fetch() {
            if (param.target === "view") {

            } else {
                const { data: serverData } = await userProfile(param.target)
                setData(serverData)
            }
        } fetch()
    }, [param])
    console.log(data);

   const handleRemark = async (remark)=>{
    const res = {job_id:param.job_id,
        employee_id:param.target,
        response:remark
}
     const {data:serverData} = await jobResponse(res); 
     if(serverData){
        toast("Response updated!")
            navigate("/")
     }

   }

    return (
        <>
            <div className='flex items-center  m-auto w-[90%]  md:w-[50%] h-[90vh]'>
                <div className=' border-2 border-indigo-400 rounded-lg w-[100%] h-[80vh] p-4'>
                    <div className='flex flex-col md:flex-row  items-center gap-y-2 justify-between'>
                        <div className='flex items-center gap-x-2 capitalize'><BsPersonCircle className='text-3xl md:text-5xl text-blue-500' /><h5>{data.name}</h5></div>
                        <div className='flex gap-x-1'>
                            <div className='cursor-pointer' onClick={()=>handleRemark("accept")}>
                                <h6 className='border rounded-md bg-green-400 border-green-400 text-white hover:bg-indigo-500  px-2 py-1 text-center'>Accept</h6>
                            </div>
                            <div className='cursor-pointer' onClick={()=>handleRemark("reject")}>
                                <h6 className='border rounded-md bg-red-600 border-green-800 text-white hover:bg-orange-500 px-2 py-1 text-center'>Reject</h6>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {param.target === "view" ? "" :
                        <div>
                            <nav className="nav">
                                <p className={`nav-link active cursor-pointer  ${toogle === 0 ? "border-b-2 border-indigo-400 rounded-md" : ""}`} aria-current="page" onClick={() => setToggle(0)}>About</p>
                                <p className={`nav-link active cursor-pointer  ${toogle === 1 ? "border-b-2 border-indigo-400 rounded-md" : ""}`} onClick={() => setToggle(1)}>Persional Details</p>
                            </nav>
                        </div>
                    }

                    <div className={`${toogle === 0 ? "block" : "hidden"}`}>
                        <div className='grid grid-cols-2 capitalize'>
                            {/*profile details */}
                            <h6>email:</h6>
                            <p className='lowercase'>{data.email}</p>
                            <h6>education:</h6>
                            <p>{data.education}</p>
                            <h6>professoin:</h6>
                            <p>{data.profession}</p>
                            <h6>skills:</h6>
                            <p>{data.skills}</p>
                            <h6>about:</h6>
                            <p>{data.about}</p>
                            <h6>experience:</h6>
                            <p>{data.experience}</p>
                            <h6>contact:</h6>
                            <p>{data.contact}</p>
                        </div>
                    </div>

                    <div className={`${toogle === 1 ? "block" : "hidden"}`}>
                        <div className='grid grid-cols-2 capitalize'>
                            {/*personal details */}
                            <h6>DOB:</h6>
                            <p>{dateDOB}</p>
                            <h6>gender:</h6>
                            <p>{data.gender}</p>
                            <h6>status:</h6>
                            <p>{data.status}</p>
                            <h6>address:</h6>
                            <p>{data.address}</p>
                            <h6>hobbies:</h6>
                            <p>{data.hobbies}</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}







