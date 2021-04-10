import { useState, useReducer } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { getUser, signUp } from "../utils/userService";

const AddCardForm = ({ user }) => {
  const [errors, setErrors] = useState(null);
  const history = useHistory();
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      geekID: "",
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
                <Message.Header>Error creating user.</Message.Header>
                {Object.entries(errors).map(([key, value]) => (
                  <li>{value}</li>
                ))}
              </Message>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>First Name</label>
                <input
                  name="firstName"
                  value={userInput.firstName}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={userInput.lastName}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Geek ID</label>
                <input
                  placeholder="This is how other Geeks will know you!"
                  name="geekID"
                  value={userInput.geekID}
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Email</label>
                <input
                  name="email"
                  value={userInput.email}
                  onChange={handleChange}
                />
              </Form.Field>


              <Form.Field>
                <label>Password</label>
                <input
                  name="password"
                  value={userInput.password}
                  onChange={handleChange}
                  type="password"
                />
              </Form.Field>

              <Form.Field>
                <label>Confirm Password</label>
                <input
                  name="password2"
                  value={userInput.password2}
                  onChange={handleChange}
                  type="password"
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
