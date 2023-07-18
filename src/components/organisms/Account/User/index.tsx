import { useState, useEffect } from "react";

export default function Settings_User({ screens }) {
  const [widthform, setAlingForm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

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
  const EditNameForm = () => {
    return (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-bold">new name</label>
          <input type="text" value={'my name....'} className="w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] border-solid  active:outline-[#ffae00]  focus:outline-[#FEBD2F]   mb-4" />
        </div>
        <div className="flex flex-row flex-wrap gap-6">
          <button className="flex items-center w-fit max-w-[300px] bg-[#8888] text-black active:bg-black active:text-[#8888] pl-2 pr-2 rounded-xl" onClick={() => setSelectedOption('')}>
            Back
          </button>
          <button className="flex items-center w-fit max-w-[300px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl" onClick={() => setSelectedOption('')}>
            Save New Name
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
              <input type="text" value={'my name'} className="w-fit max-w-[700px] rounded-lg bg-[#888888] border-solid border-2  hover:border-black cursor-no-drop mb-4" disabled />
            </div>
            <button className="flex items-center w-fit max-w-[300px] max-h-[35px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl" onClick={() => handleOptionSelection('name')}>
              Edit
            </button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-col gap 2">
              <label className="font-bold">User Email</label>
              <input type="text" value={'meuemail@sim.com'} className="w-fit pl-2 max-w-[700px] rounded-lg bg-[#888888] border-solid border-2  hover:border-black cursor-no-drop mb-4" disabled />
            </div>
            <button className="flex items-center w-fit max-w-[300px] max-h-[35px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl" onClick={() => handleOptionSelection('email')}>
              Edit
            </button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-col gap 2">
              <label className="font-bold">Number</label>
              <input type="text" value={'(84)xxxx - xxxx '} className="w-fit pl-2 max-w-[700px] rounded-lg bg-[#888888] border-solid border-2  hover:border-black cursor-no-drop mb-4" disabled />
            </div>
            <button className="flex items-center w-fit max-w-[300px] max-h-[35px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl" onClick={() => handleOptionSelection('ddd')}>
              Edit
            </button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-col gap 2">
              <label className="font-bold">Password</label>
              <input type="text" value={'*********'} className="w-fit pl-2 max-w-[700px] rounded-lg bg-[#888888] border-solid border-2  hover:border-black cursor-no-drop mb-4" disabled />
            </div>
            <button className="flex items-center w-fit max-w-[300px] max-h-[35px] bg-green-400 text-green-950 active:bg-green-950 active:text-green-400 pl-2 pr-2 rounded-xl" onClick={() => handleOptionSelection('password')}>
              Edit
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
