import axios from 'axios';
import {toast} from 'react-toastify';
import Joi from 'joi';



const startpoint = "https://jobfind-backend.vercel.app/api"

const authUser = async (data,point,part) =>{
  const endpoint = point==="employee" ? "employee" : "employer";
  const endpart = part==="login" ? "login" :  "register";
    console.log(endpoint);
  try {
    const res = await axios.post(`${startpoint}/${endpoint}/${endpart}`,{
     email:data.email,
     password:data.password
    }) 
    localStorage.setItem("token",res.headers["x-auth-token"])
    return localStorage.getItem("token");
  } catch (err) {
    toast.error(err.response.data)
  }
}


const  createEmployeeProfile = async(data,_id)=>{
try {
  const res = await axios.patch(`${startpoint}/employee/profile/${_id}`,data)
  if(res){
    localStorage.removeItem("token");
    localStorage.setItem("token",res.headers["x-auth-token"])
    return localStorage.getItem("token")
  }
} catch (err) {
  toast.error(err.response.data)
}}

const  createEmployerProfile = async(data,_id)=>{
  try {
    const res = await axios.patch(`${startpoint}/employer/profile/${_id}`,data)
    if(res){
      localStorage.removeItem("token");
      localStorage.setItem("token",res.headers["x-auth-token"])
      return localStorage.getItem("token")
    }
  } catch (err) {
    toast.error(err.response.data)
  }}


  

  const userProfile =async (_id) =>{
    try {
      return await axios.get(`${startpoint}/employee/${_id}`)
    } catch (err) {
    toast.error(err.response.data)
    }
  }
  
  const createJob = async (data) =>{
    try {
      return await axios.post(`${startpoint}/job/new`,data)   
    } catch (err) {
    toast.error(err.response.data)
    }
  }

  const allPostJobs = async(_id) =>{
    try {
      return axios.get(`${startpoint}/job/createdjob/${_id}`)
    } catch (err) {
    toast.error(err.response.data)
    }
  }


  const viewJob = async(_id) =>{
    try {
      return axios.get(`${startpoint}/job/view/${_id}`)
    } catch (err) {
    toast.error(err.response.data)
    }
  }

  const viewOffice = async(_id) =>{
    try {
      return axios.get(`${startpoint}/employer/${_id}`)
    } catch (err) {
    toast.error(err.response.data)
    }
  }

 const pendingJob = (_id) =>{
  try {
    return axios.get(`${startpoint}/job/pending/${_id}`)
  } catch (err) {
  toast.error(err.response.data)
  }
 } 

 const jobResponse =(data)=>{
  try {
    return axios.put(`${startpoint}/job/response`,data)
  } catch (err) {
  toast.error(err.response.data)
  }
 }

const userJobs =async ()=>{
  try {
    return await axios.get(`${startpoint}/job/alljob`)
  } catch (err) {
  toast.error(err.response.data)
  }
}

const applyJob =async (res)=>{
  try {
    return await axios.put(`${startpoint}/job/apply`,res)
  } catch (err) {
    console.log(err);
  toast.error(err.response.data)
  }
}

const applyjobresponse =async (_id)=>{
  try {
    return await axios.get(`${startpoint}/job/apply/${_id}`)
  } catch (err) {
    console.log(err);
  toast.error(err.response.data)
  }
}


const deleteAccount =async (target,_id)=>{
  const endpoint = target==="employee" ? "employee" : "employer"
  try {
   const res = await axios.delete(`${startpoint}/${endpoint}/delete/${_id}`)
    localStorage.removeItem("token")
    toast.success("Account deleted!")
    return res 
   } catch (err) {
    toast.error(err.response.data)
   }
}
const validateProfile =(employee)=>{
  const Schema = Joi.object({
          name:Joi.string().required(),
         DOB:Joi.date().required(),
         experience:Joi.string().required(),
         profession:Joi.string().required(),
         address:Joi.string().required(),
         skills:Joi.string().required(),
         about:Joi.string().required().max(80),
         gender:Joi.string().required(),
         status:Joi.string().required(),
         education:Joi.string().required(),
         hobbies:Joi.string().required(),
         contact:Joi.string().max(10).min(10).required()
 
  })
  return Schema.validate(employee)
 }

 const validateEmployer =(employer)=>{
  const Schema = Joi.object({
    name:Joi.string().required(),
   company_name:Joi.string().required(),
   location:Joi.string().required(),
   employee_no:Joi.number().required(),
   since:Joi.date().required(),
   about:Joi.string().max(80).required(),
   contact:Joi.string().min(10).max(10).required(),
})
return Schema.validate(employer)
 }


export {authUser,createEmployeeProfile,
  validateProfile,
  createEmployerProfile,
  validateEmployer,
  createJob,
  deleteAccount,
  allPostJobs,
  viewJob,
  viewOffice,
  pendingJob,
  userProfile,
  jobResponse,
  userJobs,applyJob,applyjobresponse
}