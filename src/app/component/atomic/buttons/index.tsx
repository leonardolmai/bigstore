import React,{Fragment} from 'react';
import { BsChevronCompactRight as Right,
         BsChevronCompactLeft as Left,
         BsFillCartFill as Cart,
         BsFillCreditCard2BackFill as CreditCard,
         BsFillPinMapFill as Address} from 'react-icons/bs'

interface B_carouselProps {
    direction: "right" | "left"
}



export function B_carousel({direction}: B_carouselProps){
    return(
        <div className={`absolute top-[50%] -translate-x-0 translate-y-y[-50%] ${direction === "right" ? 'right-5' : 'left-5'} ${direction === "right"? 'rounded-e-lg' : 'rounded-s-lg'} text-2xl ounded-full p-2 bg-black/50 text-white cursor-pointer hover:bg-black/100 active:bg-white/20`} >
            {
                direction === 'right' ? 
                <Right  size={30}/> : 
                <Left size={30} />
            }
        </div>
    )
}


interface B_forms {
  name: "Freet" | "Buy_now" | "Cart" | "Alter_Address";
  size: "small" | "medium" | "large";
}

export function B_forms({ name, size }: B_forms) {
  let buttonWidthClass = '';

  if (size === "small") {
    buttonWidthClass = 'w-[10rem]';
  } else if (size === "medium") {
    buttonWidthClass = 'w-[15rem]';
  } else if (size === "large") {
    buttonWidthClass = 'w-[20rem]';
  }
  let text_info: React.ReactNode = '';
  if (name == 'Freet'){
    text_info = 
    <React.Fragment>
      <p>Calculate</p>
      </React.Fragment>;
  } else if (name == 'Buy_now'){
    <React.Fragment>
      <CreditCard size ={15}/>
      <p className='px1'>Buy Now</p>
    </React.Fragment>
  }else if (name == 'Cart'){
    <React.Fragment>
      <Cart size={15}/>
      <p className='px-1'>Add to Cart</p>
    </React.Fragment>
  }else if (name == "Alter_Address"){
    <React.Fragment>
      <Address size={15}/>
      <p className='px1'>Alter Address</p>
        constructor(parameters) {
          
        }
      }
    </React.Fragment>
  }

  const renderHTML = () => {
    return { __html: text_info };
  }

  return (
    <button
      type="submit"
      className={` ${buttonWidthClass} px-2 py-2 font-bold bg-[#FEBD2F] text-black rounded-md shadow-md hover:bg-[#FFBD1F]`}>
      <div className='flex flex-row items-center justify-center'>{text_info}
      </div>
    </button>
  );
}