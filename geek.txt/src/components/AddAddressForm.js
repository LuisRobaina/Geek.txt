import { useState, useReducer } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
//import axios from '../config/axios';
//import { Link, useHistory } from "react-router-dom";
//import { getUser, signUp } from "../utils/userService";

const AddAddressForm = ({ user }) => {
  const [errors, setErrors] = useState(null);
  //const history = useHistory();
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
                <label>Address Name</label>
                <input
                  placeholder="Ex. Address1, Moms Address, etc"
                  name="addressName"
                  value={userInput.addressName}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Street</label>
                <input
                  name="street"
                  value={userInput.street}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>City</label>
                <input
                  name="city"
                  value={userInput.city}
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>State</label>
                <input
                  name="state"
                  value={userInput.state}
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Zipcode</label>
                <input
                  name="zipcode"
                  value={userInput.zipcode}
                  onChange={handleChange}
                />
              </Form.Field>

              <div>
                <Button.Group>
                  <Button positive>
                    <Button.Content visible>Add Address</Button.Content>
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

export default AddAddressForm;