'use client'
import React, { useState, useEffect } from 'react';
import Home from '@/components/organisms/company/home';
import { useMediaQuery } from 'react-responsive';

import {
  UserPlus as MoreCompany,
  UserCog2 as ConfCompany,
  Package2 as Package,
  Receipt,
} from 'lucide-react';

export default function Company() {
  const [activeItem, setActiveItem] = useState(0);
  const [alingLists, setAlingLists] = useState('');

  const isLargeScreen = useMediaQuery({ minWidth: 1100 }, undefined, (matches) => matches);
  const isMediumScreen = useMediaQuery({ minWidth: 831 }, undefined, (matches) => matches);
  const isSmallScreen = useMediaQuery({ minWidth: 666 }, undefined, (matches) => matches);
  const isNanoScreen = useMediaQuery({ minWidth: 356 }, undefined, (matches) => matches);
  const isSmallNanoScreen = useMediaQuery({ minWidth: 280 }, undefined, (matches) => matches);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isLargeScreen) {
        setAlingLists(activeItem === 1 ? 'flex flex-col' : 'grid grid-cols-4 gap-5 m-2');
      } else if (isMediumScreen) {
        setAlingLists(activeItem === 1 ? 'flex flex-col' : 'grid grid-cols-3 gap-5 m-2');
      } else if (isSmallScreen) {
        setAlingLists(activeItem === 1 ? 'flex flex-col' : 'grid grid-cols-2 gap-5 m-2');
      } else {
        setAlingLists(activeItem === 1 ? 'flex flex-col' : 'flex flex-col justify-center gap-3 items-center');
      }
    }

  }, [activeItem, isLargeScreen, isMediumScreen, isSmallScreen, isNanoScreen, isSmallNanoScreen]);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const isItemActive = (index) => {
    return index === activeItem ? 'text-[#FA4907] border-[#FA4907] ' : 'text-black border-black hover:text-[#3676ff] pt-22  hover:border-[#3676ff] ';
  };

  return (
    <div className="flex flex-1 justify-center mt-24 mb-20">
      <div className="flex flex-col w-[1244px] min-h-[683px] max-w-max h-full rounded-3xl bg-[#febc2f36]">
        <nav>
          <div className="flex flex-row font-sans justify-between pl-3 pr-3 p-2 m-1 text-lg font-bold">
            <div className={`${isItemActive(0)}`} onClick={() => handleItemClick(0)}>
              <div className="flex flex-row gap-2 cursor-pointer">
                <MoreCompany size={24} />
                {isSmallScreen && <p> News Company</p>}
              </div>
              {isSmallScreen && <hr className={`mt-2 mb-2 border-2 pt-24${isItemActive(0)}`} />}
            </div>
            <div className={`${isItemActive(1)} p-22`} onClick={() => handleItemClick(1)}>
              <div className="flex flex-row gap-2 cursor-pointer">
                <ConfCompany size={24} />
                {isSmallScreen && <p> Empresas</p>}
              </div>
              {isSmallScreen && <hr className={`mt-2 mb-2 border-2 ${isItemActive(1)}`} />}
            </div>
            <div className={`${isItemActive(2)}`} onClick={() => handleItemClick(2)}>
              <div className="flex flex-row gap-2 cursor-pointer">
                <Package size={24} />
                {isSmallScreen && <p> Novos Pedidos</p>}
              </div>
              {isSmallScreen && <hr className={`mt-2 mb-2 border-2 ${isItemActive(2)}`} />}
            </div>
            <div className={`${isItemActive(3)}`} onClick={() => handleItemClick(3)}>
              <div className="flex flex-row gap-2 cursor-pointer">
                <Receipt size={24} />
                {isSmallScreen && <p> Reembolso</p>}
              </div>
              {isSmallScreen && <hr className={`mt-2 mb-2 border-2 ${isItemActive(3)}`} />}
            </div>
          </div>
        </nav>
        {typeof window !== 'undefined' && (
          <div>
            <Home activeItem={activeItem} screens={{ isLargeScreen, isMediumScreen, isSmallScreen, isNanoScreen, isSmallNanoScreen }} alingLists={alingLists} />
          </div>
        )}
      </div>
    </div>
  );
}
