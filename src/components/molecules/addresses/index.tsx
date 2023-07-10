import React, { useEffect, useState } from 'react';

export function Addresses({ onAddressChange }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    const simulatedData = [
      {
        id: 1,
        user: {
          id: 1,
          name: '',
          email: 'momo@momo.com',
          cpf: '',
          phone: ''
        },
        postal_code: '59900000',
        uf: 'RN',
        city: 'pdf',
        neighborhood: '2023',
        street: '4_de_setembo',
        number: '1500',
        complement: ''
      },
      {
        id: 2,
        user: {
          id: 1,
          name: '',
          email: 'momo@momo.com',
          cpf: '',
          phone: ''
        },
        postal_code: '59900000',
        uf: 'RN',
        city: 'pdf',
        neighborhood: '2023',
        street: '13_De_maio',
        number: '123',
        complement: ''
      }
    ];

    setAddresses(simulatedData);
  }, []);

  const handleAddressChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedAddress(selectedValue);

    if (selectedValue === 'new') {
      window.location.href = '/cadastro-endereco';
    } else {
      const selectedAddress = addresses.find((address) => address.id === parseInt(selectedValue));
      // Chame a função onAddressChange com os valores selecionados
      onAddressChange(selectedAddress && selectedAddress.postal_code, selectedAddress && selectedAddress.id);
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



  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:8000/api/addresses', {
  //         headers: {
  //           'X-Company-CNPJ': '00000000000000',
  //           'Authorization': 'Bearer 3a8e363d71ca88ed56a45d931057756f1249381b'
  //         }
  //       });
  //       const data = await response.json();
  //       setAddresses(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchAddresses();
  // }, []);
