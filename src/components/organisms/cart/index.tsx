import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Counter } from '@/components/molecules/CountValue';

export function getLocalStorage() {
  const localStorageItems = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!isNaN(Number(key))) {
      const value = localStorage.getItem(key);
      localStorageItems.push({ key, value });
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
        const value = JSON.parse(item.value);
        value.QuantitySelect = count;
        item.value = JSON.stringify(value);
      }
      return item;
    });

    setLocalStorageItems(updatedItems);
    localStorage.setItem(itemKey, JSON.stringify(updatedItems.find((item) => item.key === itemKey)));
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
            const value = JSON.parse(item.value);
            const product = value.product || {}; // Adicione essa linha para garantir que product esteja definido

            const firstImage = product.images && product.images.length > 0 ? product.images[0].image : null;

            return (
              <div className='flex flex-row mb-6 p-3 bg-[#D9D9D9] w-full h-32 rounded-xl text-start' key={index}>
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
