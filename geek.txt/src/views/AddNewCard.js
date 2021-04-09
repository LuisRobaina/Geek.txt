import { useState, useReducer } from 'react'
import { Grid, Button, Form, Segment, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from '../config/axios';

const AddNewCard = () => {

  const [errors, setErrors] = useState("");
  const [userInput, setUserInput] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      {
        cardName: "",
        nameOnCard: "",
        number: "",
        expYear: "",
        expMonth: "",
        CVV: "",
        address: ""
      }
  );

  const handleChange = (e) => {
      setUserInput({ [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
      setErrors("");
      e.preventDefault();
      axios.post('/users/addcard', userInput).then(res => {
          console.log(res);
      }).catch(({ response }) => setErrors(response.data))
  }


  return (
    <div>
            <Grid centered>
                <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
                    <Segment>
                        {errors && (
                            <Message negative>
                                <Message.Header>{errors}</Message.Header>
                            </Message>
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <label>Credit Card Name</label>
                                <input placeholder="Name your credit card!" name="cardName" value={userInput.cardName} onChange={handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Name on Card</label>
                                <input name="nameOnCard" value={userInput.nameOnCard} onChange={handleChange} />
                            </Form.Field>
                           <Form.Field>
                                <label>Card Number</label>
                                <input name="number" value={userInput.number} onChange={handleChange}/>
                           </Form.Field> 
                            <Form.Field>
                                <label>Expiration Month</label>
                                <input name="expMonth" value={userInput.expMonth} onChange={handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Expiration Year</label>
                                <input placeholder="Put full four-digit year" name="expYear" value={userInput.expYear} onChange={handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>CVV</label>
                                <input name="CVV" value={userInput.CVV} onChange={handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Billing Address</label>
                                <input name="address" value={userInput.address} onChange={handleChange} />
                            </Form.Field>

                            <div>
                                <Button.Group>
                                    <Link to="/profile">
                                        <Button>Back</Button>
                                    </Link>
                                    <Button.Or />
                                    <Button>Add Card</Button>
                                </Button.Group>
                            </div>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
  );
};
 export default AddNewCard;