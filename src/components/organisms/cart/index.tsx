'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Counter } from '@/components/molecules/CountValue';
import { Trash2 as Trash } from 'lucide-react';

export function getLocalStorage() {
  const localStorageItems = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!isNaN(Number(key))) {
      const value = localStorage.getItem(key);
      localStorageItems.push({ key, value: JSON.parse(value) });
    }
  }

  return localStorageItems;
}

export function LocalStorageData() {
  const [localStorageItems, setLocalStorageItems] = useState<any[]>([]);
  const [QuantitySelect, setQuantitySelect] = useState(1);

  useEffect(() => {
    const items = getLocalStorage();
    setLocalStorageItems(items);
  }, []);

  const handleCountChange = (count: number, itemKey: string) => {
    setQuantitySelect(count);

    const updatedItems = localStorageItems.map((item) => {
      if (item.key === itemKey) {
        const updatedValue = { ...item.value, QuantitySelect: count };
        return { ...item, value: updatedValue };
      }
      return item;
    });

    setLocalStorageItems(updatedItems);
    localStorage.setItem(
      itemKey,
      JSON.stringify(updatedItems.find((item) => item.key === itemKey).value)
    );
  };

  const handleDeleteItem = (itemKey: string) => {
    localStorage.removeItem(itemKey);
    // Atualize o estado para refletir a exclusão do item
    const updatedItems = localStorageItems.filter((item) => item.key !== itemKey);
    setLocalStorageItems(updatedItems);
  };

  const handleCheckboxChange = (itemKey: string) => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = [...orders];

    const index = updatedOrders.indexOf(itemKey);
    if (index !== -1) {
      updatedOrders.splice(index, 1);
    } else {
      updatedOrders.push(itemKey);
    }

    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div>
      <div className='w-11/12 ml-4 mr-4 w-full h-full item-center'>
        <article className='flex flex-row justify-start mt-4'>
          <div className='mb-6 p-3 bg-[#D9D9D9] w-42 rounded-xl text-start'>
            <h1>Meu Carrinho</h1>
          </div>
        </article>
        <article className='flex flex-col justify-start mt-4'>
          {localStorageItems.map((item, index) => {
            const value = item.value;
            const product = value.product || {};

            const firstImage = product.images && product.images.length > 0 ? product.images[0].image : null;

            const isChecked = JSON.parse(localStorage.getItem('orders') || '[]').includes(item.key);

            return (
              <div className='flex flex-row mb-6 p-3 bg-[#D9D9D9] w-full min-w- h-full min-h-full rounded-xl' key={index}>
                {firstImage && (
                  <>
                    <a href={`products/${item.key}`}>
                      <Image src={firstImage} width={96} height={96} className='rounded-xl' />
                    </a>
                    <div className='flex flex-col ml-6'>
                      <h1>
                        <strong>ID:</strong>
                        {item.key}
                      </h1>
                      <h1>
                        <strong>Name:</strong>
                        {product.name}
                      </h1>
                      <h1>
                        <strong>price: R$</strong>
                        {value.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </h1>
                      <Counter
                        maxLimit={product.quantity}
                        initialQuantity={value.QuantitySelect}
                        onCountChange={(count) => handleCountChange(count, item.key)}
                      />
                    </div>
                    <div className="flex flex-row-reverse w-full">
                      <Trash color={'red'} size={24} className=' cursor-pointer active:stroke-red-950 place-self-center' onClick={() => handleDeleteItem(item.key)} />
                      <input
                        className='focus:bg-[#FEBD2F] rounded-xl'
                        type="checkbox"
                        defaultChecked={isChecked}
                        onChange={() => handleCheckboxChange(item.key)}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </article>
      </div>
    </div>
  );
}
