'use client'
import { useState, useEffect } from 'react'
import {
  BadgeDollarSign as Badge,
  PlusCircle
} from 'lucide-react'
import Product_forms from './Product_forms';
export default function Product({ screens, items }) {
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
      {boolforms ? <><Product_forms screens={screens} boolforms={boolforms} setBoolForms={setBoolForms} /> </> : <>

        <div className={`flex flex-row  m-2 p-2   bg-[#ffffff] justify-between items-start rounded-t-xl`}>
          <div className={`flex justify-center   ${widthlist}  border-e-2 `}><p>Id</p></div>
          <div className={`flex justify-center   ${widthlist}  border-e-2 `}><p>Product name</p></div>
          <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>Quantity</p></div>
          <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>CNPJ</p></div>
          <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>State</p></div>
          <div className={`flex justify-center ${widthlist}  cursor-default `}><p>Repayment</p></div>
        </div>
        {Array.from({ length: items }).map((_, index) => (
          <div key={index}>

            <div className={`flex flex-row m-2 p-2 ${index % 2 == 0 ? ("bg-[#F5F6F7]") : "bg-[#b8b8b8]"} justify-between items-start rounded-md  shadow-lg shadow-orange-200 hover:shadow-3xl hover:shadow-orange-500  transition-all`}>
              <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>{index}</p></div>
              <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>Name...</p></div>
              <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>X</p></div>
              <div className={`flex justify-center ${widthlist}  border-e-2 `}><p>xxxxxxxxxxxxxx</p></div>
              <div className={`flex justify-center ${widthlist}  border-e-2 `}><p className="font-bold">Send</p></div>
              <div className={`flex justify-center ${widthlist}    cursor-pointer `}>

                <div className='flex flex-col justify-center items-center '>
                  <Badge onClick={handleformClick} size={24} className='w-max   h-8  bg-[#FEBD2F] hover:stroke-amber-950 cursor-pointer rounded-3xl shadow-md shadow-black hover:shadow-amber-400 active:bg-[#f7aa02] active:bg-[#9e7620]' />
                </div>

              </div>
            </div>
          </div>
        ))}

      </>}
    </div >
  )


}


