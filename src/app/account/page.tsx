'use client'
import React, { useState, useEffect } from 'react';
import User from "@/components/organisms/Account/User"
import Product from '@/components/organisms/Account/Product';
import User_Cards from '@/components/organisms/Account/User_Cards';
// import Employer from '@/components/organisms/company/Employer';
// import Settings_Company from "@/components/organisms/company/Settings_Company"
import { useMediaQuery } from 'react-responsive';

import {
  Award,
  User as Usericon,
  CreditCard as Cards,
  UserCog2 as ConfCompany,
  Package2 as Package,
  MapPin as Addresses,
} from 'lucide-react';
import Settings from '@/components/organisms/company/Product';


export default function company() {
  const [activeItem, setActiveItem] = useState(0);
  const [activeNavbar, setActiveNavbar] = useState(0);
  const [alingLists, setAlingLists] = useState('');
  const [alignNavbar, setAlignNavbar] = useState('');
  const [alignFirstNavbar, setalignFirstNavbar] = useState('');
  const [sizeicons, setSizeIcons] = useState(32)

  const isLargeScreen = useMediaQuery({ minWidth: 1100 }, undefined, (matches) => matches);
  const isMediumScreen = useMediaQuery({ minWidth: 831 }, undefined, (matches) => matches);
  const isSmallScreen = useMediaQuery({ minWidth: 666 }, undefined, (matches) => matches);
  const isNanoScreen = useMediaQuery({ minWidth: 356 }, undefined, (matches) => matches);
  const isSmallNanoScreen = useMediaQuery({ minWidth: 280 }, undefined, (matches) => matches);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isLargeScreen) {
        setAlignNavbar('flex flex-col w-32')
        setalignFirstNavbar('flex flex-row')
        setSizeIcons(32)
        setAlingLists(activeItem === 1 ? 'flex flex-col' : 'grid grid-cols-4 gap-5 m-2');
      } else if (isMediumScreen) {
        setAlignNavbar('flex flex-col w-24')
        setalignFirstNavbar('flex flex-row')
        setSizeIcons(28)
        setAlingLists(activeItem === 1 ? 'flex flex-col' : 'grid grid-cols-3 gap-5 m-2');
      } else if (isSmallScreen) {
        setAlignNavbar('flex flex-row pl-12 pr-12 ')
        setalignFirstNavbar('flex flex-col')
        setSizeIcons(24)
        setAlingLists(activeItem === 1 ? 'flex flex-col' : 'grid grid-cols-2 gap-5 m-2');
      } else if (isNanoScreen) {
        setAlignNavbar('flex flex-row pl-6 pr-6')
        setalignFirstNavbar('flex flex-col')
        setSizeIcons(18)
        setAlingLists(activeItem === 1 ? 'flex flex-col' : 'flex flex-col justify-center gap-3 items-center');
      } else if (isSmallNanoScreen) {
        setAlignNavbar('flex flex-row pl-6 pr-6')
        setalignFirstNavbar('flex flex-col')
        setSizeIcons(16)
        setAlingLists(activeItem === 1 ? 'flex flex-col' : 'flex flex-col justify-center gap-3 items-center');
      } else {
        setAlignNavbar(8)
        setAlignNavbar('flex flex-row pl-6 pr-6')
        setAlingLists(activeItem === 1 ? 'flex flex-col' : 'flex flex-col justify-center gap-3 items-center');
      }

    }
  }, [activeItem, isLargeScreen, isMediumScreen, isSmallScreen, isNanoScreen, isSmallNanoScreen]);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const handleNavbarClick = (index) => {
    setActiveNavbar(index);
    setActiveItem(0);
  }
  const isItemActive = (index) => {
    return index === activeItem ? 'text-[#FA4907] border-[#FA4907] ' : 'text-black border-black hover:text-[#3676ff] pt-22  hover:border-[#3676ff] ';
  };

  return (

    <div className={`${alignFirstNavbar}`}>
      <div className={` justify-center items-center border-2 pt-6 pb-6 bg-[#ffffffab]${alignNavbar} `} >
        <div className={` justify-center items-center gap-6 text-center break-words ${alignNavbar} `}>
          <div className={`ustify-center items-center ${(isLargeScreen === true || isMediumScreen === true ? alignNavbar : 'hidden')} `}>
            <Award size={40} className='stroke-[#FA4907] ' />
            <h1 className='break-all font-bold'> Account</h1>
          </div>
          <div className={` justify-center items-center  pt-6 pb-6  text-center break-words ${alignNavbar} `}>
            <Usericon className='hover:cursor-pointer hover:stroke-[#FA4907] ' size={sizeicons} onClick={() => handleNavbarClick(0)} />
          </div>
          <div className={` justify-center items-center  pt-6 pb-6  text-center break-words ${alignNavbar}`}>
            <Package className='hover: cursor-pointer hover:stroke-[#FA4907]' size={sizeicons} onClick={() => handleNavbarClick(1)} />
          </div>
          <div className={` justify-center items-center  pt-6 pb-6  text-center break-words ${alignNavbar}`}>
            <Cards className='hover: cursor-pointer hover:stroke-[#FA4907]' size={sizeicons} onClick={() => handleNavbarClick(2)} />
          </div>
          <div className={` justify-center items-center  pt-6 pb-6  text-center break-words ${alignNavbar}`}>
            <Addresses className='hover: cursor-pointer hover:stroke-[#FA4907]' size={sizeicons} onClick={() => handleNavbarClick(3)} />
          </div>
        </div>

        <div>

        </div>
      </div>
      <div className="flex flex-1 justify-center mt-24 mb-20">
        <div className="flex flex-col w-[1244px] min-h-[683px] max-w-max h-full rounded-3xl bg-[#febc2f36]  shadow">
          {activeNavbar === 0 ? <>
            {/* <nav>
              <div className="flex flex-row font-sans justify-between pl-3 pr-3 p-2 m-1 text-lg font-bold">
                <div className={`${isItemActive(0)}`} onClick={() => handleItemClick(0)}>
                  <div className="flex flex-row gap-2 cursor-pointer">
                    <Usericon size={24} />
                    {isSmallScreen && <p> Account Data</p>}
                  </div>
                  {isSmallScreen && <hr className={`mt-2 mb-2 border-2 pt-24${isItemActive(0)}`} />}
                </div>
                <div className={`${isItemActive(1)} p-22`} onClick={() => handleItemClick(1)}>
                  <div className="flex flex-row gap-2 cursor-pointer">
                    <Cards size={24} />
                    {isSmallScreen && <p> Cards</p>}
                  </div>
                  {isSmallScreen && <hr className={`mt-2 mb-2 border-2 ${isItemActive(1)}`} />}
                </div>
                <div className={`${isItemActive(2)}`} onClick={() => handleItemClick(2)}>
                  <div className="flex flex-row gap-2 cursor-pointer">
                    <Addresses size={24} />
                    {isSmallScreen && <p> Addresses</p>}
                  </div>
                  {isSmallScreen && <hr className={`mt-2 mb-2 border-2 ${isItemActive(2)}`} />}
                </div>
                <div className={`${isItemActive(3)}`} onClick={() => handleItemClick(3)}>
                  <div className="flex flex-row gap-2 cursor-pointer">
                    <Package size={24} />
                    {isSmallScreen && <p> Products</p>}
                  </div>
                  {isSmallScreen && <hr className={`mt-2 mb-2 border-2 ${isItemActive(3)}`} />}
                </div>
              </div>
            </nav> */}
            <User screens={{ isLargeScreen, isMediumScreen, isSmallScreen, isNanoScreen, isSmallNanoScreen }} />
          </> : ''}
          {activeNavbar === 1 ? <>
            <nav>
              <div className="flex flex-row h-fit font-sans justify-center pl-3 pr-3 p-2 m-1 text-lg font-bold">
                <p>My Products</p>
              </div>
            </nav>
            <Product screens={{ isLargeScreen, isMediumScreen, isSmallScreen, isNanoScreen, isSmallNanoScreen }} items={20} />
          </> : ''}
          {activeNavbar === 2 ? <>
            <nav>
              <div className="flex flex-row h-fit font-sans justify-center pl-3 pr-3 p-2 m-1 text-lg font-bold">
                <p>Cards</p>
              </div>
            </nav>
            <User_Cards screens={{ isLargeScreen, isMediumScreen, isSmallScreen, isNanoScreen, isSmallNanoScreen }} />
          </> : ''}
          {activeNavbar === 3 ? <>
            <nav>
              <div className="flex flex-row  font-sans justify-center pl-3 pr-3 p-2 m-1 text-lg font-bold">
                <p>Addresses</p>
              </div>
            </nav>
            {/* <Product screens={{ isLargeScreen, isMediumScreen, isSmallScreen, isNanoScreen, isSmallNanoScreen }} /> */}
          </> : ''}
        </div>
      </div>

    </div >
  );
}

