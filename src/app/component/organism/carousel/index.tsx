
'use client';
import React, { useState } from 'react';
import Buttons_carousel from '../../molecule/buttons_carousel'
import { B_carousel } from "../../atomic/buttons"






const Carousel = () => {
    const [currentIndex,SetCurentIndex] = useState(0);
    const slides = [
        {
           url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
         },
         {
           url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
         },
         {
           url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
         },
     
         {
           url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
         },
         {
           url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
         },
       ];

       const handleNextSlide = () => {
        SetCurentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        };
    
        const handlePrevSlide = () => {
        SetCurentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
        };

    return (
    <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }}  className= "w-full h-full rounded-2xl bg-center bg-cover duration-500">
                <button onClick={handlePrevSlide}><B_carousel direction='left' /></button>
                <button onClick={handleNextSlide}><B_carousel direction='right' /></button>
                
        </div>
      );
    
    
};




export default function carousel(){
    
    return(
        <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 -px-4 relative">
            <Carousel/>
        </div>
    )
}