import { useState } from 'react';
import EditCardForm from "./EditCardForm";

const CreditCard = ({ userID, ID, number, owner, name, expMonth, expYear, CVV, address }) => {

    const [editCard, setEditCard] = useState(false)

    const handleEditCard = (e) => {
        setEditCard(!editCard)
    }
    return (
        <div>
            <div class="ui cards">
                <div class="card">
                    <div class="content">
                        <div class="header">
                            {number}
                        </div>
                        <div class="meta">
                            Exp. Date: {expMonth}/{expYear}
                        </div>
                        <div class="meta">
                            CVV: {CVV}
                        </div>
                        <div class="description">
                            {owner}
                        </div>
                        <div class="description">
                            {name}
                        </div>
                        <div class="description">
                            Billing Address: {address}
                        </div>

                    </div>
                    <div class="extra content">
                        <div class="ui two buttons">
                            <div class="ui basic green button" onClick={handleEditCard}>Edit Card</div>
                        </div>
                    </div>
                </div>
                {
                    editCard && (
                        <EditCardForm card={{
                            ID: ID,
                            Number: number,
                            Owner: owner,
                            Name: name,
                            ExpMonth: expMonth,
                            ExpYear: expYear,
                            CVV: CVV,
                            Address: address
                        }}
                        userID={userID}></EditCardForm>
                    )
                }
            </div>
        </div>
    )
}



export default CreditCard;
