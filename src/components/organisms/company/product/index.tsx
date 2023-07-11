'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Formulario({ screens }) {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0);
  const [categoria, setCategoria] = useState('');

  const [alingForm, setAlingForm] = useState('');
  const [forminput, setFormInput] = useState('');

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingForm("w-[1145px]");
        setFormInput('w-60');
      } else if (screens.isMediumScreen) {
        setAlingForm("w-[880px]");
      } else if (screens.isSmallScreen) {
        setAlingForm("w-[666px]");
      } else if (screens.isNanoScreen) {
        setAlingForm("w-[380px]");
      } else if (screens.isSmallNanoScreen) {
        setAlingForm("w-[280px]")
      } else {
        setAlingForm("w-[183px]")
      }
    }
  }, [screens.isLargeScreen, screens.isMediumScreen, screens.isSmallScreen, screens.isNanoScreen, screens.isSmallNanoScreen]);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const selectedPhotos = Array.from(fileList);
    setPhotos(selectedPhotos);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(photos);

    try {
      const response = await axios.post('URL_DA_API', {
        titulo,
        texto,
        quantidade,
        preco,
        categoria,
      }, {
        headers: {
          Authorization: 'Token SEU_TOKEN',
        },
      });

      console.log('Resposta da API:', response.data);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col items-center ${alingForm} h-full`}>
      <div className='flex flex-col items-start'>
        <div className='gap-6 flex flex-row justify-center items-center'>
          <div className='flex flex-col  w-48'>
            <label htmlFor="titulo">Title:</label>
            <input className="border-[#B1B1B1]  border-2 focus:outline-[#FEBD2F] rounded-lg"
              type="text"
              id="titulo"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
            />
          </div>
          <div className='flex flex-col  w-48'>
            <label htmlFor="Photo_List opacity-0 ">Photo List</label>
            <div className='flex flex-1 justify-center cursor-pointer pt-1 bg-white border-[#B1B1B1]  active:bg-[#FEBD2F] focus:outline-[FEBD2F] w-24 rounded-lg'>
              <p className='absolute cursor-pointer'>Photos</p>
              <input className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer" style={{ background: 'red' }}
                type="file"
                id="photos"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </div>



          </div>
        </div>

        <div className='flex flex-col w-36'>
          <label htmlFor="texto">Text:</label>
          <textarea className={`resize-none border-[#B1B1B1]  w-[700px] h-[300px] border-2 focus:outline-[#FEBD2F] rounded-lg`}
            id="texto"
            value={texto}
            onChange={(event) => setTexto(event.target.value)}
          ></textarea>
        </div >
        <div className='flex flex-row items-center gap-6'>
          <div className='flex flex-col w-36'>
            <label htmlFor="quantidade">Quantidade:</label>
            <input className="border-[#B1B1B1] border-2 focus:outline-[#FEBD2F] rounded-lg"
              type="number"
              id="quantidade"
              value={quantidade}
              onChange={(event) => setQuantidade(event.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="preco">Price:</label>
            <input className="border-[#B1B1B1] border-2 focus:outline-[#FEBD2F] rounded-lg"
              type="number"
              step="0.01"
              id="preco"
              value={preco}
              onChange={(event) => setPreco(event.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="categoria">Category:</label>
            <select className="border-[#B1B1B1] border-2 focus:outline-[#FEBD2F] rounded-lg"
              id="categoria"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option value="">Select an category</option>
              <option value="categoria1">Category 1</option>
              <option value="categoria2">Category 2</option>
              <option value="categoria3">Category 3</option>
            </select>
          </div>
        </div>
        <div className='flex flex-row justify-center items-center self-center m-2'>
          <button className="p-1 pl-2 pr-2 bg-green-300 text-green-950 text-xl rounded-3xl" type="submit">Send</button>
        </div>
      </div>
    </form >
  );
}
