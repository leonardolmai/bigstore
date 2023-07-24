import { useState, useEffect, useMemo } from 'react';
import { api } from '@/utils/api';
import { UserCompany } from '@/types/usercompany';
import { BadgeX as Badge, PlusCircle } from 'lucide-react';
import Employer_forms from './Employer_forms';
import { getCookie } from 'cookies-next';

const useFetchEmployees = (companyId: number) => {
  const [employees, setEmployees] = useState<UserCompany[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get(`/companies/${companyId}/employees`, {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        });
        setEmployees(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [companyId]);

  return employees;
};

export default function Employer({ screens }) {
  const [boolforms, setBoolForms] = useState(false);
  const [widthlist, setwidthlist] = useState('');
  const [companyId, setCompanyId] = useState<number | null>(null); // Esperando atualização para /companie/me

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.get(`/companies/1`, {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        });
        setCompanyId(response.data.id);
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, []);



  const handleDelete = async (email: string) => {
    try {
      await api.delete(`/companies/${companyId}/employees`, {
        headers: {
          Authorization: `Token ${getCookie('token')}`,
        },
        data: {
          email: email,
        },
      });
      window.location.href = '/company'
      setEmployees((prevEmployees) =>
        prevEmployees.filter((user) => user.email !== email)
      );

    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const employees = useFetchEmployees(companyId);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setwidthlist('w-56');
      } else if (screens.isMediumScreen) {
        setwidthlist('w-44 self-center items-center');
      } else if (screens.isSmallScreen) {
        setwidthlist('w-28  flex flex-col text-xs break-all self-center items-center');
      } else if (screens.isNanoScreen) {
        setwidthlist('w-[70px] flex flex-col text-xs break-all justif  self-center items-center');
      } else if (screens.isSmallNanoScreen) {
        setwidthlist('w-[44px] flex flex-col  text-xs break-all justif  self-center items-center');
      } else {
        setwidthlist('w-[33px] flex flex-col  text-xs break-all justif  self-center items-center');
      }
    }
  }, [screens.isLargeScreen, screens.isMediumScreen, screens.isSmallScreen, screens.isNanoScreen, screens.isSmallNanoScreen]);

  const handleformClick = () => {
    if (typeof window !== 'undefined') {
      setBoolForms(true);
    }
  };

  return (
    <div className={`select-none`}>
      {boolforms ? (
        <Employer_forms screens={screens} setBoolForms={setBoolForms} companyId={companyId || 1} />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <label className="font-bold">Added new Employer</label>
            <PlusCircle
              onClick={handleformClick}
              size={24}
              className="w-full max-w-[350px] h-8 pt-1 pb-1 bg-[#FEBD2F] cursor-pointer rounded-lg active:bg-[#8d691a] active:stroke-amber-950"
            />
          </div>
          <div className={`flex flex-row  m-2 p-2 bg-[#ffffff] justify-between items-start rounded-t-xl`}>
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>Id</p>
            </div>
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>User name</p>
            </div>
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>Email</p>
            </div>
            <div className={`flex justify-center ${widthlist} border-e-2`}>
              <p>Phone</p>
            </div>
            <div className={`flex justify-center ${widthlist} cursor-default`}>
              <p>Revoke</p>
            </div>
          </div>
          {employees.map((user, index) => (
            <div key={user.id}>
              <div
                className={`flex flex-row m-2 p-2 ${index % 2 == 0 ? 'bg-[#F5F6F7]' : 'bg-[#b8b8b8]'
                  } justify-between items-start rounded-md shadow-lg shadow-orange-200 hover:shadow-3xl hover:shadow-orange-500 transition-all`}
              >
                <div className={`flex justify-center ${widthlist} border-e-2`}>
                  <p>{user.id}</p>
                </div>
                <div className={`flex justify-center ${widthlist} border-e-2`}>
                  <p>{user.name.length > 15 ? user.name.substring(0, 15) + '...' : user.name}</p>
                </div>
                <div className={`flex justify-center ${widthlist} border-e-2`}>
                  <p>{user.email}</p>
                </div>
                <div className={`flex justify-center ${widthlist} border-e-2`}>
                  <p>{user.phone}</p>
                  <p>{user.phone.length < 1 ? 'Sem numero' : user.phone}</p>
                </div>
                <div className={`flex justify-center ${widthlist} cursor-pointer`}>
                  {user.id === 1 ? <></> : <>
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="flex flex-row items-center justify-center    bg-primary cursor-pointer rounded-xl active:bg-red-600 active:ring-4"
                    >
                      <p>
                        <Badge color={'black'} />
                      </p>
                    </button>
                  </>}

                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
