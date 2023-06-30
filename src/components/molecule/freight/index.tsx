'use client';
import InputField from '@/components/atomic/inputs';
import { useState } from 'react';
import { B_forms } from '@/components/atomic/buttons';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

interface FreightLocale {
  localidade: string;
  uf: string;
  bairro: string;
}

interface FreightPrice {
  valor: string;
  prazo: string;
}

export default function Freight() {
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

        // Fazer a solicitação para a API dos Correios para calcular o frete

        const mock = new MockAdapter(axios);
        const mockResponse = { valor: '25.00', prazo: '16 dias úteis' };
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
        label="Digite algo:"
        name="input"
        id="input-field"
        style="input-text-sales"
        size="medium"
        value={cep}
        onChange={handleCepChange}
      />
      <B_forms onclick={handleCalculateFreight} size="small" name="freight" />

      {loading && <p>Calculando frete...</p>}
      <div className='flex flex-row'>
        <p className='font-bold'>Valor do frete:ㅤ{freightPrice &&( <p className='font-light'>{freightPrice.valor}</p> )}</p>
       
      </div>
      <div className='flex flex-row'>
          <p className='font-bold'>Enviar para:ㅤ</p>
          {freightLocale &&(<p>{freightLocale?.localidade}, {freightLocale?.uf}.</p>)}
      </div>
    </div>
  );
}

      