'use client'
import React, { useState } from 'react'
import { B_forms } from '@/components/atoms/buttons'
import Freight from '@/components/molecules/freight'
import { Counter } from '@/components/molecules/CountValue/'
import { ProductProps } from '@/types/product'

export default function DetailSale({ product }: ProductProps) {
  const [cont, setCont] = useState(1)
  const [QuantitySelect, setQuantitySelect] = useState(1)
  const handleCountChange = (count: number) => {
    setQuantitySelect(count)
  }

  const handleAddToCart = () => {
    const cartItem = {
      QuantitySelect,
      product,
    }

    // Armazenar cartItem no localStorage
    localStorage.setItem(product.id.toString(), JSON.stringify(cartItem))
  }
  const handleAddToCartnow = () => {
    const cartItem = {
      QuantitySelect,
      product,
    }
    localStorage.setItem(product.id.toString(), JSON.stringify(cartItem))
    window.location.href = '/cart'
  }

  return (
    <div className="flex flex-col  items-center">
      <div className="item-center ml-4 mr-4  h-full w-11/12 w-full">
        {product.quantity > 0 ? (
          <React.Fragment>
            <article className="mt-4 flex flex-row justify-center">
              <div className="  mb-6  w-full rounded-xl bg-[#D9D9D9] p-3 text-center  ">
                <h1>{product.name}</h1>
              </div>
            </article>
            <div className="m-1 rounded-xl bg-[#F9EDC8] bg-gradient-to-r from-transparent p-2">
              <Freight multiply={QuantitySelect} />
              <div className="mb-6 mt-6">
                <h1>Quantity |{product.quantity}|</h1>
                <Counter
                  maxLimit={product.quantity}
                  initialQuantity={1}
                  onCountChange={handleCountChange}
                />
              </div>
              <p>
                Valor: R${' '}
                {product &&
                  (product.price * QuantitySelect).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
              </p>
              <div className="mb-3 mt-6">
                <h1 className=" mb-1 mt-1">Send The Product to Cart</h1>
                <B_forms
                  size="small"
                  onclick={handleAddToCart}
                  name="add to Cart"
                  type="Cart"
                />
              </div>
              <div className=" mb-6 mt-6" onClick={handleAddToCartnow}>
                <h1 className=" mb-1 mt-1">Finish Order now</h1>
                <B_forms
                  size="small"
                  name="Carrinho"
                  type="Buy_now"
                  name="Buy Now"
                />
              </div>
            </div>
            <div className="mt-14 text-center">
              <p>
                Fique atento na hora de consumir online, não deixe de exigir
                seus direitos Brasileiros. acesse essa pagina para entender
                melhor dos teus Direitosacompanhado de todo código de defesa do
                consumidor.
              </p>
              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm"
                className="text-sky-500 "
                target="_blank"
                rel="noreferrer"
              >
                Para mais informações acesse aqui.
              </a>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <article className="mt-4 flex flex-row justify-center">
              <div className="  mb-6  w-full rounded-xl bg-[#D9D9D9] p-3 text-center  ">
                <h1>{product.name}</h1>
              </div>
            </article>
            <div className="m-1 mt-6 w-4/5 rounded-xl bg-[#F9EDC8] bg-gradient-to-r from-transparent pb-16 pl-6 pr-6 pt-16">
              <span> O poduto no momento se encontra fora de estoque</span>
            </div>
            <div>
              <p>
                Fique atento na hora de consumir online, não deixe de exigir
                seus direitos Brasileiros. acesse essa pagina para entender
                melhor dos teus Direitosacompanhado de todo código de defesa do
                consumidor.
              </p>
              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm"
                className="text-sky-500 "
                target="_blank"
                rel="noreferrer"
              >
                Para mais informações acesse aqui.
              </a>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
