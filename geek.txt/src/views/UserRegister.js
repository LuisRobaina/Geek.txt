import { useState, useReducer } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { getUser, signUp } from "../utils/userService";

const UserRegister = ({ setUser }) => {
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
    try {
      const token = await signUp(userInput);
      console.log(token.errors);
      if (token.errors) {
        setErrors(token.errors);
      } else {
        setUser(getUser(token));
        history.push("/");
      }
      console.log(token);
    } catch (err) {
      if (err.response.data.errors) {
        setErrors(err.response.data);
      }
      console.dir(err);
    }
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
                  <Button positive animated="fade">
                    <Button.Content visible>Register</Button.Content>
                    <Button.Content hidden>Welcome!</Button.Content>
                  </Button>
                  <Button.Or />
                  <Link to="/login">
                    <Button>Back to Login</Button>
                  </Link>
                </Button.Group>
              </div>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default UserRegister;
