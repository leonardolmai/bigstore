import { Calendar } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { Company } from '@/types/companies';
import { getCookie } from 'cookies-next';
import company from '@/app/company/page';

export default function Menu_componente({ screens, alingLists }) {
  const [widthlist, setwidthlist] = useState('');
  const excluir_variavel = "Name_Employer_here";
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filterType, setFilterType] = useState<'name' | 'cnpj'>('name');
  const [filterValue, setFilterValue] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  useEffect(() => {

    const fetchCompanies = async () => {
      try {
        const response = await api.get('/companies', {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        });
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

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
        setwidthlist("p-20");
      }
    }
  }, [screens.isLargeScreen, screens.isMediumScreen, screens.isSmallScreen, screens.isNanoScreen, screens.isSmallNanoScreen]);

  const handleFilterTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value as 'name' | 'cnpj');
    setFilterValue('');
  };

  const handleFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const [activeCompanies, setActiveCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanyStatus = async (id) => {
      try {
        const response = await api.get(`/companies/${id}/`, {
          headers: {
            'Authorization': `Token ${getCookie('token')}`,
          },
        });

        return response.data.is_active;
      } catch (error) {
        console.error('Error fetching company information:', error);
        return null;
      }
    };

    const fetchActiveCompanies = async () => {
      const activeCompaniesPromises = companies.map((company) => {
        return fetchCompanyStatus(company.id).then((isActive) => {
          return isActive === false ? company : null;
        });
      });

      const resolvedCompanies = await Promise.all(activeCompaniesPromises);
      setActiveCompanies(resolvedCompanies.filter((company) => company !== null));
    };

    fetchActiveCompanies();
  }, [companies]);

  const activateCompany = async (companyj) => {
    try {
      await api.put(`/companies/${companyj.id}/`,
        {
          id: companyj?.id,
          name: companyj?.name,
          cnpj: companyj?.cnpj,
          website: companyj?.website,
          owner: companyj?.owner,
          is_active: true
        }, {
        headers: {
          'Authorization': `Token ${getCookie('token')}`,
        },
      });
      alert(`Empresa Aprovada com sucesso ${companyj.id}`)
      setCompanies((prevCompanies) => prevCompanies.map((company) => {
        if (company.id === companyj.id) {
          return { ...company, is_active: true };
        }
        return company;

      }));
    } catch (error) {
      console.error('Error activating company:', error);
    }
  };


  useEffect(() => {
    const filterCompanies = () => {
      if (filterType === 'name') {
        setFilteredCompanies(activeCompanies.filter((company) =>
          company.name.toLowerCase().includes(filterValue.toLowerCase())
        ));
      } else if (filterType === 'cnpj') {
        setFilteredCompanies(activeCompanies.filter((company) =>
          company.cnpj.includes(filterValue)
        ));
      }
    };

    filterCompanies();
  }, [filterValue, filterType, activeCompanies]);

  return (
    <>
      <div className="flex flex-row gap-6 justify-center">
        <input
          type="text"
          value={filterValue}
          onChange={handleFilterValueChange}
          placeholder={filterType === 'name' ? 'Enter name' : 'Enter CNPJ'}
          className='border border-gray-400 rounded-md p-2 w-min-full w-fit outline-none items-center focus:border-primary'
        />
        <select
          name="filterType"
          id="filterType"
          value={filterType}
          onChange={handleFilterTypeChange}
          className="border rounded-md p-2 font-semibold bg-primary w-fit outline-none border-primary-dark"
        >
          <option value="name">Name</option>
          <option value="cnpj">CNPJ</option>
        </select>
      </div>
      <div className={`${alingLists} ${widthlist}`}>
        {filteredCompanies.map((company) => (
          <div
            className="flex select-none flex-col min-w-0 w-[266px] h-[216px] bg-[#F5F5F5] p-2 rounded-3xl shadow-lg shadow-orange-200 hover:shadow-3xl hover:shadow-orange-500 transition-all"
            key={company.id}
          >
            <div className="flex justify-center gap-2">
              <Calendar className="stroke-slate-400" />
              <p className="text-slate-400">xx/xx/xxxx</p>
            </div>
            <hr />
            <div>
              <h2 className="font-bold">Nova Empresa</h2>
              <div className="font-light">
                <p>CNPJ: {company.cnpj}</p>
                <p>NAME: {company.name}</p>
                <p>WEBSITE: {company.website}</p>
              </div>
              <hr />
              <article className="flex flex-row flex-wrap justify-center items-center self-center mt-5 gap-5 m-2">
                <div>
                  <input
                    className="cursor-pointer bg-primary shadow-md w-fit px-2 py-2 rounded-md text-black cursor-pointer bg-primary active:bg-primary-dark"
                    type="button"
                    value="approve"
                    onClick={() => activateCompany(company)}
                  />
                </div>

              </article>
            </div>
          </div>
        ))}
        <p className='px-32 text-[#ffffff00] select-none'>.</p>
      </div>

      {/* {isFilterEmpty ? <><p> </p></> : <></>} */}
    </>
  );
}
