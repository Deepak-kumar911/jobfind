import { useEffect } from 'react'
import { authProvider } from '../App'
import { useContext } from 'react';
import { deleteAccount } from '../services/auth';
import {  useParams } from 'react-router-dom';


export const DeleteAccount = () => {
    const param = useParams()
    console.log(param);
    const userDetails = useContext(authProvider);

    useEffect(()=>{
async  function fetch() {
     const res = await deleteAccount(param,userDetails._id);
     if(res){
        window.location ="/login"
     }
    }fetch()
    },[param,userDetails])
}
