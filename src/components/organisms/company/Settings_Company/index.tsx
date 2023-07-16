'use client'
import { useState, useEffect } from "react";

export default function Settings_Company({ screens }) {
  const [widthform, setAlingForm] = useState('')
  const [formcase, setFormCase] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingForm('w-[1145px]');

      } else if (screens.isMediumScreen) {
        setAlingForm('w-[880px]');


      } else if (screens.isSmallScreen) {
        setAlingForm('w-[666px]');

      } else if (screens.isNanoScreen) {
        setAlingForm('w-[380px]');

      } else if (screens.isSmallNanoScreen) {
        setAlingForm('w-[280px]');

      } else {
        setAlingForm('w-[183px]');

      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ]);
  const handleAlterform = () => {
    if (typeof window !== "undefined") {
      if (formcase === false) {
        setFormCase(true)
      } else {
        setFormCase(false)
      }

    }
  }
  return (
    <div className={`${widthform}`}>
      <div className="flex flex-col items-center">

        {formcase ?
          <>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Company Name</label>
              <input type="text" value={'textinfo'} className="w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] border-solid active:outline-[#ffae00] focus:outline-[#FEBD2F]  mb-4" ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">CNPJ</label>
              <input type="text" value={'XXXXXXXXXXXXXX'} className="w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] border-solid  active:outline-[#ffae00]  focus:outline-[#FEBD2F]   mb-4" ></input>
            </div>
            <div className="flex flex-row flex-wrap gap-6">
              <button className="flex items-center w-fit max-w-[300px] bg-[#8888] text-black active:bg-black active:text-[#8888] pl-2 pr-2 rounded-xl " onClick={handleAlterform}>Back</button>
              <button className="flex items-center w-fit max-w-[300px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl " onClick={handleAlterform}>Edit Company</button>

            </div>

          </>
          :
          <>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Company Name</label>
              <input type="text" value={'textinfo'} className="w-fit max-w-[700px] rounded-lg bg-[#888888] border-solid border-2  hover:border-black cursor-no-drop mb-4" disabled></input>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">CNPJ</label>
              <input type="text" value={'XXXXXXXXXXXXXX'} className="w-fit max-w-[700px] rounded-lg bg-[#888888] border-solid border-2  hover:border-black cursor-no-drop mb-4" disabled></input>
            </div>
            <button className="flex items-center w-fit max-w-[300px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl " onClick={handleAlterform}>Edit Company</button>

          </>}
      </div>
    </div>
  )
}
