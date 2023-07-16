'use client'
import { useState, useEffect } from "react";
import axios from "axios";

export default function Employer_forms({ screens, boolforms, setBoolForms }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alingForm, setAlingForm] = useState('');
  const [formInput, setFormInput] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingForm('w-[1145px]');
        setFormInput('w-[700px] h-[300px]');
      } else if (screens.isMediumScreen) {
        setAlingForm('w-[880px]');
        setFormInput('w-[600px] h-[300px]');

      } else if (screens.isSmallScreen) {
        setAlingForm('w-[666px]');
        setFormInput('w-[500px] h-[300px]');
      } else if (screens.isNanoScreen) {
        setAlingForm('w-[380px]');
        setFormInput('w-[200px] h-[300px]');
      } else if (screens.isSmallNanoScreen) {
        setAlingForm('w-[280px]');
        setFormInput('w-60');
      } else {
        setAlingForm('w-[183px]');
        setFormInput('w-60');
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ]);


  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/companies/{id da minha empresa}/employees/`,
        { email }
      );

      setAlertMessage("Employee added successfully.");
    } catch (error) {
      setAlertMessage("Request failed. Please try again.");
    }

    setLoading(false);
  };

  const handleBackClick = () => {
    setBoolForms(false);
  };

  return (
    <div className={`${alingForm} flex flex-col justify-center self-center`}>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6">
        <input
          className="w-full max-w-[400px] rounded-lg focus:outline-[#FEBD2F] bg-white"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter employee email"
          required
        />
        <div className="flex flex-wrap flex-row gap-10"  >
          <button className="bg-[#FEBD2F] rounded-xl active:bg-black active:text-[#FEBD2F] p-1" type="submit" disabled={loading}>
            {loading ? "Adding Employee..." : "Add Employee"}
          </button>
          <button className="bg-slate-200 rounded-xl active:bg-black active:text-white p-1" onClick={handleBackClick}>Back</button>
        </div>
      </form >

      {alertMessage && (
        <div className="alert">{alertMessage}</div>
      )
      }
    </div >
  );
}
