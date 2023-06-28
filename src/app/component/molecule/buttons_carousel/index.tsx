import { B_carousel } from "../../atomic/buttons"
import { useState } from "react";

const [currentIndex,SetCurentIndex] = useState(0);

const prevSlide = () => {
    const isFirstSlide = currentIndex ===0;
    const newIndex = isFirstSlide? slides.length -1 : currentIndex -1;
    SetCurentIndex(newIndex);
}
const nextSlide = () => {};


export default function buttons_carousel(){

    return(
      <>
            <B_carousel direction='left' onclick={prevSlide}/>
            <B_carousel direction='right'/>
      </>
    )
}