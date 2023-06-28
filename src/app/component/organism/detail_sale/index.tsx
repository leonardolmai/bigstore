import React from 'react';
import {B_forms} from '../../atomic/buttons'
import InputField from '../../atomic/inputs';




export default function detail_sale(){
    return(
        <>
        <div className='w-full h-full flex flex-col '>
            <div>
            <h1>Titulo do Poduto</h1>
        </div><form className="flex flex-col">
                <label htmlFor="frete" className="mb-2 italic">Calcula Frete</label>
                <InputField
                label="Nome:"
                className="w-full border-gray-300"
                name="name"
                id="name-input"
                
                />
                <input
                    className="mb-4 border-b-2"
                    id="frete"
                    name="frete"
                    type="text"
                    autoComplete=""
                    required />
                    <B_forms name='Freet' size='large'/>
                <div className="flex flex-row">
                    <p>Valor do Freete: R$</p> <span></span>
                </div>
                <span></span>    
                </form>
                <form>
                <label htmlFor="name" className="mb-2 italic">Name</label>
                <input 
                    className="mb-4 border-b-2"
                    id="name"
                    name="name"
                    type="text"
                    autocomplete=""
                    requied/>
                <button
                    type="submit"
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700">
                    Submit
                </button>
            </form>
        </div>
        </>
    )
}



// pages/index.tsx


