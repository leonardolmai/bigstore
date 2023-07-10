'use client'
import React, { useEffect, useState } from 'react';
import Menu_componente from '@/components/molecules/Company/Menu_componente/';
import Menu_company from '@/components/molecules/Company/Menu_Company';
import Menu_Products from "@/components/molecules/Company/Menu_Products";
import Menu_repayment from "@/components/molecules/Company/Menu_repayment";
export default function Home({ activeItem, screens, alingLists }) {
  const { isLargeScreen, isMediumScreen, isSmallScreen, isNanoScreen, isSmallNanoScreen } = screens;

  const handleItemClick = (index) => {
    if (typeof window !== 'undefined') {
      setActiveItem(index);
    }
  };

  return (
    <div>
      {activeItem === 0 && <Menu_componente screens={screens} items={20} alingLists={alingLists} />}
      {activeItem === 1 && <Menu_company screens={screens} items={20} alingLists={alingLists} />}
      {activeItem === 2 && <Menu_Products screens={screens} items={20} alingLists={alingLists} />}
      {activeItem === 3 && <Menu_repayment screens={screens} items={20} alingLists={alingLists} />}
    </div>
  );
}
