import { useState, useReducer } from 'react'
import { Grid, Button, Form, Segment, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from '../config/axios';

const AddNewAddress = () => {

  const [errors, setErrors] = useState("");
  const [userInput, setUserInput] = useReducer(
      (state, newState) => ({ ...state, ...newState }),
      {
        addressName: "",
        street: "",
        state: "",
        city: "",
        zipcode: ""
      }
  );

  const handleChange = (e) => {
      setUserInput({ [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
      setErrors("");
      e.preventDefault();
      axios.post('/users/addaddress', userInput).then(res => {
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
                                <label>Address Name</label>
                                <input placeholder="Name your address!" name="addressName" value={userInput.addressName} onChange={handleChange} />
                            </Form.Field>

                            <Form.Field>
                                <label>Street</label>
                                <input name="street" value={userInput.street} onChange={handleChange} />
                            </Form.Field>
                           <Form.Field>
                                <label>City</label>
                                <input name="city" value={userInput.city} onChange={handleChange}/>
                           </Form.Field> 

                            <Form.Field>
                                <label>State</label>
                                <input name="state" value={userInput.state} onChange={handleChange} />
                            </Form.Field>

                            <Form.Field>
                                <label>Zipcode</label>
                                <input name="zipcode" value={userInput.zipcode} onChange={handleChange} />
                            </Form.Field>

                            <div>
                                <Button.Group>
                                    <Link to="/profile">
                                        <Button>Back</Button>
                                    </Link>
                                    <Button.Or />
                                    <Button>Add Address</Button>
                                </Button.Group>
                            </div>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
  );
};
 export default AddNewAddress;