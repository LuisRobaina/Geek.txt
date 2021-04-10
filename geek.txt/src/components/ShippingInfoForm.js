//import { Comment, Header, Statistic } from 'semantic-ui-react';
//import { useState } from 'react';
import ShippingAddress from './ShippingAddress';
import AddAddressForm from './AddAddressForm';

const ShippingInfoForm = ({user}) => {
    return (
        <div>
        <h1>My Cards</h1>
        {//loop through all address instances, and call addcardform for each specific address
        }
        <ShippingAddress></ShippingAddress>
        <ShippingAddress></ShippingAddress>
        <ShippingAddress></ShippingAddress>
        <ShippingAddress></ShippingAddress>
        <h1>Add a new address:</h1>
        <AddAddressForm user={user}></AddAddressForm>
        </div>
        )
}

export default ShippingInfoForm;