import React, { useContext, useEffect, useState } from 'react'
import { BsBuildingFillCheck } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom';
import { viewJob,viewOffice } from '../services/auth';
import { authProvider } from '../App';
import { applyJob } from '../services/auth';
import { toast } from 'react-toastify';

export const JobCard = () => {
    const [data,setData] = useState({description:"",english:"",experience:"",job:"",openings:"",qualification:"",
    salary:"",skills:"",timing:"",about:"",company_name:"",email:"",contact:"",location:"",since:"",employee_no:""})
    const [display,setDisplay] = useState(false);
    const dateFormat = data.since ? new Date(data.since).toLocaleDateString() : "Na"
    const userDetails = useContext(authProvider)
    const [toogle, setToggle] = useState(0)
    const param = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetch() {
            if (param.target === "apply") {
                setDisplay(true)
                const {data:serverData} =  await viewJob(param.job_id)
                const {data:officeDetail} = await viewOffice(param.employer_id)
                setData({...serverData,...officeDetail})
                console.log(param.job_id,"job");
            }else{
            const {data:serverData} =  await viewJob(param.target)
            const {data:officeDetail} = await viewOffice(userDetails._id)
            setData({...serverData,...officeDetail})
            setDisplay(false)
        }
        
        } fetch()
    }, [userDetails,param])

    const handleApply = async()=>{
        const res = {
            job_id:param.job_id,
            employee_id:userDetails._id,
            remark:"apply"
        }
        const  response =  await applyJob(res);
        if(response){
            toast.success("Applied for job!")
            navigate("/")
        }

    }
    return (
        <>
            <div className='flex items-center  m-auto w-[90%]  md:w-[50%] h-[90vh]'>
                <div className=' border-2 border-indigo-400 rounded-lg w-[100%] h-[80vh] p-4'>
                    <div className='flex  items-center  justify-between'>
                        <div className='flex items-center gap-x-2 capitalize'><BsBuildingFillCheck className='text-5xl text-green-500' /><h5>{data.job}</h5></div>
                        <div className={`${display ? "block cursor-pointer" : "hidden"}`} onClick={handleApply}>
                            <h6 className='border rounded-md bg-green-400 border-green-400 text-white hover:bg-indigo-500 cursor-pointer px-2 py-1 text-center'>Apply for Job</h6>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <nav className="nav">
                            <p className={`nav-link active cursor-pointer  ${toogle === 0 ? "border-b-2 border-indigo-400 rounded-md" : ""}`} aria-current="page" onClick={() => setToggle(0)}>Job Details</p>
                            <p className={`nav-link active cursor-pointer  ${toogle === 1 ? "border-b-2 border-indigo-400 rounded-md" : ""}`} onClick={() => setToggle(1)}>Office Details</p>
                        </nav>
                    </div>
                    <div className='h-[50vh] overflow-auto'>
                    <div className={`${toogle === 0 ? "block" : "hidden"}`}>
                        <div className='grid grid-cols-2'>
                            {/* job details */}
                            <h6>Qualification:</h6>
                            <p>{data.qualification}</p>
                            <h6>English:</h6>
                            <p>{data.english}</p>
                            <h6>Experience:</h6>
                            <p>{data.experience}</p>
                            <h6>Description:</h6>
                            <p>{data.description}</p>
                            <h6>Skills:</h6>
                            <p>{data.skills}</p>
                            <h6>Salary:</h6>
                            <p>{data.salary}</p>
                            <h6>Timing:</h6>
                            <p>{data.timing}</p>
                            <h6>Openings:</h6>
                            <p>{data.openings}</p>
                        </div>
                    </div>
                    {/* office details */}
                    <div className={`${toogle === 1 ? "block" : "hidden"}`}>
                        <div className='grid grid-cols-2'>
                            <h6>Comapany Name:</h6>
                            <p>{data.company_name}</p>
                            <h6>Email:</h6>
                            <p>{data.email}</p>
                            <h6>About:</h6>
                            <p>{data.about}</p>
                            <h6>Since:</h6>
                            <p>{dateFormat}</p>
                            <h6>Location:</h6>
                            <p>{data.location}</p>
                            <h6>No. of employee:</h6>
                            <p>{data.employee_no}</p>
                            <h6>Contact:</h6>
                            <p>{data.contact}</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}









