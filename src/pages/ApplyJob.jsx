import React, { useEffect, useState } from 'react';
import { applyjobresponse } from '../services/auth';
import { authProvider } from '../App';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

export const ApplyJob = () => {
    const userDetails = useContext(authProvider)
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetch() {
            const { data: serverData } = await applyjobresponse(userDetails._id)
            setData(serverData)
        } fetch()
    }, [userDetails])
    console.log(data);
    return (
        <div className='container mt-4'>
            <h3 className='text-center text-red-600'>All Applied Job</h3>
            <div className='grid grid-cols-12 gap-2'>
                {data.map(detail =><NavLink to={`/view job/apply/${detail._id}/${detail.employer_id}`} key={detail._id} className='col-span-6 md:col-span-4 lg:col-span-3 border-2 no-underline text-slate-600 hover:bg-indigo-600 hover:text-white border-indigo-600 rounded-md p-2 cursor-pointer'>
                    <h5 className='capitalize'>{detail.job}</h5>
                    <div className='leading-3'>
                        <p>Experience:{detail.experience}</p>
                        <p className='capitalize'>Status: <span className='bg-blue-200 px-2 rounded-md text-indigo-600'>{detail.status.map(elm=>elm.employee_id===userDetails._id ? elm.remark: "")}</span></p>
                    </div>
                </NavLink>
                )}
            </div>
        </div>
    )
}
