import { useState, useEffect } from 'react';
import CreditCard from '../components/CreditCard';
import AddCardForm from '../components/AddCardForm';
import axios from "../config/axios";

const PaymentInfoForm = ({user}) => {
    const [cards, setCards] = useState([])

    useEffect(() => {
        axios.get(`/users/getCards/${user._id}`)
          .then((res) => {
            setCards(res.data);
        })
          .catch((err) => console.log(err));
      }, []);
    
    const getCards = (cards) => {
        let cardsComponent = cards.map(function (card) {
            return <CreditCard userID={user._id} ID={card._id} address={card.Address} number={card.number} name={card.cardName} owner={card.nameOnCard} expMonth={card.expMonth} expYear={card.expYear} CVV={card.CVV} />;    
        });
        return cardsComponent;
    }
    return (
        <div>
        <h1>My Cards</h1>
        {
            getCards(cards)
        }
        <h1>Add a new card:</h1>
        <AddCardForm user={user}></AddCardForm>
        </div>
    )
}

export default PaymentInfoForm;