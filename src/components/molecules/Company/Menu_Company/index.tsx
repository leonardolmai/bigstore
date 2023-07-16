'use client'
import { useState, useEffect } from 'react'
import { BadgeX as Badge } from 'lucide-react'


export default function Menu_company({ screens, items, alingLists }) {
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

  return (
    <div className={`${alingLists} select-none `}>


      <div className={`flex flex-row  m-2 p-2   bg-[#ffffff] justify-between items-start rounded-t-xl`}>
        <div className={`flex justify-center   ${widthlist}  border-e-2 `}><p>Name</p></div>
        <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>CNPJ</p></div>
        <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>Website</p></div>
        <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>User</p></div>
        <div className={`flex justify-center ${widthlist}  cursor-default `}><p>Revoque</p></div>
      </div>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index}>

          <div className={`flex flex-row m-2 p-2 ${index % 2 == 0 ? ("bg-[#F5F6F7]") : "bg-[#b8b8b8]"} justify-between items-start rounded-md  shadow-lg shadow-orange-200 hover:shadow-3xl hover:shadow-orange-500  transition-all`}>
            <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>{index}</p></div>
            <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>XXXXXXXXXXXXXX</p></div>
            <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>www.test.com</p></div>
            <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>J. Kleber Demi</p></div>
            <div className={`flex justify-center ${widthlist}    cursor-pointer `}><p><Badge color={'red'} /></p></div>
          </div>
        </div>
      ))}

    </div>
  )

}

