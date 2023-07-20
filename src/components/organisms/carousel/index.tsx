'use client';
import React, { useState } from 'react';
import { B_carousel } from '@/components/atoms/buttons';
import { ProductProps } from '@/types/product';


const Carousel = ({ product }: ProductProps) => {
  const [currentIndex, SetCurentIndex] = useState(0);
  const slides = product?.images?.map((image) => ({ url: image.image })) || [];

  const handleNextSlide = () => {
    SetCurentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevSlide = () => {
    SetCurentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  return (
    <div style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }} className="w-full h-full rounded-2xl bg-center bg-cover duration-500">
      <button onClick={handlePrevSlide}><B_carousel direction="left" /></button>
      <button onClick={handleNextSlide}><B_carousel direction="right" /></button>
    </div>
  );
};



export default function CarouselComponent({ product }: ProductProps): React.JSX.Element {
  return (
    <div className="max-w-[1400px] h-full flex flex-row justify-center max-md:h-60 max-md:w-60 shadow-xl  rounded-xl w-full m-auto py-4 px-4  relative">
      <Carousel product={product} />
    </div>
  );
}
