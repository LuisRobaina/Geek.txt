import { useState, useReducer } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
//import axios from '../config/axios';
//import { Link, useHistory } from "react-router-dom";
//import { getUser, signUp } from "../utils/userService";

const AddCardForm = ({ user }) => {
  const [errors, setErrors] = useState(null);
  //const history = useHistory();
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      cardName: "",
      nameOnCard: "",
      number: "",
      expMonth: "",
      expYear: "",
      CVV: "",
      Address: ""
    }
  );

  const handleChange = (e) => {
    setUserInput({ [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
  };

  return (
    <div>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
          <Segment>
            {errors && (
              <Message negative>
                <Message.Header>Error creating card.</Message.Header>
                {Object.entries(errors).map(([key, value]) => (
                  <li>{value}</li>
                ))}
              </Message>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Card Name</label>
                <input
                  placeholder="Ex. Card1, Moms Card, etc"
                  name="cardName"
                  value={userInput.cardName}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Name on Card</label>
                <input
                  placeholder="Card owner"
                  name="nameOnCard"
                  value={userInput.nameOnCard}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Card Number</label>
                <input
                  name="number"
                  value={userInput.number}
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Expiration Month</label>
                <input
                  placeholder="Month must be a digit eg. 4"
                  name="expMonth"
                  value={userInput.expMonth}
                  onChange={handleChange}
                />
              </Form.Field>


              <Form.Field>
                <label>Expiration Year</label>
                <input
                  placeholder="Card owner"
                  name="password"
                  value={userInput.password}
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>CVV Number</label>
                <input
                  name="CVV"
                  value={userInput.CVV}
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Billing Address</label>
                <input
                  name="Address"
                  value={userInput.Address}
                  onChange={handleChange}
                />
              </Form.Field>

              <div>
                <Button.Group>
                  <Button positive>
                    <Button.Content visible>Add Card</Button.Content>
                    </Button>
                </Button.Group>
              </div>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default AddCardForm;
