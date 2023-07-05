'use client';
import Counter from '@/components/molecules/CountValue';



export default function cart() {


  return (
    <div className="flex flex-row m-40  items-center">
      <div className="w-11/12 ml-4 mr-4  w-full h-full item-center">
        <article className='flex flex-row justify-start mt-4'>
          <div className='  mb-6  p-3 bg-[#D9D9D9] w-50 rounded-xl text-center  '>
            <h1>Meu Carrinho</h1>
          </div>
        </article>
        <div>

          <div className='flex flex-row   mb-6  p-3 gap-3 w-full justify-start mt-4 bg-[#D9D9D9]  rounded-xl'>
            <div className="w-60 h-40 bg-blue-200 rounded-xl"><p>img</p></div>
            <div className="flex flex-col">
              <p> Nome</p>
              <p> valor: R$ XXXXX</p>
              <Counter />
              <p></p>
            </div>
          </div>
        </div>

      </div>


      <div className=' flex flex-col w-6/12 ml-4 mr-4  w-50 h-full item-center' >
        <article className='flex flex-row justify-center mt-4'>
          <div className='  mb-6  p-3 bg-[#F1F1F4] w-50 rounded-xl text-center  '>
            <h1>Finaliza Pedido</h1>
          </div>
        </article>
        <div className='bg-[#D9D9D9] m-1 p-2 rounded-xl bg-gradient-to-r from-transparent'>
          {/* // <Freight /> */}
          <div className='mt-6 mb-6'>
            <h1>Valor Final:</h1>

          </div>
          <p>Endereço </p>
          <p>Alterar endereco </p>
          <div className='mt-6 mb-3'>
            <h1 className=' mt-1 mb-1'>Quantidade de produtos selecionados</h1>
            {/* <B_forms size="small" onClick="" name="Carrinho" type="Cart" /> */}
          </div>
          <div className=' mt-6 mb-6'>
            <h1 className=' mt-1 mb-1'>Finish Order now</h1>
            {/* <B_forms size="small" onClick="" name="Carrinho" type="Buy_now" /> */}
          </div>

        </div>
        <div className='text-center mt-14'>
          <p>Fique atento na hora de consumir online, não deixe de exigir seus direitos Brasileiros. acesse essa pagina para entender melhor dos teus Direitosacompanhado de todo código de defesa do consumidor.</p>
          <a href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm" className='text-sky-500 ' target="_blank">Para mais informações acesse aqui.</a>

        </div>
      </div>


    </div>)

}
