import {useState} from 'react'
import {Segment, Message, Button } from 'semantic-ui-react';
import UserInfoForm from '../components/UserInfoForm';
import PaymentInfoFrom from '../components/PaymentInfoForm';

const UserProfilePage = ({ user }) => {
    const [userInfo, setUserInfo] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState(false);
    const [shippingInfo, setShippingInfo] = useState(false);
    const [booksInfo, setBooksInfo] = useState(false);
    
    const handleChangeUserInfo = (e) => {
        console.log(user)
        e.preventDefault();
        setUserInfo(!userInfo)
        setPaymentInfo(false)
        setShippingInfo(false)
        setBooksInfo(false)
    };
    const handleChangePaymentInfo = (e) => {
        e.preventDefault();
        setPaymentInfo(!paymentInfo)
        setUserInfo(false)
        setShippingInfo(false)
        setBooksInfo(false)
    };
    const handleChangeShippingInfo = (e) => {
        e.preventDefault();
        setShippingInfo(!shippingInfo)
        setUserInfo(false)
        setPaymentInfo(false)
        setBooksInfo(false)
    };
    const handleChangeBooksInfo = (e) => {
        e.preventDefault();
        setBooksInfo(!booksInfo)
        setUserInfo(false)
        setPaymentInfo(false)
        setShippingInfo(false)
    };

    return (
        <Segment>
        {user && (
        <Message positive>
          <Message.Header>{user.geekID + "'s Account"}</Message.Header>
        </Message>
        )}
        <div class="ui grid">
            <div class="four wide column">
                <div class="ui vertical fluid tabular menu">
                    <Button onClick={handleChangeUserInfo}>
                        User Info                 
                    </Button>
                    <Button onClick={handleChangePaymentInfo}>
                        Payment
                    </Button>
                    <Button onClick={handleChangeShippingInfo}>
                        Shipping
                    </Button>
                    <Button onClick={handleChangeBooksInfo}>
                        My Books
                    </Button>
                </div>
            </div>
            <div class="twelve wide stretched column">
                <div class="ui segment">
                    {userInfo && ( <UserInfoForm user={user}></UserInfoForm>)}
                    {paymentInfo && (<PaymentInfoFrom></PaymentInfoFrom>)}
                </div>
            </div>
        </div>
        </Segment>
    );
};

export default UserProfilePage;