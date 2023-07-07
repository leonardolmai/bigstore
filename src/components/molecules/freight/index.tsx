'use client';

import InputField from '@/components/atoms/inputs';
import { useState } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import v_location from '@/assets/icons/v_location.svg'
import Image from 'next/image'
import { B_forms } from '@/components/atoms/buttons';

interface FreightLocale {
  localidade: string;
  uf: string;
  bairro: string;
}

interface FreightPrice {
  valor: string;
  prazo: string;
}

export default function Freight({ multiply }) {
  const [cep, setCep] = useState('');
  const [freightLocale, setFreightLocale] = useState<FreightLocale | null>(null);
  const [freightPrice, setFreightPrice] = useState<FreightPrice | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const handleCalculateFreight = async () => {
    if (cep) {
      setLoading(true);

      try {
        const response1 = await axios.get<FreightLocale>(`https://viacep.com.br/ws/${cep}/json/`);
        setFreightLocale(response1.data);
        const mock = new MockAdapter(axios);
        const mockResponse = { valor: 15.50, prazo: '16 dias úteis' };
        mock.onGet(`/frete?cepOrigem=01153000&cepDestino=${cep}&peso=500`).reply(200, mockResponse);
        const response2 = await axios.get<FreightPrice>(`/frete?cepOrigem=01153000&cepDestino=${cep}&peso=500`);
        setFreightPrice(response2.data);

      } catch (error) {
        console.error('Erro ao calcular frete:', error);
      }

      setLoading(false);
    }
  };

  return (
    <div>
      <InputField
        label="Your Cep:"
        name="input"
        id="input-field"
        style="input-text-sales"
        size="medium"
        value={cep}
        onChange={handleCepChange}
      />
      <B_forms onclick={handleCalculateFreight} size="small" name="Calculate" type='freight' name='freight' />

      {loading && <p>Calculando frete...</p>}
      <div className='flex flex-row'>
        <p className='font-bold mt-3 mb-3 flex flex-row' >Freight Value: R$ {' '}
          {multiply == 1 && multiply && freightPrice && (
            <p className='font-light'>{freightPrice.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          )}
          {multiply % 2 === 0 && freightPrice && (
            <p className='font-light'>{(freightPrice.valor * multiply).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          )}
          {multiply % 2 !== 0 && multiply > 1 && freightPrice && (
            <p className='font-light'>{(freightPrice.valor * (multiply - 1)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          )}
        </p>


      </div>
      <div className='flex flex-row'>
        <p className='font-bold mt-3 mb-3'>Send to:ㅤ</p>
        {freightLocale && (<p className='flex flex-row items-center'> <Image src={v_location} alt="Locale" priority={true} />ㅤ {freightLocale?.localidade}, {freightLocale?.uf}.</p>)}
      </div>
    </div>
  );
}

