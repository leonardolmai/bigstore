import React, { Fragment, createContext, useContext, useState } from 'react';
import {
  ChevronLeft as Left,
  ChevronRight as Right,
  ShoppingCart as Cart,
  CreditCard as CreditCard,
  MapPin as Address,
} from 'lucide-react';

interface B_carouselProps {
  direction: 'right' | 'left';
}

export function B_carousel({ direction }: B_carouselProps) {
  return (
    <div
      className={`absolute top-[50%] -translate-x-0 translate-y-y[-50%] ${
        direction === 'right' ? 'right-5' : 'left-5'
      } ${direction === 'right' ? 'rounded-e-lg' : 'rounded-s-lg'} text-2xl ounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-black/100 active:bg-white/20`}
    >
      {direction === 'right' ? <Right size={30} /> : <Left size={30} />}
    </div>
  );
}

interface B_form {
  name: string;
  size: 's-small' | 'small' | 'medium' | 'large';
  onclick: string;
  type: 'freight' | 'Buy_now' | 'Cart' | 'Alter_Address';
}

export function B_forms({ name, size, onclick, type }: B_form) {
  let buttonWidthClass = '';
  if (size === 's-small') {
    buttonWidthClass = 'w-40';
  } else if (size === 'small') {
    buttonWidthClass = 'w-40';
  } else if (size === 'medium') {
    buttonWidthClass = 'w-60';
  } else if (size === 'large') {
    buttonWidthClass = 'w-80';
  }
  let text_info: React.ReactNode = '';
  if (type === 'freight') {
    text_info = <React.Fragment><p>Calculate</p></React.Fragment>;
  } else if (type === 'Buy_now') {
    text_info = (
      <React.Fragment>
        <CreditCard color="black" size={15} />
        <p className='px-1'>{name}</p>
      </React.Fragment>
    );
  } else if (type === 'Cart') {
    text_info = (
      <React.Fragment>
        <Cart color="black" size={15} />
        <p className='px-1'>{name}</p>
      </React.Fragment>
    );
  } else if (type === 'Alter_Address') {
    text_info = (
      <React.Fragment>
        <Address />
        <p className='px-1'>{name}</p>
      </React.Fragment>
    );
  }

  return (
    <button
      onClick={onclick}
      type="submit"
      className={` ${buttonWidthClass} px-2 py-2 font-bold bg-[#FEBD2F] active:bg-[#604201] text-black rounded-md shadow-md hover:bg-[#FFBD1F]`}
    >
      <div className='flex flex-row items-center justify-center'>{text_info}</div>
    </button>
  );
}