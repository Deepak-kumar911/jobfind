import React from 'react';
import {IoLocation} from 'react-icons/io5';
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {BsClipboardCheck} from 'react-icons/bs'

export const Card = () => {
  return (
    <>
    <div className='col-span-12 md:col-span-3 border rounded-md p-2'>
        <div className='flex items-center gap-x-2 my-auto'>
        <AiOutlineCheckCircle className='text-primary text-lg'/>
        <h5>web developer</h5>
    </div>
    <div className='flex items-center gap-x-2'>
        <IoLocation className='text-danger text-lg'/>
        <p className='flex my-auto'>Nodia sec 43</p>
    </div>
    <div className='flex items-center  gap-x-2'>
        <BsClipboardCheck className='text-warning text-lg'/>
        <p className='flex my-auto'>10</p>
    </div>
    </div>
    </>
  )
}
