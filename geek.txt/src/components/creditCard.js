import { Comment, Header, Statistic } from 'semantic-ui-react';
import { useState } from 'react';

const CreditCard = (props) => {
    return (
        <div>
            <div class="ui cards">
                <div class="card">
                    <div class="content">
                            
                            <div class="header">
                                0000 2121 1212 1212
                            </div>
                            <div class="meta">
                                Aug 25 2021
                            </div>
                            <div class="meta">
                                CVV
                            </div>
                            <div class="description">
                                Full Name...
                            </div>
                            <div class="description">
                                Card Name
                            </div>
                            
                    </div>
                        <div class="extra content">
                            <div class="ui two buttons">
                                <div class="ui basic green button">Edit</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}



export default CreditCard;