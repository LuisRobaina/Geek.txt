//import { Comment, Header, Statistic } from 'semantic-ui-react';
//import { useState } from 'react';

const CreditCard = (props) => {
    return (
        <div>
            <div class="ui cards">
                <div class="card">
                    <div class="content">
                            
                            <div class="header">
                                0000 2121 1212 1212
                                {//card number
                                }
                            </div>
                            <div class="meta">
                                11 / 2021
                                {//exp month / exp year
                                }
                            </div>
                            <div class="meta">
                                CVV
                                {//CVV num
                                }
                            </div>
                            <div class="description">
                                Full Name...
                                {//Name on Card
                                }
                            </div>
                            <div class="description">
                                Card Name
                                {//cardName
                                }
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