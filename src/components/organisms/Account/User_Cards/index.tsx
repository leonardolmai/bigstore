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
        <div className={`gap-6 flex ${screens.isSmallScreen === true ? "flex-row" : "flex-col"}  justify-center items-center`}>
          <div className="flex flex-col w-48">
            <article className='flex flex-col items-center gap-6'>
              <div className={`flex  ${aligncard} gap-2`}>
                <div className='bg-gradient-to-r from-purple-600 to-blue-600 text-white w-[250px]  h-[130px] ml-10  p-2 items-start rounded-xl shadow shadow-black'>
                  <p className='mt-1 mb-1'>Name: N N. N. N. </p>
                  <p className='mt-1 mb-1'>Number: XXXX XXXX XXXX XXXX </p>
                  <p className='mt-1 mb-1'>Validate: xx/xx</p>
                  <p className='mt-1 mb-1'>CVC: ***</p>
                </div>
                <div className={`flex ${alignbutton}  gap-3   justify-center ml-2 items-center`}>
                  <button className='bg-green-400 shadow rounded-lg p-1 w-14 hover:bg-green-800 active:bg-green-200'>Edit</button>
                  <button className='bg-red-500 shadow  rounded-lg p-1 w-14 hover:bg-red-800 active:bg-red-200'>Delete</button>
                </div>
              </div>
              <div>
                <select id="category"
                  name="category"
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-primary-dark focus:outline-none focus:ring-primary-dark"
                  defaultValue={''}
                >
                  <option value="" disabled>
                    List Cards
                  </option>

                  <option value="Card 1">Card 1</option>
                  <option value="Card 2">Card 2</option>

                </select>
              </div>


            </article>

          </div>
        </div>
      </div>
    </form >
  );
}
