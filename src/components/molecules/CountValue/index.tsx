'use client';
import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < 30) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className='flex flex-row justify-start items-center'>
      <button className="m-1 text-center" onClick={decrement}>
        <MinusCircle width={24} className='hover:fill-[#FEBD2F] active:stroke-[#FEBD2F]' />
      </button>
      <input className="w-12 text-center rounded-2xl pl-2" type="number" value={count} readOnly />
      <button className="m-1 text-center" onClick={increment}>
        <PlusCircle className='hover:fill-[#FEBD2F] active:stroke-[#FEBD2F]' />
      </button>
    </div>
  );
};

export default Counter;
