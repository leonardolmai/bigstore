import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';

export function Counter({ maxLimit }: { maxLimit: number }) {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < maxLimit) {
      setCount(count + 1);
      console.log('Count:', count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className='flex flex-row justify-start items-center'>
      <button className="m-1 text-center" onClick={decrement} disabled={count === 1}>
        <MinusCircle width={24} className={`${count > 0 ? 'hover:fill-[#FEBD2F] active:stroke-[#FEBD2F]' : ''}`} />
      </button>
      <input className="w-12 text-center rounded-2xl pl-2" type="number" value={count} readOnly />
      <button className="m-1 text-center" onClick={increment} disabled={count === maxLimit}>
        <PlusCircle width={24} className={`${count > 0 ? 'hover:fill-[#FEBD2F] active:stroke-[#FEBD2F]' : ''}`} />
      </button>
    </div>
  );
}