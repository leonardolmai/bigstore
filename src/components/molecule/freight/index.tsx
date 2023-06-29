'use client';
import InputField from '@/components/atomic/inputs';
import { useState } from 'react';
import { B_forms } from '@/components/atomic/buttons';
import axios from 'axios';
import { useCounter } from '@/components/molecule/counter';
// import { calculateFreight } from '@/components/api_extenal/calculatefreight';

export default function Freight() {
  const [cep, setCep] = useState('');
  const [freightValue, setFreightValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cidade, setCidae] = useState('');
  const [Uf,setUf] =useState('');


  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  const handleCalculateFreight = async () => {
    if (cep) {
      setLoading(true);

      try {
        // Obter informações de endereço com base no CEP usando a API ViaCEP
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        // Simulação do cálculo de frete com base nas informações de endereço obtidas
        const freight = calculateFreight(response.data);
        setFreightValue(freight);
        const {cidade,localidade} =response.data;
        setCidae(`${localidade},ㅤ`);
        const {Uf, uf} = response.data;
        setUf(`${uf}`);
      } catch (error) {
        console.error('Erro ao calcular frete:', error);
      }

      setLoading(false);
    }
  };

  const calculateFreight = (address) => {
    // Simulação do cálculo de frete com base nas informações de endereço
    // Aqui você pode implementar a lógica real para o cálculo do frete
    // Neste exemplo, estamos apenas retornando um valor fixo de R$ 10.00
    return 25.00;
  };

  const { count } = useCounter();
  
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
      <B_forms onclick={handleCalculateFreight} size="small" name="freight"/>
      {loading && <p>Calculando frete...</p>}
      <div className='flex flex-row'>
          <p className='font-bold'>Valor do frete:ㅤ</p>
      {freightValue !== null && (
          <p> R$ {freightValue.toFixed(2)}</p>
        )}
      </div>
      <div className='flex flex-row'>
          <p className='font-bold'>Enviar para:ㅤ</p>
          {<p>{cidade}{Uf}</p>}
      </div>
      <p className='font-bold'>Quantidade:{count}</p>
    </div>
  );
}
      
