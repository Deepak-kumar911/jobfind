import React, { useState } from 'react';
import { useContext } from 'react';
import { authProvider } from '../App';
import {RxHamburgerMenu} from 'react-icons/rx'
import { NavLink } from 'react-router-dom';
import {TbLogout} from 'react-icons/tb'
export const Navbar = () => {
    const [toggle,setToggle] = useState(false)
    const userDetails = useContext(authProvider)
    return (
        <>
            <div className='flex md:flex-row flex-col justify-between bg-indigo-400  md:h-[3.5rem] text-lg md:items-center px-[1rem]'>
                <div className='fs-4 text-light flex items-center justify-between p-1' >
                    <div>FindJob</div>
                    <div className='block md:hidden border rounded-md px-2 py-2 cursor-pointer' onClick={()=>setToggle(!toggle)}><RxHamburgerMenu/></div>
                </div>
                <div className={`${toggle ? "visible" : "hidden"} md:inline-flex  flex md:flex-row flex-col md:items-center gap-x-2 gap-y-2 text-white`}>
                            <NavLink to="/" className="no-underline text-white" onClick={()=>setToggle(!toggle)}>Home</NavLink>
                            <NavLink to="/" className="no-underline text-white"></NavLink>
                        <div className=" dropdown">
                            <NavLink className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Activity
                            </NavLink>
                            <ul className="dropdown-menu dropdown-menu-dark " onClick={()=>setToggle(!toggle)}>
                               {userDetails && userDetails.employer ? 
                               <><li><NavLink className="dropdown-item " to="/create job">Post New Job</NavLink></li>
                                <li ><NavLink className="dropdown-item" to="/pending request">Pending request</NavLink></li>
                                <li><NavLink className="dropdown-item " to="/view posted jobs">All Jobs</NavLink></li>
                                <li><NavLink className="dropdown-item " to="/delete account/employer">Delete Account</NavLink></li>
                                </> 
                                :<>
                                <li><NavLink className="dropdown-item" to="/view all jobs">View Jobs</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/view apply jobs">Apply jobs Status</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/delete account/employee">Delete Account</NavLink></li>
                                
                                </>
    }
                            </ul>
                        </div>
                          <NavLink to="/logout" className='flex gap-x-1 items-center cursor-pointer no-underline text-white' >Logout<TbLogout className='text-2xl text-red-600'/></NavLink>
                </div>
            </div>
        </>
    )
}
