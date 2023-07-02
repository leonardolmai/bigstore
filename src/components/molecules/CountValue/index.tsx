import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Product } from '@/types/product';

interface DetailSaleProps {
  product: Product;
}

export default function Counter({ product }: DetailSaleProps) {
  let count = product.quantity > 0 ? 1 : 0;
  const button_active = product.quantity === 0;

  const increment = () => {
    if (count < product.quantity) {
      count += 1;
    }
  };

  const decrement = () => {
    if (count > 0) {
      count -= 1;
    }
  };

  return (
    <div className='flex flex-row justify-start items-center'>
      <button className="m-1 text-center" onClick={decrement} disabled={button_active}>
        <MinusCircle width={24} className={`${product.quantity > 0 ? 'hover:fill-[#FEBD2F] active:stroke-[#FEBD2F]' : ''}`} />
      </button>
      <input className="w-12 text-center rounded-2xl pl-2" type="number" value={count} readOnly />
      <button className="m-1 text-center" onClick={increment} disabled={button_active}>
        <PlusCircle className={`${product.quantity > 0 ? 'hover:fill-[#FEBD2F] active:stroke-[#FEBD2F]' : ''}`} />
      </button>
    </div>
  );
}
