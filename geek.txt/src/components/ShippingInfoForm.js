import { useState, useEffect } from 'react';
import ShippingAddress from '../components/ShippingAddress';
import AddAddressForm from '../components/AddAddressForm';
import axios from "../config/axios";

const ShippingInfoForm = ({user}) => {
    const [addresses, setAddresses] = useState([])

    useEffect(() => {
        axios.get(`/users/getAddresses/${user._id}`)
          .then((res) => {
            setAddresses(res.data);
        })
          .catch((err) => console.log(err));
      }, []);
    
    const getAddresses = (addresses) => {
        let addressesComponent = addresses.map(function (address) {
            return <ShippingAddress userID={user._id} ID={address._id} name={address.addressName} street={address.street} state={address.state} city={address.city} zipcode={address.zipcode} />;    
        });
        return addressesComponent;
    }
    return (
        <div>
        <h1>My Addresses</h1>
        {
            getAddresses(addresses)
        }
        <h1>Add a new address:</h1>
        <AddAddressForm user={user}></AddAddressForm>
        </div>
    )
}

export default ShippingInfoForm;