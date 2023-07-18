import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api'
import { setCookie, getCookie } from 'cookies-next'
import { ProductImage } from '@/types/product'; // Certifique-se de importar corretamente a interface ProductImage
import Modal from 'react-modal';

export default function Formulario({ screens }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
          },
          content: {
            width: '300px',
            height: '75px',
            margin: 'auto',
            display: 'flex',
            fontWeight: '700',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '14px',
            background: 'green',
            outline: 'none',
          },
        }}

        onClick={() => setIsModalOpen(false)}
      >
        Cadastro do produto concluído.
      </Modal>

      <div className="flex flex-col  items-start">
        <div className={`gap-6 flex ${screens.isSmallScreen === true ? "flex-row" : "flex-col"}  justify-center items-center`}>
          <div className="flex flex-col w-48">
            <label className="font-bold" htmlFor="name">
              Title:
            </label>
            <input
              className="border-[#B1B1B1] border-2 focus:outline-[#FEBD2F] rounded-lg"
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className={`flex flex-col  ${screens.isSmallScreen === true ? "" : "items-center"}`}>
            <label className="font-bold" htmlFor="images">
              Photo List:
            </label>
            <div>
              <input type="file" id="images" accept="image/*" className={`flex flex-col  ${screens.isSmallScreen === true ? "w-60" : "w-[150px]"}`} multiple onChange={handleFileChange} />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-36">
          <label className="font-bold" htmlFor="description">
            Text:
          </label>
          <textarea
            className={`resize-none border-[#B1B1B1] ${formInput} border-2 focus:outline-[#FEBD2F] rounded-lg`}
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>

        <div className={`flex  ${screens.isSmallScreen === true ? "flex-row" : "flex-col"} items-center gap-6`}>
          <div className="flex flex-col w-36">
            <label className="font-bold" htmlFor="quantity">
              Quantity:
            </label>
            <input
              className="border-[#B1B1B1] border-2 focus:outline-[#FEBD2F] rounded-lg"
              type="number"
              id="quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold" htmlFor="price">
              Price:
            </label>
            <input
              className="border-[#B1B1B1] border-2 focus:outline-[#FEBD2F] rounded-lg"
              type="number"
              step="0.01"
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold" htmlFor="category">
              Category:
            </label>
            <select
              className="border-[#B1B1B1] border-2 focus:outline-[#FEBD2F] rounded-lg"
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
              <option value="health_beauty">Health Beauty</option>
              <option value="sports_outdoors">Sports Outdoors</option>
              <option value="books_movies_music">Books, Movies & Music</option>
              <option value="toys_games">Toys & Games</option>
              <option value="furniture_home_decor">Furniture Home Decor</option>
              <option value="office_supplies">Office Supplies</option>
            </select>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center self-center m-2">
          <button className="p-1 pl-2 pr-2 bg-green-300 text-green-950 text-xl rounded-3xl" type="submit">
            Send
          </button>
        </div>
      </div>
    </form >
  );
}
