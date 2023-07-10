'use client'
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
export default function Menu_componente({ screens, items, alingLists }) {
  const [widthlist, setwidthlist] = useState('');
  const excluir_variavel = "Name_Employer_here";

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setwidthlist("");
      } else if (screens.isMediumScreen) {
        setwidthlist("");
      } else if (screens.isSmallScreen) {
        setwidthlist("");
      } else if (screens.isNanoScreen) {
        setwidthlist("p-[55px] ");


      } else if (screens.isSmallNanoScreen) {
        setwidthlist("p-8");


      } else {
        setwidthlist("p-20 ");
      }
    }
  }, [screens.isLargeScreen, screens.isMediumScreen, screens.isSmallScreen, screens.isNanoScreen, screens.isSmallNanoScreen]);



  return (
    <div className={`${alingLists} ${widthlist}`}>

      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className={`flex  select-none flex-col min-w-0 w-[266px] h-[216px]  bg-[#F5F5F5] p-2 rounded-3xl  shadow-lg shadow-orange-200 hover:shadow-3xl hover:shadow-orange-500  transition-all`} >
          <div className="flex justify-center gap-2">
            <Calendar className="stroke-slate-400" />
            <p className="text-slate-400">02/09/1997</p>
          </div>
          <hr />
          <div>
            <h2 className="font-bold">New Employeer</h2>
            <div className="font-light">
              <p>CNPJ: </p>
              <p>NAME: {excluir_variavel.length > 10 ? excluir_variavel.substring(0, 10) + '...' : excluir_variavel}</p>
              <p>EMAIL: {excluir_variavel.length > 10 ? excluir_variavel.substring(0, 10) + '...' : excluir_variavel}</p>
              <p>USERNAME: {excluir_variavel.length > 10 ? excluir_variavel.substring(0, 10) + '...' : excluir_variavel}</p>
            </div>
            <hr></hr>
            <article className="flex flex-row flex-wrap justify-center gap-5 m-2">
              <div className="bg-[#6cbe7a83] w-fit p-2 rounded-3xl text-[#6CBE79] cursor-pointer active:bg-[#518f5b]">
                <input className="cursor-pointer" type="button" value="approve" />
                {/* onClick={'msg'} */}
              </div>
              <div className="bg-[#fa480771] w-fit p-2 rounded-3xl text-[#FA4907] cursor-pointer active:bg-[hsl(16,70%,33%)]">
                <input className="cursor-pointer" type="button" value="disapprove" />
                {/* onClick={'msg'} */}
              </div>
            </article>
          </div>
        </div>
      ))}
    </div>
  );
}
