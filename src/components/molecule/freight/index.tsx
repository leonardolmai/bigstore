'use client';
import InputField from '@/components/atomic/inputs';
import { useState } from 'react';
import { B_forms } from '@/components/atomic/buttons';
import axios from 'axios';
import { useCounter } from '@/components/molecule/counter';
// import { calculateFreight } from '@/components/api_extenal/calculatefreight';


interface Freight{
  valorpac: String;
  prazopac: string;
  valorsedex:string;
  prazosedex:string;
  localidade:string;
  uf:string;

}

export default function Freight() {
  const locale = {}
  const details = {}



  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  

  const handleCalculateFreight = async () => {
    if (cep) {
      setLoading(true);

      try {
        // Obter informações de endereço com base no CEP usando a API ViaCEP
        locale = {response} = await axios.get<Freight>(`https://viacep.com.br/ws/${cep}/json/`);

        // Simulação do cálculo de frete com base nas informações de endereço obtidas
        datails = {details} = await axios.get<Freight>(`https://cepcerto.com/ws/json-frete/01153000/${cep}/500`);
        
        // const freight = calculateFreight(response.data);
        // setFreightValue(freight);

        // const{Prazopac,prazopac} = details.data;
        // setpacprazo(`${prazopac}`);

        

        
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
    return 0.00;
  };

  // const { count } = useCounter();
  
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
          {  <p> {data.uf} </p> } 
      </div>
      <div className='flex flex-row'>
          <p className='font-bold'>Enviar para:ㅤ</p>
          {<p>{data.uf}</p>}

          
      </div>
      {/* <p className='font-bold'>Quantidade:{count}</p> */}
    </div>
  );
}
      
