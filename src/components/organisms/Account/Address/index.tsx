import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { Addresses } from '@/types/addresses';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { setCookie, getCookie } from 'cookies-next';
import Modal from 'react-modal';

// Função para buscar os cartões da API
async function fetchAddresses() {
  try {
    const response = await api.get('/addresses/', {
      headers: { 'Authorization': `Token ${getCookie('token')}` }
    });
    const fetchedAddresses: Addresses[] = response.data;
    return fetchedAddresses;
  } catch (error) {
    throw new Error('Failed to fetch credit cards');
  }
}

export function User_Addresses({ screens }) {
  const [alingForm, setAlingForm] = useState('');
  const [alignbutton, setalignbutton] = useState('');
  const [aligncard, setaligncard] = useState('');


  const [cards, setCards] = useState([]);
  const { data: addresses = [], isLoading, isError } = useQuery<Addresses[]>('addresses', fetchAddresses);
  const [selectaddress, setselectaddress] = useState(null);
  const [createdform, setcreatedform] = useState(false);
  const [createdform2, setcreatedform2] = useState(false);


  const [updatedpostal_code, setUpdatedpostal_code] = useState('');
  const [updatedUf, setUpdatedUf] = useState('');
  const [updatedCity, setUpdatedCity] = useState('');
  const [updatedNeighborhood, setUpdatedNeighborhood] = useState('');
  const [updatedStreet, setUpdatedStreet] = useState('');
  const [updatedNumber, setUpdatedNumber] = useState('');
  const [updatedComplement, setUpdatedComplement] = useState('');



  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get('/addresses/', {
          headers: {
            'Authorization': `Token ${getCookie('token')}`,
          },
        });
        const fetchedAddresses = response.data;
        setCards(fetchedAddresses); // Atualizar o estado com os dados buscados
      } catch (error) {
        console.error('Erro ao obter a lista de endereços:', error);
      }
    };
    fetchAddresses();
  }, []);


  const handleCreateAddress = async () => {
    try {
      const response = await api.post(
        '/addresses/',
        {
          postal_code: updatedpostal_code,
          uf: updatedUf,
          city: updatedCity,
          neighborhood: updatedNeighborhood,
          street: updatedStreet,
          number: updatedNumber,
          complement: updatedComplement,
        },
        {
          headers: {
            'Authorization': `Token ${getCookie('token')}`,
          },
        }
      );

      console.log('Endereço criado:', response.data);
      setcreatedform(false)
      window.location.href = '/account';
    } catch (error) {
      console.error('Erro ao criar o endereço:', error);
    }
  };

  const handlePatchAddress = async () => {
    try {
      if (!selectaddress) {
        console.error('Nenhum endereço selecionado.');
        return;
      }

      // Montar os dados atualizados do endereço
      const updatedAddressData = {
        postal_code: updatedpostal_code || selectaddress.postal_code,
        uf: updatedUf || selectaddress.uf,
        city: updatedCity || selectaddress.city,
        neighborhood: updatedNeighborhood || selectaddress.neighborhood,
        street: updatedStreet || selectaddress.street,
        number: updatedNumber || selectaddress.number,
        complement: updatedComplement || selectaddress.complement,
      };

      // Fazer a requisição PATCH para atualizar o endereço
      const response = await api.patch(`/addresses/${selectaddress.id}/`, updatedAddressData, {
        headers: {
          'Authorization': `Token ${getCookie('token')}`,
        },
      });
      window.location.href = '/account';
      // Verificar se a requisição foi bem-sucedida e exibir o alerta
      if (response.status === 200) {
        alert('Endereço atualizado com sucesso!');
      }

      // Restaurar os campos do formulário para vazio após a atualização
      setUpdatedpostal_code('');
      setUpdatedUf('');
      setUpdatedCity('');
      setUpdatedNeighborhood('');
      setUpdatedStreet('');
      setUpdatedNumber('');
      setcreatedform2(false)

      // Atualizar o estado do enderesso selecionado com os novos dados
      setselectaddress({ ...selectaddress, ...updatedAddressData });
    } catch (error) {
      console.error('Erro ao atualizar o endereço:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingForm('w-[1145px]');
        setalignbutton('flex-col');
        setaligncard('flex-row')
      } else if (screens.isMediumScreen) {
        setAlingForm('w-[880px]');
        setalignbutton('flex-col');
        setaligncard('flex-row')
      } else if (screens.isSmallScreen) {
        setAlingForm('w-[666px]');
        setalignbutton('flex-row');
        setaligncard('flex-col')
      } else if (screens.isNanoScreen) {
        setAlingForm('w-[380px]');
        setalignbutton('w-[200px] h-[300px]');
        setalignbutton('flex-row');
        setaligncard('flex-col')
      } else if (screens.isSmallNanoScreen) {
        setAlingForm('w-[280px]');
        setalignbutton('w-60');
        setalignbutton('flex-row');
        setaligncard('flex-col')
      } else {
        setAlingForm('w-[183px]');
        setalignbutton('w-60');
        setalignbutton('flex-row');
        setaligncard('flex-col')
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ]);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    setImages(fileList);
  };

  const fetchAddressesDetails = async (addressesId: number) => {
    try {
      const response = await api.get(`/addresses/${addressesId}`, {
        headers: {
          'Authorization': `Token ${getCookie('token')}`,
        },
      });

      const selectedAddressesDetails = response.data;
      setselectaddress(selectedAddressesDetails);
    } catch (error) {
      console.error('Erro ao obter detalhes do cartão:', error);
    }
  };

  const handleCardSelection = (addressesId) => {
    fetchAddressesDetails(addressesId);
  };

  const toform = () => {
    if (createdform === false) {
      setcreatedform(true)
    } else {
      setcreatedform(false)
    }
  }

  const toform2 = () => {
    if (createdform2 === false) {
      setcreatedform2(true)
    } else {
      setcreatedform2(false)
    }
  }

  const toformDelete = async (addressesId: number) => {
    try {
      const response = await api.delete(`/addresses/${addressesId}`, {
        headers: {
          'Authorization': `Token ${getCookie('token')}`,
        },
      });
      window.location.href = '/account';

    } catch (error) {
      console.error('Erro ao obter detalhes do cartão:', error);
    }
  }

  const handleSubmit = async (event) => {
    if (typeof window !== 'undefined') {
    }
  };

  return (
    <div className={`flex flex-col  items-center ${alingForm} h-full`}>
      <div className="flex flex-col  items-start ">
        <div className={` gap-6 flex ${screens.isSmallScreen === true ? "flex-row" : "flex-col"}  justify-center items-center`}>
          {createdform ?
            <form onSubmit={handleCreateAddress} className='flex flex-col gap-6'>
              <div className='flex flex-col'>
                <label>CEP</label>
                <input
                  type='text'
                  className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                  value={updatedpostal_code}
                  onChange={(e) => setUpdatedpostal_code(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label>Estado</label>
                <input
                  type='text'
                  className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                  value={updatedUf}
                  onChange={(e) => setUpdatedUf(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label>Cidade</label>
                <input
                  type='text'
                  className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                  value={updatedCity}
                  onChange={(e) => setUpdatedCity(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label>Bairro</label>
                <input
                  type='text'
                  className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                  value={updatedNeighborhood}
                  onChange={(e) => setUpdatedNeighborhood(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label>Rua</label>
                <input
                  type='text'
                  className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                  value={updatedStreet}
                  onChange={(e) => setUpdatedStreet(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label>Número</label>
                <input
                  type='number'
                  className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                  value={updatedNumber}
                  onChange={(e) => setUpdatedNumber(e.target.value)}
                />
              </div>
              <div className='flex flex-col'>
                <label>Complemento</label>
                <input
                  type='text'
                  className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                  value={updatedComplement}
                  onChange={(e) => setUpdatedComplement(e.target.value)}
                />
              </div>
              <div>
                <button onClick={toform} className='no-select p-1 mt-2 w-full active:bg-white active:text-black text-white rounded-xl shadow-md cursor-pointer bg-[#000000]'>
                  Voltar
                </button>
                <button type="submit" className='no-select p-1 mt-2 w-full active:bg-orange-500 rounded-xl shadow-md cursor-pointer bg-[#FEBF2F]'>
                  Criar Endereço
                </button>
              </div>
            </form>
            : <>{createdform2 ?
              <form onSubmit={handlePatchAddress} className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                  <label>CEP</label>
                  <input
                    type='text'
                    className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                    value={updatedpostal_code || (selectaddress && selectaddress.postal_code) || ''}
                    onChange={(e) => setUpdatedpostal_code(e.target.value)}
                  />
                </div>
                <div className='flex flex-col'>
                  <label>Estado</label>
                  <input
                    type='text'
                    className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                    value={updatedUf || (selectaddress && selectaddress.uf) || ''}
                    onChange={(e) => setUpdatedUf(e.target.value)}
                  />
                </div>
                <div className='flex flex-col'>
                  <label>Cidade</label>
                  <input
                    type='text'
                    className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                    value={updatedCity || (selectaddress && selectaddress.city) || ''}
                    onChange={(e) => setUpdatedCity(e.target.value)}
                  />
                </div>
                <div className='flex flex-col'>
                  <label>Bairro</label>
                  <input
                    type='text'
                    className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                    value={updatedNeighborhood || (selectaddress && selectaddress.neighborhood) || ''}
                    onChange={(e) => setUpdatedNeighborhood(e.target.value)}
                  />
                </div>
                <div className='flex flex-col'>
                  <label>Rua</label>
                  <input
                    type='text'
                    className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                    value={updatedStreet || (selectaddress && selectaddress.street) || ''}
                    onChange={(e) => setUpdatedStreet(e.target.value)}
                  />
                </div>
                <div className='flex flex-col'>
                  <label>Número</label>
                  <input
                    type='number'
                    className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                    value={updatedNumber || (selectaddress && selectaddress.number) || ''}
                    onChange={(e) => setUpdatedNumber(e.target.value)}
                  />
                </div>
                <div className='flex flex-col'>
                  <label>Complemento</label>
                  <input
                    type='text'
                    className='pl-1 min-w-full max-w-[550px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'
                    value={updatedComplement || (selectaddress && selectaddress.complement) || ''}
                    onChange={(e) => setUpdatedComplement(e.target.value)}
                  />
                </div>
                <div>
                  <button onClick={toform2} className='no-select p-1 mt-2 w-full active:bg-white active:text-black text-white rounded-xl shadow-md cursor-pointer bg-[#000000]'>
                    Voltar
                  </button>
                  <button onClick={handlePatchAddress} className='no-select p-1 mt-2 w-full active:bg-orange-500 rounded-xl shadow-md cursor-pointer bg-[#FEBF2F]'>
                    Atualizar Endereço
                  </button>
                </div>
              </form> : <><div className="flex flex-col w-48">
                <article className='flex flex-col items-center gap-6 '>

                  {selectaddress !== null ? (
                    <div className={`flex   ${aligncard} gap-2`}>
                      <div className='bg-gradient-to-r from-[#3d3d3d] to-[#febd2f] text-white w-fit sm:w-max  h-full sm:ml-10  p-2 items-start rounded-md shadow shadow-black'>

                        <div className='flex flex-col sm:flex-row gap-2'>
                          <p className='mt-1 mb-1 no-select flex flex-row'><p className='font-bold '>CEP</p>: {selectaddress.postal_code}</p>
                          <p className='mt-1 mb-1 no-select flex flex-row'><p className='font-bold '>Estado</p>: {selectaddress.uf}</p>
                        </div>
                        <p className='mt-1 mb-1 no-select flex flex-row'><p className='font-bold '>Cidade</p>: {selectaddress.city}</p>
                        <div className='flex flex-col sm:flex-row  gap-2'>
                          <p className='mt-1 mb-1 no-select flex flex-row'><p className='font-bold '>Rua</p>: {selectaddress.street}</p>
                          <p className='mt-1 mb-1 no-select flex flex-row'><p className='font-bold '>Número</p>: {selectaddress.number}</p>
                        </div>
                        <div className='flex flex-col sm:flex-row   gap-2'>
                          <p className='mt-1 mb-1 no-select flex flex-row'><p className='font-bold '>Bairro</p>: {selectaddress.neighborhood}</p>

                          <p className='mt-1 mb-1 no-select flex flex-row'><p className='font-bold '>Complemento</p>: {selectaddress.complement}</p>
                        </div>
                      </div>
                      <div className={`flex ${alignbutton}  gap-3   justify-center ml-2 items-center`}>
                        <button onClick={toform2} className='bg-green-400 shadow rounded-lg p-1 w-16 hover:bg-green-800 active:bg-green-200'>Editar</button>
                        <button onClick={() => toformDelete(selectaddress.id)} className='bg-red-500 shadow  rounded-lg p-1 w-16 hover:bg-red-800 active:bg-red-200'>Deletar</button>
                      </div>
                    </div>
                  ) : (
                    <div className='mb-32'></div>
                  )}
                  <div>
                    <select
                      id="address"
                      name="address"
                      className="no-select rounded-md border m-2 border-gray-300 bg-white sm:px-3 sm:py-2 shadow-sm focus:border-primary-dark focus:outline-none focus:ring-primary-dark"
                      value={selectaddress ? selectaddress.id : ''} // Use the value of selectaddress to select the correct option
                      onChange={(e) => handleCardSelection(e.target.value)}
                    >
                      <option value="" disabled>
                        Lista de Endereços
                      </option>
                      {cards.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.postal_code}, {address.city} - {address.uf}
                        </option>
                      ))}
                    </select>

                    <button onClick={toform} className='no-select sm:p-1 sm:mt-2 w-fit ml-6 sm:ml-0 sm:w-full active:bg-orange-500 rounded-xl shadow cursor-pointer bg-[#FEBF2F]'>
                      Criar novo Endereço
                    </button>
                  </div>


                </article>

              </div></>}
            </>}
        </div>
      </div>
    </div>
  );
}

export default function UserAddressesWrapper({ screens }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <User_Addresses screens={screens} />
    </QueryClientProvider>
  );
}
