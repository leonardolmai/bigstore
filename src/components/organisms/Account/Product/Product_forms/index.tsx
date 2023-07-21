'use client'
import { useState, useEffect } from "react";
import axios from "axios";

export default function Product_forms({ screens, boolforms, setBoolForms, order }) {
  const [title, setTitle] = useState("");
  const [information, setInformation] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alingForm, setAlingForm] = useState('');
  const [formInput, setFormInput] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/report/`,
        {
          title,
          information,
          orderId: order.id, // Pass the order id as a parameter for the POST request
        }
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
    setTitle(e.target.value);
    setInformation(e.target.value)
  };



  return (
    <div className={`${alingForm} flex flex-col justify-center self-center`}>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6">
        <input
          className="w-full max-w-[400px] rounded-lg shadow focus:outline-[#FEBD2F] bg-white"
          type="email"
          value={title}
          onChange={handleInputChange}
          placeholder="Enter to your Title"
          required
        />
        <textarea rows={20}
          className="resize-none rounded-lg shadow focus:outline-[#FEBD2F] w-full max-w-[550px]"
          cols={50}
          value={information}
          onChange={handleInputChange}
          placeholder="Enter to details">

        </textarea>

        <div className="flex flex-wrap flex-row gap-10"  >
          <button className="bg-[#FEBD2F] rounded-xl active:bg-black active:text-[#FEBD2F] shadow-md shadow-black p-1" type="submit" disabled={loading}>
            {loading ? "Adding Employee..." : "Repayment"}
          </button>
          <button className="bg-slate-200 rounded-xl active:bg-black active:text-white p-1 shadow-md shadow-black" onClick={handleBackClick}>Back</button>
        </div>
      </form >

      {alertMessage && (
        <div className="alert">{alertMessage}</div>
      )
      }
    </div >
  );
}
