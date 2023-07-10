
'use client'  // boolforms={boolforms} setBoolForms={setBoolForms}  boolforms, setBoolForms
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import Forms_repayment from './Forms_repayment';

export default function Menu_repayment({ screens, items, alingLists }) {
  const [boolforms, setBoolForms] = useState(false);
  const [widthlist, setwidthlist] = useState('');
  const excluir_variavel = "Name_product_here";

  let boxhovered = {
    shadow_color: 'hover: shadow-blue-500',
    type: 'hover: shadow-3xl',
    autocomplete: 'shadow-drop-box',
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setwidthlist("");
      } else if (screens.isMediumScreen) {
        setwidthlist("");
      } else if (screens.isSmallScreen) {
        setwidthlist("");
      } else if (screens.isNanoScreen) {
        setwidthlist("p-[55px]");
      } else if (screens.isSmallNanoScreen) {
        setwidthlist("p-8");
      } else {
        setwidthlist("p-20");
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ]);

  const handleVerifyClick = () => {
    setBoolForms(true);
    console.log(boolforms);
  };

  return (
    <div className={`${alingLists} ${widthlist} mb-14`}>
      {boolforms ? (<div className="flex flex-col min-w-0 w-[266px] h-full p-2 rounded-3xl">
        <Forms_repayment boolforms={boolforms} setBoolForms={setBoolForms} screens={screens} />
      </div>

      ) : (
        Array.from({ length: items }).map((_, index) => (
          <div key={index} className={`flex  select-none flex-col min-w-0 w-[266px] h-[216px]  bg-[#F5F5F5] p-2 rounded-3xl  shadow-lg shadow-orange-200 hover:shadow-3xl hover:shadow-orange-500  transition-all`} >
            <div className="flex justify-center gap-2">
              <Calendar className="stroke-slate-400" />
              <p className="text-slate-400 cursor">02/09/1997</p>
            </div>
            <hr />
            <div>
              <h2 className="font-bold">Protocol:
                {(() => {
                  const indexString = index.toString();
                  console.log(indexString.substring(0, 1))
                  return indexString.length > 1 ? indexString.substring(0, 10) + '...' : index;
                })
                  ()}
              </h2>
              <div className="font-light">
                <p>ID Product:ID</p>
                <p>Because: {"because is many to said in here".length > 10 ? "because is many to said in here".substring(0, 10) + '...' : "because is many to said in here"}</p>
                <p>
                  Date to buy: xx/xx/xx
                </p>
              </div>
              <hr></hr>
              <article className="flex flex-row flex-nowrap justify-center gap-2 m-2">
                <div
                  className="bg-[#2d7ee7] w-fit p-2 rounded-3xl text-[#9fc1f4] cursor-pointer active:bg-[#1a4a8a]"
                  onClick={handleVerifyClick}
                >
                  <input className="cursor-pointer" type="button" value="Verify" />
                </div>
                <div className="bg-[#6cbe7a83] w-fit p-2 rounded-3xl text-[#6CBE79] cursor-pointer active:bg-[#518f5b]">
                  <input className="cursor-pointer" type="button" value="approve" />
                </div>
                <div className="bg-[#fa480771] w-fit p-2 rounded-3xl text-[#FA4907] cursor-pointer active:bg-[hsl(16,70%,33%)]">
                  <input className="cursor-pointer" type="button" value="disapprove" />
                </div>
              </article>
            </div>
          </div>
        ))
      )
      }
    </div >
  );
}
