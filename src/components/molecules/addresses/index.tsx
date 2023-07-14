'use client'
import React, { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import { Address } from '@/types/addresses';

export async function Addresses({ onAddressChange }) {
  const [selectedAddress, setSelectedAddress] = useState('');

  const response = await api.get('/addresses/', {
    headers: { 'Authorization': 'Token 3a8e363d71ca88ed56a45d931057756f1249381b' }
  });

  const addresses: Address[] = response.data




  const handleAddressChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedAddress(selectedValue);

    if (selectedValue === 'new') {
      window.location.href = '/cadastro-endereco';
    } else {
      const selectedAddress = addresses.find((address) => address.id === parseInt(selectedValue));
      onAddressChange(selectedAddress?.postal_code, selectedAddress?.id);
    }
  };

  return (
    <div>
      <select
        className="mb-6 p-3 bg-[#FF9730] w-min-full rounded-xl text-start"
        name="address"
        id="address"
        value={selectedAddress}
        onChange={handleAddressChange}
      >
        <option value="">Select an address</option>
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.postal_code}, {address.street}, {address.number}
            </option>
          ))
        ) : (

          <option value="new" className="cursor-pointer">
            Cadastrar novo endereço
          </option>
        )}
      </select>
    </div>
  );
}
