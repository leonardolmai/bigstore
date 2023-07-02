'use client';

import React, { useState } from 'react';
import { B_forms } from '@/components/atoms/buttons';
import InputField from '@/components/atoms/inputs';
import Freight from '@/components/molecules/freight';
import Counter from '@/components/molecules/CountValue';


export default function detail_sale() {
    const [cont, setCont] = useState(1);
    return (
        <div className='flex flex-col  items-center'>
            <div className='w-11/12 ml-4 mr-4  w-full h-full item-center' >
                <article className='flex flex-row justify-center mt-4'>
                    <div className='  mb-6  p-3 bg-[#D9D9D9] w-40 rounded-xl text-center  '>
                        <h1>Titulo do Poduto</h1>
                    </div>
                </article>
                <div className='bg-[#F9EDC8] m-1 p-2 rounded-xl bg-gradient-to-r from-transparent'>
                    <Freight />
                    <div className='mt-6 mb-6'>
                        <h1>Quantity</h1>
                        <Counter />
                    </div>
                    <p> Valor: R$</p>
                    <div className='mt-6 mb-3'>
                        <h1 className=' mt-1 mb-1'>Send The Product to Cart</h1>
                        <B_forms size="small" onClick="" name="Carrinho" type="Cart" />
                    </div>
                    <div className=' mt-6 mb-6'>
                        <h1 className=' mt-1 mb-1'>Finish Order now</h1>
                        <B_forms size="small" onClick="" name="Carrinho" type="Buy_now" />
                    </div>

                </div>
                <div className='text-center mt-14'>
                    <p>Fique atento na hora de consumir online, não deixe de exigir seus direitos Brasileiros. acesse essa pagina para entender melhor dos teus Direitosacompanhado de todo código de defesa do consumidor.</p>
                    <a href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm" className='text-sky-500 ' target="_blank">Para mais informações acesse aqui.</a>

                </div>
            </div>
        </div>
    )
}



// pages/index.tsx


