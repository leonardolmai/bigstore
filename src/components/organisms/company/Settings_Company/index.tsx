import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { headers } from "next/headers";
import { getCookie } from 'cookies-next'

export default function Settings_Company({ screens }) {
  const [widthform, setAlingForm] = useState("");
  const [formcase, setFormCase] = useState(false);

  const [companyName, setCompanyName] = useState("await information");
  const [cnpj, setCnpj] = useState("await information");

  useEffect(() => {
    const activecompanyinfo = async () => {
      try {
        const response = await api.get("companies/1", {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        });
        setCompanyName(response.data.name);
        setCnpj(response.data.cnpj);
      } catch (error) {
        console.error("Error fetching company information:", error);
      }
    };
    activecompanyinfo();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (getCookie('typeUser') === 'Bigstore') {

      }

      if (screens.isLargeScreen) {
        setAlingForm("w-[1145px]");
      } else if (screens.isMediumScreen) {
        setAlingForm("w-[880px]");
      } else if (screens.isSmallScreen) {
        setAlingForm("w-[666px]");
      } else if (screens.isNanoScreen) {
        setAlingForm("w-[380px]");
      } else if (screens.isSmallNanoScreen) {
        setAlingForm("w-[280px]");
      } else {
        setAlingForm("w-[183px]");
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ]);

  const handleAlterform = () => {
    setFormCase(!formcase);
  };

  const handlePatchCompany = async () => {
    if (typeof window !== 'undefined') {
      try {
        await api.patch("/companies/1/", { name: companyName, cnpj: cnpj }, {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        });

        alert("informação atualizada com sucesso!")
        window.location.href = '/company'
      } catch (error) {
        // Exibir uma mensagem de erro
        alert("Erro em atualizar as informações")
        console.error("Error updating company information:", error);
      }
    }
  };

  return (
    <div className={`${widthform}`}>
      <div className="flex flex-col items-center">
        {formcase ? (
          <>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-fit max-w-[700px] rounded-md px-2 py-2 bg-[#FFFFFF] border-solid active:outline-[#ffae00] focus:outline-[#FEBD2F]  mb-4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">CNPJ</label>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="w-fit max-w-[700px] rounded-md px-2 py-2 bg-[#FFFFFF] border-solid active:outline-[#ffae00]  focus:outline-[#FEBD2F]   mb-4"
              />
            </div>
            <div className="flex flex-row flex-wrap gap-6">
              <button
                className="flex items-center w-fit max-w-[300px] bg-[#8888] text-black active:bg-black active:text-[#8888] pl-2 pr-2 rounded-xl"
                onClick={handleAlterform}
              >
                Back
              </button>
              <button
                className="flex items-center w-fit max-w-[300px] bg-primary text-black active:bg-primary-dark active:text-black px-1 py-1 rounded-md shadow-md active:shadow-orange-700"
                onClick={handlePatchCompany}
              >
                Save Changes
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Company Name</label>
              <input
                type="text"
                value={companyName}
                className="w-fit max-w-[700px] rounded-md px-2 py-2 bg-[#888888] border-solid border-2  hover:border-black cursor-no-drop mb-4"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">CNPJ</label>
              <input
                type="text"
                value={cnpj}
                className="w-fit max-w-[700px] rounded-md px-2 py-2 bg-[#888888] border-solid border-2  hover:border-black cursor-no-drop mb-4"
                disabled
              />
            </div>
            <button
              className="flex items-center w-fit max-w-[300px] bg-primary text-black active:bg-primary-dark active:text-black px-1 py-1 rounded-md shadow-md active:shadow-orange-700"
              onClick={handleAlterform}
            >
              Edit Company
            </button>
          </>
        )}
      </div>
    </div>
  );
}
