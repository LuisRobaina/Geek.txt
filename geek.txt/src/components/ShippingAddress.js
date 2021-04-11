import { useState } from 'react';
import EditAddressForm from "./EditAddressForm";

const ShippingAddress = ({ userID, ID, name, street, state, city, zipcode}) => {

    const [editAddress, setEditAddress] = useState(false)

    const handleEditAddress = (e) => {
        setEditAddress(!editAddress)
    }
    return (
        <div>
            <div class="ui cards">
                <div class="card">
                    <div class="content">
                        <div class="header">
                            {name}
                        </div>
                        <div class="meta">
                             {street}
                        </div>
                        <div class="meta">
                            {city}
                        </div>
                        <div class="description">
                            {state}
                        </div>
                        <div class="description">
                            {zipcode}
                        </div>
                    </div>
                    <div class="extra content">
                        <div class="ui two buttons">
                            <div class="ui basic green button" onClick={handleEditAddress}>Edit Address</div>
                        </div>
                    </div>
                </div>
                {
                    editAddress && (
                        <EditAddressForm address={{
                            ID: ID,
                            Name: name,
                            Street: street,
                            City: city,
                            State: state,
                            Zipcode: zipcode
                        }}
                        userID={userID}></EditAddressForm>
                    )
                }
            </div>
        </div>
    )
}
export default ShippingAddress;
