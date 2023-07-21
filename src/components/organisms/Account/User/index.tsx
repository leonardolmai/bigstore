import { useState, useEffect } from "react";
import { User, UserId } from "@/types/user";
import { api } from "@/utils/api";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { getCookie } from 'cookies-next';

export async function userlogin(setUserData) {
  if (typeof window !== "undefined") {
    try {
      const response = await api.get('/users/', {
        headers: {
          'Authorization': `Token ${getCookie('token')}`,
        },
      });
      setUserData(response.data[0]); // Atualiza o estado userData com os dados do usuário
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
};


export default function Settings_User({ screens }) {
  const [widthform, setAlingForm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [userData, setUserData] = useState<UserId | null>(null);
  const [userIdData, setUserIdData] = useState<UserId | null>(null);

  const handleUpdateName = async (newName) => {
    try {

      await api.patch("/user", { name: newName });
      console.log("Nome do usuário atualizado!");
      setUserData({ ...userData, name: newName });
      setSelectedOption("");
    } catch (error) {
      console.error("Erro ao atualizar nome do usuário:", error);
    }
  };


  useEffect(() => {
    userlogin(setUserData); // Chamada para buscar os dados do usuário e atualizar o estado userData
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        try {
          const response = await api.get(`/users/${userData?.id}/`, {
            headers: {
              'Authorization': `Token ${getCookie('token')}`,
            },
          });
          setUserIdData(response.data); // Atualiza o estado userData com os dados do usuário
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      })

    }
  }), [userIdData];


  const handleUpdateEmail = async (newEmail) => {
    try {
      // Faz a chamada para a API para atualizar o email do usuário
      await api.patch("/user", { email: newEmail });
      console.log("Email do usuário atualizado!");
      // Atualiza o estado local com o novo email
      setUserData({ ...userData, email: newEmail });
      setSelectedOption("");
    } catch (error) {
      console.error("Erro ao atualizar email do usuário:", error);
    }
  };

  const handleUpdatePhone = async (newPhone) => {
    try {
      // Faz a chamada para a API para atualizar o telefone do usuário
      await api.patch("/user", { phone: newPhone });
      console.log("Telefone do usuário atualizado!");
      // Atualiza o estado local com o novo telefone
      setUserData({ ...userData, phone: newPhone });
      setSelectedOption("");
    } catch (error) {
      console.error("Erro ao atualizar telefone do usuário:", error);
    }
  };

  const handleUpdatePassword = async (newPassword) => {
    try {
      // Faz a chamada para a API para atualizar a senha do usuário
      await api.patch("/user", { password: newPassword });
      console.log("Senha do usuário atualizada!");
      // Atualiza o estado local com a nova senha
      setUserData({ ...userData, password: newPassword });
      setSelectedOption("");
    } catch (error) {
      console.error("Erro ao atualizar senha do usuário:", error);
    }
  };



  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingForm('w-[1145px]');
      } else if (screens.isMediumScreen) {
        setAlingForm('w-[880px]');
      } else if (screens.isSmallScreen) {
        setAlingForm('w-[666px]');
      } else if (screens.isNanoScreen) {
        setAlingForm('w-[380px]');
      } else if (screens.isSmallNanoScreen) {
        setAlingForm('w-[280px]');
      } else {
        setAlingForm('w-[183px]');
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ]);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  const EditNameForm = () => {
    const [newName, setNewName] = useState(""); // Novo state para armazenar o novo nome digitado

    return (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-bold">novo nome</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] border-solid  active:outline-[#ffae00]  focus:outline-[#FEBD2F]   mb-4"
          />
        </div>
        <div className="flex flex-row flex-wrap gap-6">
          <button
            className="flex items-center w-fit max-w-[300px] bg-[#8888] text-black active:bg-black active:text-[#8888] pl-2 pr-2 rounded-xl"
            onClick={() => setSelectedOption("")}
          >
            voltar
          </button>
          <button
            className="flex items-center w-fit max-w-[300px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl"
            onClick={() => handleUpdateName(newName)} // Chama a função handleUpdateName com o novo nome digitado
          >
            Salvar nome
          </button>
        </div>
      </>
    );
  };

  const EditEmailForm = () => {
    return (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Old email</label>
          <input type="text" value={'old email...'} className="w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] border-solid active:outline-[#ffae00] focus:outline-[#FEBD2F]  mb-4" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">new email</label>
          <input type="text" value={'new email'} className="w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] border-solid  active:outline-[#ffae00]  focus:outline-[#FEBD2F]   mb-4" />
        </div>
        <div className="flex flex-row flex-wrap gap-6">
          <button className="flex items-center w-fit max-w-[300px] bg-[#8888] text-black active:bg-black active:text-[#8888] pl-2 pr-2 rounded-xl" onClick={() => setSelectedOption('')}>
            Back
          </button>
          <button className="flex items-center w-fit max-w-[300px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl" onClick={() => setSelectedOption('')}>
            Save New Email
          </button>
        </div>
      </>
    );
  };

  const EditDDDForm = () => {
    return (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-bold">new number</label>
          <input type="text" value={'(DDD)XXXXX-XXXX'} className="w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] border-solid  active:outline-[#ffae00]  focus:outline-[#FEBD2F]   mb-4" />
        </div>
        <div className="flex flex-row flex-wrap gap-6">
          <button className="flex items-center w-fit max-w-[300px] bg-[#8888] text-black active:bg-black active:text-[#8888] pl-2 pr-2 rounded-xl" onClick={() => setSelectedOption('')}>
            Back
          </button>
          <button className="flex items-center w-fit max-w-[300px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl" onClick={() => setSelectedOption('')}>
            Save New Number
          </button>
        </div>
      </>
    );
  };

  const EditPasswordForm = () => {
    return (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Old Password</label>
          <input type="text" value={'*******'} className="w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] border-solid active:outline-[#ffae00] focus:outline-[#FEBD2F]  mb-4" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">new Password</label>
          <input type="text" value={'*******'} className="w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] border-solid  active:outline-[#ffae00]  focus:outline-[#FEBD2F]   mb-4" />
        </div>
        <div className="flex flex-row flex-wrap gap-6">
          <button className="flex items-center w-fit max-w-[300px] bg-[#8888] text-black active:bg-black active:text-[#8888] pl-2 pr-2 rounded-xl" onClick={() => setSelectedOption('')}>
            Back
          </button>
          <button className="flex items-center w-fit max-w-[300px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl" onClick={() => setSelectedOption('')}>
            Save New Password
          </button>
        </div>
      </>
    );
  };
  const renderForm = () => {
    if (selectedOption === 'email') {
      return <EditEmailForm />;
    } else if (selectedOption === 'name') {
      return <EditNameForm />;
    } else if (selectedOption === 'ddd') {
      return <EditDDDForm />;
    } else if (selectedOption === 'password') {
      return <EditPasswordForm />;
    } else {
      return (
        <>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-col gap 2">
              <label className="font-bold">User name</label>
              <input type="text" value={userData?.name || 'ainda não tem um nome...'} className={`w-fit max-w-[700px] px-2 py-2 rounded-md bg-[#FFFfFF] border-solid border-2  hover:border-black cursor-no-drop mb-4 ${userData?.name !== '' ? '' : 'text-red-600 font-semibold'}`} disabled />

            </div>
            <button className="flex items-center  mt-2 w-fit max-w-[300px] max-h-[35px] bg-primary hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark pl-2 pr-2 rounded-md" onClick={() => handleOptionSelection('name')}>
              Editar
            </button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-col gap 2">
              <label className="font-bold">Meu Email</label>
              <input type="text" value={userData?.email} className={`w-fit max-w-[700px] px-2 py-2 rounded-md bg-[#FFFFfF] border-solid border-2  hover:border-black cursor-no-drop mb-4 ${userData?.email !== '' ? '' : 'text-red-600 font-semibold'}`} disabled />
            </div>
            <button className="flex items-center mt-2 w-fit max-w-[300px] max-h-[35px] bg-primary hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark pl-2 pr-2 rounded-md" onClick={() => handleOptionSelection('email')}>
              Editar
            </button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-col gap 2">
              <label className="font-bold">Numero</label>
              <input type="text" value={userData?.phone || "não há Informação"} className={`w-fit max-w-[700px] px-2 py-2 rounded-md bg-[#FFFFfF] border-solid border-2  hover:border-black cursor-no-drop mb-4 ${userData?.phone !== '' ? '' : 'text-red-600 font-semibold'}`} disabled />
            </div>
            <button className="flex items-center mt-2 w-fit max-w-[300px] max-h-[35px] bg-primary hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark pl-2 pr-2 rounded-md" onClick={() => handleOptionSelection('ddd')}>
              Editar
            </button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-col gap 2">
              <label className="font-bold">Password</label>
              <input type="text" value={'***********'} className={`w-fit max-w-[700px] px-2 py-2 rounded-md bg-[#FFFFFf] border-solid border-2  hover:border-black cursor-no-drop mb-4 `} disabled />
            </div>
            <button className="flex items-center mt-2 w-fit max-w-[300px] max-h-[35px] bg-primary hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark pl-2 pr-2 rounded-md" onClick={() => handleOptionSelection('password')}>
              Editar
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className={`${widthform}`}>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold m-4">Account</h1>
        {renderForm()}
      </div>
    </div>
  );
}
