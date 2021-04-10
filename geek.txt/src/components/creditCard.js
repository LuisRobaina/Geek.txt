//import { Comment, Header, Statistic } from 'semantic-ui-react';
//import { useState } from 'react';

const CreditCard = ({number, owner, name, expDate, CVV}) => {
    return (
        <div>
            <div class="ui cards">
                <div class="card">
                    <div class="content">
                            <div class="header">
                                {number}
                            </div>
                            <div class="meta">
                                {expDate}
                            </div>
                            <div class="meta">
                                {CVV}
                            </div>
                            <div class="description">
                                {owner}
                            </div>
                            <div class="description">
                                {name}
                            </div>    
                    </div>
                        <div class="extra content">
                            <div class="ui two buttons">
                                <div class="ui basic green button">Edit Card</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}



export default CreditCard;