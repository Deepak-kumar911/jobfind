import React from 'react';
import {BsCashCoin} from 'react-icons/bs'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {BsClipboardCheck} from 'react-icons/bs'
import {GiCubes} from 'react-icons/gi'

export const Card = ({detail}) => {
  return (
    <>
    <div className=''>
        <div className='flex items-center gap-x-2 my-auto'>
        <AiOutlineCheckCircle className='text-primary text-lg'/>
        <h5 className='capitalize'>{detail.job}</h5>
    </div>
    <div className='flex items-center gap-x-2'>
        <GiCubes className='text-danger text-lg'/>
        <p className='flex my-auto capitalize'>{detail.skills}</p>
    </div>
    <div className='flex items-center gap-x-2'>
        <BsCashCoin className='text-success text-lg'/>
        <p className='flex my-auto'>{detail.salary}</p>
    </div>
    <div className='flex items-center  gap-x-2'>
        <BsClipboardCheck className='text-warning text-lg'/>
        <p className='flex my-auto'>{detail.openings}</p>
    </div>
    </div>
    </>
  )
}

      