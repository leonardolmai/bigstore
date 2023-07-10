'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Counter } from '@/components/molecules/CountValue';
import { Trash2 as Trash } from 'lucide-react';
import InputField from '@/components/atoms/inputs'
import { B_forms } from '@/components/atoms/buttons';
import { Addresses } from '@/components/molecules/addresses';
import { Payment } from '@/components/molecules/payment';
import Cookies from 'js-cookie';
import { access } from 'fs';
import Freight_router from '@/components/molecules/freight_router';

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
  const [accessToken, setAccessToken] = useState('');
  const [localStorageItems, setLocalStorageItems] = useState<any[]>([]);
  const [QuantitySelect, setQuantitySelect] = useState(1);
  const [cupom, setCupom] = useState('');
  const [cupomactivate, setCupomActivate] = useState(false);
  let valued = '10%';

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [finalValue, setFinalValue] = useState(0);

  //payments
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const [selectedCardId, setSelectedCardId] = useState('');

  //payments purchase
  const handlePaymentOptionChange = (option, cardId) => {
    setSelectedPaymentOption(option);
    setSelectedCardId(cardId);
  };

  //Address
  const [selectedAddressCep, setSelectedAddressCep] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState('');

  //Address purchase
  const handleAddresssesOptionChange = (postal_code, addressId) => {
    setSelectedAddressCep(postal_code);
    setSelectedAddressId(addressId);
  };

  //value freight
  const handleFinalFreightValue = (value: number | null) => {
    if (value !== null) {
      const endValue = value + totalValue;
      setFinalValue(endValue);
      console.log(finalValue);
    }
  };


  const handlePostOrder = () => {
    const token = Cookies.get('accessToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const selectedProducts = {};

    localStorageItems.forEach((item) => {
      if (selectedItems.includes(item.key)) {
        selectedProducts[item.key] = item.value.QuantitySelect;
        localStorage.removeItem(item.key);
      }
    });

    const orderData = {
      payment_method: selectedPaymentOption,
      card_id: selectedPaymentOption === 'card' ? selectedCardId : null,
      address_id: selectedAddressId,
      products: selectedProducts,
    };

    fetch('http://127.0.0.1:8000/api/orders/', {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Processar a resposta do servidor, se necessário
        console.log(data);
      })
      .catch((error) => {
        // Tratar erros da chamada POST
        console.error(error);
      });
  };

  useEffect(() => {
    Cookies.set('accessToken', '3a8e363d71ca88ed56a45d931057756f1249381b', { expires: 7 });
  }, []);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    setAccessToken(token || '');
  }, []);

  useEffect(() => {
    const items = getLocalStorage();
    setLocalStorageItems(items);
  }, []);

  useEffect(() => {
    let count = 0;
    let total = 0;

    localStorageItems.forEach((item) => {
      const value = item.value;
      const product = value.product || {};

      if (selectedItems.includes(item.key)) {
        count += value.QuantitySelect;
        total += value.QuantitySelect * product.price;
      }
    });

    setSelectedItemsCount(count);

    if (cupomactivate) {
      total = total - (total * 0.1);
    }

    setTotalValue(total);
  }, [localStorageItems, selectedItems, cupomactivate]);

  const handleCheckboxChange = (itemKey: string) => {
    const item = localStorageItems.find((item) => item.key === itemKey);
    if (!item) return;

    const updatedItems = selectedItems.includes(itemKey)
      ? selectedItems.filter((key) => key !== itemKey)
      : [...selectedItems, itemKey];

    setSelectedItems(updatedItems);
  };

  const handleDeleteItem = (itemKey: string) => {
    localStorage.removeItem(itemKey);
    const updatedItems = localStorageItems.filter((item) => item.key !== itemKey);
    setLocalStorageItems(updatedItems);
  };

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

  const handleActivateCupom = () => {
    setCupomActivate(true);
  };
  return (
    <div className="flex flex-row">
      <div className='w-11/12 ml-4 mr-4 w-full h-full item-center'>
        <article className='flex flex-row justify-start mt-12'>
          <div className='mb-3 p-3 bg-[#D9D9D9] w-42 rounded-xl text-start'>
            <h1>My Cart</h1>
          </div>
        </article>
        <article className='flex flex-col justify-start mt-2'>
          {localStorageItems.map((item, index) => {
            const value = item.value;
            const product = value.product || {};

            const firstImage = product.images && product.images.length > 0 ? product.images[0].image : null;

            const isChecked = JSON.parse(localStorage.getItem('orders') || '[]').includes(item.key);

            return (
              <div className='flex flex-row  flex-wrap justify-center place-items-center mb-6 p-3 bg-[#D9D9D9] w-full min-w- h-full min-h-full rounded-xl' key={index}>
                {firstImage && (
                  <>
                    <div>
                      <a href={`products/${item.key}`} className='item'>
                        <Image src={firstImage} width={96} height={96} className='rounded-xl' />
                      </a>
                    </div>

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
                      <div>
                        <br />
                        <input
                          className='focus:bg-[#FEBD2F] rounded-xl w-4 h-4'
                          type="checkbox"
                          defaultChecked={isChecked}
                          onChange={() => handleCheckboxChange(item.key)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row-reverse w-full">
                      <Trash color={'red'} size={24} className='cursor-pointer active:stroke-red-950 place-self-center' onClick={() => handleDeleteItem(item.key)} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </article>
      </div>
      <div className='w-auto ml-4 mt-10 mr-4 mb-60 p-3 h-auto item-center bg-[#F1F1F4] rounded-xl'>
        <article className='flex flex-row justify-center mt-4 ml-4 mr-4'>
          <div className='mb-auto p-3 bg-[#D9D9D9] w-max rounded-xl text-center'>
            <h1>Complete purchase</h1>
          </div>
        </article>
        <div>
          <InputField
            label="Cupom:"
            name="input"
            id="input-field"
            style="input-text-sales"
            size="medium"
            value={cupom}
            onChange={(event) => setCupom(event.target.value)}
          />

          {cupom === valued ? (
            <p className="text-green-500 font-bold">
              Cupom 10% desconto:{" "}
              <span
                className="text-black active:bg-green-200 rounded-xl bg-green-500 hover:bg-green-700 cursor-pointer rounder-xl p-1 pointer"
                onClick={() => setCupomActivate(true)}
              >
                Click-me
              </span>
            </p>
          ) : cupom === "" ? null : (
            <p className="text-red-500" onClick={() => setCupomActivate(false)}>
              Não tem Cupom
            </p>
          )}
          <div className='mb-6 font-bold'>
            <p className='mb-6'>Products Value: {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <Freight_router quantity={selectedItemsCount} cep={selectedAddressCep} onFinalFreightValue={handleFinalFreightValue} />
            <p className='mb-6'>Quantity Product Selected: {selectedItemsCount}</p>
            {finalValue !== 0 ? (
              <p className='mb-6 font-extrabold'>Final Value: {finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            ) : null}
          </div>
          <div className='mb-auto font-bold  w-60 rounded-xl text-start mt-6 mb-6'>
            {accessToken ? (
              <Addresses onAddressChange={handleAddresssesOptionChange} />
            ) : (
              <Link href={"account/login"} className='mb-6 p-3 bg-[#FF9730] w-min-full rounded-xl text-start mt-6 mb-6'>Adicionar Endereço</Link>
            )}
            {accessToken ? (
              <Payment onPaymentOptionChange={handlePaymentOptionChange} />
            ) : (
              <Link href={"account/login"} className='mb-6 p-3 bg-[#FF9730] w-min-full rounded-xl text-start mt-6 mb-6'>Payment Method</Link>
            )}

            {/* <select className='mb-6 p-3 bg-[#FF9730] w-min-full rounded-xl text-start' name="cars" id="cars">
              <option value="volvo">Address-1</option>
              <option value="volvo">59900000</option>
            </select> */}
          </div>
          {(!selectedAddressCep || !selectedPaymentOption || (selectedPaymentOption === 'card' && !selectedCardId) || selectedItemsCount === 0) ? (
            <button className="mb-6 p-3 cursor-default bg-[#FF9730] w-min-full rounded-xl text-start">
              Botão B
            </button>
          ) : (
            <button className="mb-6 p-3 bg-[#FF9730] w-min-full rounded-xl text-start" onClick={handlePostOrder}>
              Botão A
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



