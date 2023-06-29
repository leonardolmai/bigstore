import React from 'react';
import {B_forms} from '@/components/atomic/buttons'
import InputField from '@/components/atomic/inputs';
import Freight from '@/components/molecule/freight';


export default function detail_sale(){
    return(
        <>
        <div className='w-full h-full flex flex-col '>
            <div>
            <h1>Titulo do Poduto</h1>
        </div>
        <Freight/>
        </div>
        </>
    )
}



// pages/index.tsx


