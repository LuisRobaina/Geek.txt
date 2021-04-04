import { useState, useReducer } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { getUser, signUp } from "../utils/userService";

const UserRegister = ({ setUser }) => {
  const [errors, setErrors] = useState("");
  const history = useHistory();
  const [registered, setRegistered] = useState(false);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      geekId: "",
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
      setUser(getUser(token));
      history.push("/");
    } catch (err) {
      console.dir(err.response.data);
      //setErrors(err);
    }
  };

  return (
    <div>
      {registered && (
        <Message positive>
          <Message.Header>Welcome! We have created your account</Message.Header>
          <p>
            Now{" "}
            <Link to={`/login`}>
              <b>login</b>
            </Link>{" "}
            with your cretentials. See you around!
          </p>
        </Message>
      )}
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
                  name="geekId"
                  value={userInput.geekId}
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
                />
              </Form.Field>

              <Form.Field>
                <label>Confirm Password</label>
                <input
                  name="password2"
                  value={userInput.password2}
                  onChange={handleChange}
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
