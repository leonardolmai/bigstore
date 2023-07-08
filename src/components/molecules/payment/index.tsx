import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Payment() {
  const [showCreditCardOptions, setShowCreditCardOptions] = useState(false);
  const [selectedCreditCard, setSelectedCreditCard] = useState('');
  const [creditCards, setCreditCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/cards/', {
          headers: {
            'X-Company-CNPJ': '00000000000000',
            'Authorization': 'Bearer 3a8e363d71ca88ed56a45d931057756f1249381b'
          }
        });
        setCreditCards(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  const handlePaymentOptionChange = (event) => {
    if (event.target.value === 'credit-card') {
      setShowCreditCardOptions(true);
      setSelectedCreditCard('');
    } else {
      setShowCreditCardOptions(false);
      setSelectedCreditCard('');
    }
  };

  const handleCreditCardOptionChange = (event) => {
    setSelectedCreditCard(event.target.value);
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
          <option value="boleto">Boleto</option>
          <option value="credit-card">Credit Card</option>
        </select>

        {showCreditCardOptions && (
          <>
            {creditCards.length > 0 ? (
              <select
                className="mb-6 p-3 bg-[#FF9730] w-min-full rounded-xl text-start"
                name="credit-card-option"
                id="credit-card-option"
                value={selectedCreditCard}
                onChange={handleCreditCardOptionChange}
              >
                <option value="">Select a credit card</option>
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

        {selectedCreditCard && (
          <p>Selected credit card: {selectedCreditCard}</p>
        )}
      </div>
    </div>
  );
}
