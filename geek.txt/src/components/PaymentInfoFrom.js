import { Comment, Header, Statistic } from 'semantic-ui-react';
import { useState } from 'react';
import CreditCard from '../components/CreditCard';
import AddCardForm from '../components/AddCardForm';

const PaymentInfoFrom = ({user}) => {
    return (
        <div>
        <h1>My Cards</h1>
        <CreditCard></CreditCard>
        <CreditCard></CreditCard>
        <CreditCard></CreditCard>
        <CreditCard></CreditCard>
        <h1>Add a new card:</h1>
        <AddCardForm user={user}></AddCardForm>
        </div>
        )
}

export default PaymentInfoFrom;