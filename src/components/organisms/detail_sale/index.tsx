'use client';
import React, { useState } from 'react';
import { B_forms } from '@/components/atoms/buttons';
import InputField from '@/components/atoms/inputs';
import Freight from '@/components/molecules/freight';
import { Counter } from '@/components/molecules/CountValue/';
import { Product } from '@/types/product';
import { api } from '@/utils/api';
import { ProductProps } from '@/types/product';

export default function DetailSale({ product }: ProductProps) {
    const [cont, setCont] = useState(1);
    const [QuantitySelect, setQuantitySelect] = useState(1);
    const handleCountChange = (count: number) => {
        setQuantitySelect(count);
    };

    const handleAddToCart = () => {
        const cartItem = {
            QuantitySelect,
            product,
        };

        // Armazenar cartItem no localStorage
        localStorage.setItem(product.id.toString(), JSON.stringify(cartItem));
    };

    return (
        <div className='flex flex-col  items-center'>
            <div className='w-11/12 ml-4 mr-4  w-full h-full item-center'>
                {product.quantity > 0 ? (
                    <React.Fragment>
                        <article className='flex flex-row justify-center mt-4'>
                            <div className='  mb-6  p-3 bg-[#D9D9D9] w-full rounded-xl text-center  '>
                                <h1>{product.name}</h1>
                            </div>
                        </article>
                        <div className='bg-[#F9EDC8] m-1 p-2 rounded-xl bg-gradient-to-r from-transparent'>
                            <Freight multiply={QuantitySelect} />
                            <div className='mt-6 mb-6'>
                                <h1>Quantity |{product.quantity}|</h1>
                                <Counter maxLimit={product.quantity} initialQuantity={1} onCountChange={handleCountChange} />
                            </div>
                            <p>
                                Valor: R${' '}
                                {product && (product.price * QuantitySelect).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                            <div className='mt-6 mb-3'>
                                <h1 className=' mt-1 mb-1'>Send The Product to Cart</h1>
                                <B_forms size='small' onclick={handleAddToCart} name='add to Cart' type='Cart' />
                            </div>
                            <div className=' mt-6 mb-6'>
                                <h1 className=' mt-1 mb-1'>Finish Order now</h1>
                                <B_forms size='small' onclick='' name='Carrinho' type='Buy_now' name='Buy Now' />
                            </div>
                        </div>
                        <div className='text-center mt-14'>
                            <p>
                                Fique atento na hora de consumir online, não deixe de exigir seus direitos Brasileiros. acesse essa
                                pagina para entender melhor dos teus Direitosacompanhado de todo código de defesa do consumidor.
                            </p>
                            <a href='https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm' className='text-sky-500 ' target='_blank'>
                                Para mais informações acesse aqui.
                            </a>
                        </div>
                    </React.Fragment>
                ) : (<React.Fragment>
                    <article className='flex flex-row justify-center mt-4'>
                        <div className='  mb-6  p-3 bg-[#D9D9D9] w-full rounded-xl text-center  '>
                            <h1>{product.name}</h1>
                        </div>
                    </article>
                    <div className='bg-[#F9EDC8] m-1 mt-6 pt-16 pb-16 pl-6 pr-6 w-4/5 rounded-xl bg-gradient-to-r from-transparent'>
                        <span > O poduto no momento se encontra fora de estoque</span>
                    </div>
                    <div >
                        <p>
                            Fique atento na hora de consumir online, não deixe de exigir seus direitos Brasileiros. acesse essa
                            pagina para entender melhor dos teus Direitosacompanhado de todo código de defesa do consumidor.
                        </p>
                        <a href='https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm' className='text-sky-500 ' target='_blank'>
                            Para mais informações acesse aqui.
                        </a>
                    </div>
                </React.Fragment>)
                }
            </div>
        </div>
    )
}
