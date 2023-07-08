import React, { useEffect, useState } from 'react';

export function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/addresses', {
          headers: {
            'X-Company-CNPJ': '00000000000000',
            'Authorization': 'Bearer 3a8e363d71ca88ed56a45d931057756f1249381b'
          }
        });
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedAddress(selectedValue);

    if (selectedValue === 'new') {
      window.location.href = '/cadastro-endereco';
    }
  };

  return (
    <div>
      <h2>Addresses</h2>
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
              {address.name}, {address.street}, {address.city}
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
