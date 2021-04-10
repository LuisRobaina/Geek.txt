//import { Comment, Header, Statistic } from 'semantic-ui-react';
//import { useState } from 'react';
import CreditCard from '../components/CreditCard';
import AddCardForm from '../components/AddCardForm';

const PaymentInfoForm = ({user, cards}) => {

    const getCards = () => {
        console.log(user)
        let cardsComponent = cards.map(function (card) {
            return <CreditCard name={card.cardName} owner={card.nameOnCard} expDate={card.expDate} CVV={card.CVV} />;    
        });
        return cardsComponent;
    }
    return (
        <div>
        <h1>My Cards</h1>
        {
            getCards()
        }
        <h1>Add a new card:</h1>
        <AddCardForm user={user}></AddCardForm>
        </div>
    )
}

export default PaymentInfoForm;