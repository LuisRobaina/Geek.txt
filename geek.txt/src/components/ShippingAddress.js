//import { Comment, Header, Statistic } from 'semantic-ui-react';
//import { useState } from 'react';

const ShippingAddress = (props) => {
    return (
        <div>
            <div class="ui cards">
                <div class="card">
                    <div class="content">
                            
                            <div class="header">
                                Address 1
                                {//Address Name
                                }
                            </div>
                            <div class="meta">
                                10555 West Flagler Street
                                {//exp month / exp year
                                }
                            </div>
                            <div class="meta">
                                Miami, FL
                                {//city, state
                                }
                            </div>
                            <div class="description">
                                33174
                                {//zipcode
                                }
                            </div>
                            
                    </div>
                        <div class="extra content">
                            <div class="ui two buttons">
                                <div class="ui basic green button">Edit Address</div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}




export default ShippingAddress;