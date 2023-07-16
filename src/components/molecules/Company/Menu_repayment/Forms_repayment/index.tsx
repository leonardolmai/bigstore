'use client'
import { useState, useEffect } from 'react'
import InputField from "@/components/atoms/inputs"
import CarouselComponent from "@/components/organisms/carousel"


// label, name, id, style, size, value, onChange
export default function Forms_repayment({ boolforms, setBoolForms, screens }) {
  const [modifypage, setModifyPage] = useState('')
  const [modifymsg, setModifymsg] = useState('')
  const [modifysizeinput, selfmodifysizeinput] = useState('')
  const handleVerifyClick = () => {
    setBoolForms(false);
    console.log(boolforms);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setModifyPage("  ml-40")
        setModifymsg("w-[800px] h-[375px]")
        selfmodifysizeinput('large')
      }
      else if (screens.isMediumScreen) {

        setModifymsg("w-[550px] h-[375px]")
        selfmodifysizeinput('small')
      }
      else if (screens.isSmallScreen) {


        setModifymsg("w-[320px] h-[375px]")
        selfmodifysizeinput('small')
      }
      else if (screens.isNanoScreen) {
        setModifyPage("flex-col ml-2  justify-start self-start ")
        setModifymsg("w-[270px] h-[575px]")
        selfmodifysizeinput('small')
      }
      else if (screens.isSmallNanoScreen) {
        setModifyPage("flex-col ml-1  justify-start self-start ")
        setModifymsg("w-[170px] h-[475px]")
        selfmodifysizeinput('small')
      }
    }
  }, [screens.isLargeScreen,
  screens.isMediumScreen,
  screens.isSmallScreen,
  screens.isNanoScreen,
  screens.isSmallNanoScreen,])


  return (
    <div>
      <form className={`flex flex-col-reverse w-fit ${modifypage} self-auto h-full object-center  `}>

        <div className="flex flex-row self-center flex-wrap">
          <div className=" w-fit p-2 rounded-3xl  cursor-pointer active:bg-[#7a7a7a]">
            <input className="cursor-pointer" type="button" value="Back" onClick={handleVerifyClick} />
          </div>
          <div className="bg-[#6cbe7a83] w-fit p-2 rounded-3xl text-[#6CBE79] cursor-pointer active:bg-[#518f5b]">
            <input className="cursor-pointer" type="button" value="approve" />
          </div>
          <div className="bg-[#fa480771] w-fit p-2 rounded-3xl text-[#FA4907] cursor-pointer active:bg-[hsl(16,70%,33%)]">
            <input className="cursor-pointer" type="button" value="disapprove" />
          </div>
        </div>

        <div className='flex flex-wrap-reverse   flex-col'>
          <div className='flex flex-row flex-wrap gap-6 justify-center '>
            <InputField label="Name" name="form_product" id="form_product" style="input-text-see" size={modifysizeinput} value="CNPJ: XXXXXXXXXXXXXX" onChange={null} />
            <InputField label="Email" name="form_product" id="form_product" style="input-text-see" size={modifysizeinput} value="CNPJ: XXXXXXXXXXXXXX" onChange={null} />
          </div>
          <div className="flex flex-row gap-6 flex-wrap justify-center ">
            <InputField label="ID Product" name="form_product1" id="form_product1" style="input-text-see" size={modifysizeinput} value="ID PRODUCT: XXXXXXXXXXXXXX" onChange={null} />
            <InputField label="Product Name" name="form_product1" id="form_product1" style="input-text-see" size={modifysizeinput} value="ID Name: XXXXXXXXXXXXXX" onChange={null} />


          </div>
          <div className='flex flex-row gap-6 flex-wrap justify-center '>
            <InputField label="Quantity" name="form_product3" id="form_produc3" style="input-text-see" size="small" value="XXX" onChange={null} />
            <InputField label="Unitary Price" name="form_produc4" id="form_product4" style="input-text-see" value={"1.200".toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} size="small" onChange={null} />
            <InputField label="Category" name="form_produc4" id="form_product4" style="input-text-see" value="electronics" size="small" onChange={null} />

          </div>
          <div className='flex flex-row gap-3 flex-wrap justify-center '>
            <InputField label="Date to Buy" name="form_product2" id="form_product2" style="input-date-see" size="small" value="xx/xx/xxxx" onChange={null} />
            <InputField label="Date Protocol" name="form_product2" id="form_product2" style="input-date-see" size="small" value="xx/xx/xxxx" onChange={null} />

          </div>
          <div className='flex flex-row gap-3 flex-wrap justify-center '>
            <textarea class={`msg bg-[#E8E8E8] font-light text-[#6B6B6B] mt-3 mb-3 border rounded-md shadow-md outline-4 focus:outline-[#FEBD2F] px-3   ${modifymsg}  resize-none`}
              id='123' name='123' cols="50" rows="20" disabled={true} required value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at vulputate mi, vel elementum dolor. Sed vehicula risus odio, at aliquet nulla dapibus id. Ut dictum pellentesque laoreet. Phasellus porttitor, risus ac laoreet viverra, nisi lectus faucibus orci, eget consectetur eros lectus ut tellus. Aliquam erat volutpat. Curabitur pretium tellus diam, ut sodales tellus vehicula quis. Pellentesque euismod quis libero eu malesuada. Donec vitae dictum libero, et pharetra lorem. Etiam id tempus augue. Integer scelerisque enim sit amet neque sagittis, vel aliquet eros bibendum. Sed lobortis porta sagittis. Fusce ut lacus arcu. Donec velit est, vulputate et consectetur vel, dictum sodales diam. Nunc laoreet erat in nisl lobortis, sed bibendum neque facilisis. Proin facilisis pellentesque ipsum, et molestie tortor bibendum dignissim. Integer fermentum, neque in eleifend sollicitudin, libero enim dignissim lectus, ut tincidunt neque elit sed tortor."></textarea>

          </div>
        </div>

        <div className=" w-full flex flex-row    justify-center  ">
          <h1 className='p-2 bg-[#c7c7c7] rounded-3xl'>Repayment Forms</h1>

        </div>

      </form >

    </div >
  )

}
