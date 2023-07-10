import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CreditCard } from 'lucide-react';

export function Payment({ onPaymentOptionChange }) {
  const [showCreditCardOptions, setShowCreditCardOptions] = useState(false);
  const [selectedCreditCard, setSelectedCreditCard] = useState('');
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCardInfo, setSelectedCardInfo] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');

  useEffect(() => {
    const simulatedData = [
      {
        id: 1,
        user: {
          id: 1,
          name: '',
          email: 'momo@momo.com',
          cpf: '',
          phone: ''
        },
        name: 'card4',
        number: '0000000011110001',
        expiration_month: '02',
        expiration_year: '2023',
        cvc: '123'
      },
      {
        id: 5,
        user: {
          id: 1,
          name: '',
          email: 'momo@momo.com',
          cpf: '',
          phone: ''
        },
        name: 'card3',
        number: '0000000011110101',
        expiration_month: '02',
        expiration_year: '2023',
        cvc: '123'
      }
    ];

    setCreditCards(simulatedData);
  }, []);

  useEffect(() => {
    const selectedCard = creditCards.find((card) => card.name === selectedCreditCard);
    setSelectedCardInfo(selectedCard);
  }, [selectedCreditCard, creditCards]);

  const handlePaymentOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedPaymentOption(selectedOption);

    if (selectedOption === 'card') {
      setShowCreditCardOptions(true);
      setSelectedCreditCard('');
    } else {
      setShowCreditCardOptions(false);
      setSelectedCreditCard('');
    }

    // Chame a função onPaymentOptionChange com os valores selecionados
    onPaymentOptionChange(selectedOption, selectedCardInfo && selectedCardInfo.id);
  };

  const handleCreditCardOptionChange = (event) => {
    setSelectedCreditCard(event.target.value);
    const selectedCard = creditCards.find((card) => card.name === event.target.value);
    setSelectedCardInfo(selectedCard);
    onPaymentOptionChange(selectedPaymentOption, selectedCard && selectedCard.id);
  };

  const handleNewCreditCardClick = () => {
    window.location.href = '/account/cards';
  };

  return (
    <div>
      <div className='flex flex-row flex-wrap gap-5 mb-6'>
        <select
          className="mb-6 p-3 bg-[#FF9730] w-min-full rounded-xl text-start"
          name="payment-option"
          id="payment-option"
          onChange={handlePaymentOptionChange}
        >
          <option value="">Select payment option</option>
          <option value="bank_slip">Bank Slip</option>
          <option value="pix">Pix</option>
          <option value="card">Card</option>
        </select>

        {showCreditCardOptions && (
          <>
            {creditCards.length > 0 ? (
              <select
                className="mb-6 p-3 bg-[#FF9730] w-min-full rounded-xl text-start"
                name="card-option"
                id="card-option"
                value={selectedCreditCard}
                onChange={handleCreditCardOptionChange}
              >
                <option value="">Select a card</option>
                {creditCards.map((card) => (
                  <option key={card.id} value={card.name}>{card.name}</option>
                ))}
              </select>
            ) : (
              <button className="mb-6 p-3 bg-[#FF9730] w-min-full rounded-xl text-start" onClick={handleNewCreditCardClick}>
                Cadastrar novo cartão
              </button>
            )}
          </>
        )}

        {selectedCardInfo && (
          <div className="w-96 fmax-w-lg mx-auto">
            <details className="text-stone-950  bg-zinc-200 hover:open:bg-white open:ring-1 open:ring-black dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
              <summary className=" cursor-pointer text-sm leading-6 text-slate-900 dark:text-black font-semibold select-none">
                {selectedCardInfo.name}
              </summary>
              <div className="mt-3 text-sm leading-6 text-stone-950 dark:text-stone-950">
                <p>Number: {selectedCardInfo.id}</p>
                <p>Card name: {selectedCardInfo.name}</p>
                <p>Number: {selectedCardInfo.number}</p>
                <p>Expiration: {selectedCardInfo.expiration_month}/{selectedCardInfo.expiration_year}</p>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}


// useEffect(() => {
  //   const fetchCards = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/api/cards/', {
  //         headers: {
  //           'X-Company-CNPJ': '00000000000000',
  //           'Authorization': 'Bearer 3a8e363d71ca88ed56a45d931057756f1249381b'
  //         }
  //       });
  //       setCreditCards(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchCards();
  // }, []);
