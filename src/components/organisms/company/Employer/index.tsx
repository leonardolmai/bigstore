'use client'
import { useState, useEffect } from 'react'
import {
  BadgeX as Badge,
  PlusCircle
} from 'lucide-react'
import Employer_forms from './Employer_forms';
export default function Employer({ screens, items }) {
  const [boolforms, setBoolForms] = useState(false);
  const [widthlist, setwidthlist] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setwidthlist("w-56");
      } else if (screens.isMediumScreen) {
        setwidthlist("w-44 self-center items-center");
      } else if (screens.isSmallScreen) {
        setwidthlist("w-28  flex flex-col text-xs break-all self-center items-center");
      } else if (screens.isNanoScreen) {
        setwidthlist(" w-[70px] flex flex-col text-xs break-all justif  self-center items-center ");


      } else if (screens.isSmallNanoScreen) {
        setwidthlist(" w-[44px] flex flex-col  text-xs break-all justif  self-center items-center ");


      } else {
        setwidthlist(" w-[33px] flex flex-col  text-xs break-all justif  self-center items-center ");
      }
    }
  }, [screens.isLargeScreen, screens.isMediumScreen, screens.isSmallScreen, screens.isNanoScreen, screens.isSmallNanoScreen]);

  const handleformClick = () => {
    if (typeof window !== 'undefined') {
      setBoolForms(true)
    }

  }


  return (
    <div className={` select-none `}>
      {boolforms ? <><Employer_forms screens={screens} boolforms={boolforms} setBoolForms={setBoolForms} /> </> : <>
        <div className='flex flex-col justify-center items-center '>
          <label className='font-bold'>Added new Employer</label>
          <PlusCircle onClick={handleformClick} size={24} className='w-full max-w-[350px] h-8 pt-1 pb-1  bg-[#FEBD2F] cursor-pointer rounded-lg active:bg-[#8d691a] active:stroke-amber-950' />
        </div>
        <div className={`flex flex-row  m-2 p-2   bg-[#ffffff] justify-between items-start rounded-t-xl`}>
          <div className={`flex justify-center   ${widthlist}  border-e-2 `}><p>Id</p></div>
          <div className={`flex justify-center   ${widthlist}  border-e-2 `}><p>User name</p></div>
          <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>Email</p></div>
          <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>Phone</p></div>
          <div className={`flex justify-center ${widthlist}  cursor-default `}><p>Revoque</p></div>
        </div>
        {Array.from({ length: items }).map((_, index) => (
          <div key={index}>

            <div className={`flex flex-row m-2 p-2 ${index % 2 == 0 ? ("bg-[#F5F6F7]") : "bg-[#b8b8b8]"} justify-between items-start rounded-md  shadow-lg shadow-orange-200 hover:shadow-3xl hover:shadow-orange-500  transition-all`}>
              <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>{index}</p></div>
              <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>Name...</p></div>
              <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>Name@test.com</p></div>
              <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>(84) xxxxx-xxxx</p></div>
              <div className={`flex justify-center ${widthlist}    cursor-pointer `}><p><Badge color={'red'} /></p></div>
            </div>
          </div>
        ))}

      </>}
    </div>
  )


}


