import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api'
import { setCookie, getCookie } from 'cookies-next'
import { ProductImage } from '@/types/product'; // Certifique-se de importar corretamente a interface ProductImage
import Modal from 'react-modal';

export default function User_Cards({ screens }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [alingForm, setAlingForm] = useState('');
  const [alignbutton, setalignbutton] = useState('');
  const [aligncard, setaligncard] = useState('');

  const [cards, setCards] = useState([]);
  const [selectcard, setselectcards] = useState(null);
  const [createdform, setcreatedform] = useState(false);
  const [createdform2, setcreatedform2] = useState(false);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await api.get('/cards/', {
          headers: {
            'Authorization': `Token ${getCookie('token')}`,
          },
        });
        setCards(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de cartões:', error);
      }
    };
    fetchCards();
  }, []);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingForm('w-[1145px]');
        setalignbutton('flex-col');
        setaligncard('flex-row')
      } else if (screens.isMediumScreen) {
        setAlingForm('w-[880px]');
        setalignbutton('flex-col');
        setaligncard('flex-row')
      } else if (screens.isSmallScreen) {
        setAlingForm('w-[666px]');
        setalignbutton('flex-row');
        setaligncard('flex-col')
      } else if (screens.isNanoScreen) {
        setAlingForm('w-[380px]');
        setalignbutton('w-[200px] h-[300px]');
        setalignbutton('flex-row');
        setaligncard('flex-col')
      } else if (screens.isSmallNanoScreen) {
        setAlingForm('w-[280px]');
        setalignbutton('w-60');
        setalignbutton('flex-row');
        setaligncard('flex-col')
      } else {
        setAlingForm('w-[183px]');
        setalignbutton('w-60');
        setalignbutton('flex-row');
        setaligncard('flex-col')
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ]);

  const handleFileChange = (event) => {

    const fileList = event.target.files;

    // const selectedPhotos = Array.from(fileList);
    console.log(fileList)
    setImages(fileList);
  };

  const handleCardSelection = (cardId) => {
    const selectedCard = cards.find((card) => card.id === cardId);

    if (selectedCard) {
      setselectcards(selectedCard)
      setName(selectedCard.name);
      setDescription(selectedCard.description);
      // E assim por diante para os outros campos do formulário
    }
  };

  const toform = () => {
    if (createdform === false) {
      setcreatedform(true)
    } else {
      setcreatedform(false)
    }

  }

  const toform2 = () => {
    if (createdform2 === false) {
      setcreatedform2(true)
    } else {
      setcreatedform2(false)
    }

  }


  const handleSubmit = async (event) => {
    if (typeof window !== 'undefined') {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('category', category);

        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }

        const response = await api.post('/products/', formData, {
          headers: {
            'Authorization': `Token ${getCookie('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        // Limpar os campos após alguns segundos
        console.log('Imagens enviadas:', response.data);
        setName('');
        setDescription('');
        setQuantity(0);
        setPrice(0);
        setCategory('');
        setImages([]);
        setIsModalOpen(true);
        console.log('Imagens enviadas:', response.data);
      } catch (error) {
        console.error('Erro ao enviar imagens:', error);
      }
    }
  };


  return (
    <form onSubmit={handleSubmit} className={`flex flex-col  items-center ${alingForm} h-full`}>
      <div className="flex flex-col  items-start ">
        <div className={` gap-6 flex ${screens.isSmallScreen === true ? "flex-row" : "flex-col"}  justify-center items-center`}>
          {createdform ? <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <label>nameCard</label>
              <input type='number' className=' pl-1 min-w-full max-w-[550px]  rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'></input>

            </div>

            <div className='flex flex-col'>
              <label>number Card</label>
              <input type='text' className='  pl-1 min-w-full max-w-[550px]  rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'></input>
            </div>

            <div className='flex flex-col'>
              <label>number Card</label>
              <div className='flex flex-row gap-2'>
                <input type='number' oninput="this.value = this.value.slice(0, 2)" placeholder="month" className='  pl-1  max-w-[75px] min-w-[65px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'></input><p>/</p>
                <input type='number' pattern="[0-9]{4}" placeholder="year" className='  pl-1  max-w-[75px] min-w-[65px]    rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'></input>

              </div>


            </div>
            <div className='flex flex-col'>
              <label>CVC</label>
              <input type='password' pattern="[0-9]{3}" className='  pl-1 min-w-full max-w-[550px]  rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'></input>
            </div>
            <div>
              <button onClick={toform} className='no-select p-1 mt-2 w-full active:bg-white active:text-black text-white rounded-xl shadow-md cursor-pointer bg-[#000000]'>back</button>
              <button onClick={toform} className='no-select p-1 mt-2 w-full active:bg-orange-500 rounded-xl shadow-md  cursor-pointer bg-[#FEBF2F]'>Create Card</button>
            </div>

          </div> : <>{createdform2 ? <div className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <label>nameCard2</label>
              <input type='number' className=' pl-1 min-w-full max-w-[550px]  rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'></input>

            </div>

            <div className='flex flex-col'>
              <label>number Card2</label>
              <input type='text' className='  pl-1 min-w-full max-w-[550px]  rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'></input>
            </div>

            <div className='flex flex-col'>
              <label>number Card2</label>
              <div className='flex flex-row gap-2'>
                <input type='number' oninput="this.value = this.value.slice(0, 2)" placeholder="month" className='  pl-1  max-w-[75px] min-w-[65px] rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'></input><p>/</p>
                <input type='number' pattern="[0-9]{4}" placeholder="year" className='  pl-1  max-w-[75px] min-w-[65px]    rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'></input>

              </div>


            </div>
            <div className='flex flex-col'>
              <label>CVC2</label>
              <input type='password' pattern="[0-9]{3}" className='  pl-1 min-w-full max-w-[550px]  rounded-lg shadow-md outline-2 focus:outline-[#FEDB2F]'></input>
            </div>
            <div>
              <button onClick={toform2} className='no-select p-1 mt-2 w-full active:bg-white active:text-black text-white rounded-xl shadow-md cursor-pointer bg-[#000000]'>back</button>
              <button onClick={toform2} className='no-select p-1 mt-2 w-full active:bg-orange-500 rounded-xl shadow-md  cursor-pointer bg-[#FEBF2F]'>Create Card</button>
            </div>

          </div> : <><div className="flex flex-col w-48">
            <article className='flex flex-col items-center gap-6 '>
              {selectcard == null ? <div className={`flex   ${aligncard} gap-2`}>
                <div className='bg-gradient-to-r from-purple-600 to-blue-600 text-white w-[250px]  h-[130px] ml-10  p-2 items-start rounded-xl shadow shadow-black'>
                  <p className='mt-1 mb-1 no-select'>Name: x </p>
                  <p className='mt-1 mb-1 no-select'>Number: x </p>
                  {/* {selectcard.number} */}
                  <p className='mt-1 mb-1 no-select'>Validate: xx/xx</p>
                  <p className='mt-1 mb-1 no-select'>CVC: ***</p>
                </div>
                <div className={`flex ${alignbutton}  gap-3   justify-center ml-2 items-center`}>
                  <button onClick={toform2} className='bg-green-400 shadow rounded-lg p-1 w-14 hover:bg-green-800 active:bg-green-200'>Edit</button>
                  <button onClick={toform2} className='bg-red-500 shadow  rounded-lg p-1 w-14 hover:bg-red-800 active:bg-red-200'>Delete</button>
                </div>
              </div> : <div className='mb-32'></div>}

              <div>
                <select id="category"
                  name="category"
                  className="no-select rounded-md border m-2 border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-dark focus:outline-none focus:ring-primary-dark"
                  defaultValue={''}
                  onChange={(e) => handleCardSelection(e.target.value)}
                >
                  <option value="" disabled>
                    List Cards
                  </option>
                  {cards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name}
                    </option>
                  ))}
                </select>

                <button onClick={toform} className='no-select p-1 mt-2 w-full active:bg-orange-500 rounded-xl shadow cursor-pointer bg-[#FEBF2F]'>Create new Card</button>
              </div>


            </article>

          </div></>}
          </>}
        </div>
      </div>
    </form >
  );
}
