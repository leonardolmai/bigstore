import React from 'react';
import {B_forms} from '@/components/atomic/buttons'
import InputField from '@/components/atomic/inputs';




export default function detail_sale(){
    return(
        <>
        <div className='w-full h-full flex flex-col '>
            <div>
            <h1>Titulo do Poduto</h1>
        </div>
        <form className="flex flex-col">
                
                
                <InputField
                label="calculate the freight"
                style="input-text-sales"
                name="name"
                id="name-input"
                size="small" />
  
                <InputField
                label="calculate the freight"
                style="input-text-sales"
                name="name"
                id="name-input"
                size="small"
                />
                 <B_forms name='freight' size='small'/>

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


