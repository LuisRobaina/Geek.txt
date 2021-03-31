import { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Form, Segment, Message } from 'semantic-ui-react';
import axios from '../config/axios';

const UserLogIn = () => {
  const [errors, setErrors] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      credential: "",
      password: ""
    }
  );

  const handleChange = (e) => {
    setUserInput({ [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    setErrors("");
    e.preventDefault();
    axios.post('/users/login', userInput).then(res => {
      alert("Welcome!")
      setLoggedIn(true)
      console.log(res)
    }).catch((response) => {
      console.log(response)
      setErrors(response)
    });
  }

  return (
    <div>
      {errors.form && <div className="alert alert-danger">{errors.form}</div>}
      {loggedIn && (
      <Message positive>
        <Message.Header>You are in! We missed you</Message.Header>
        <p>
          Go to your <Link to={`/userhome`}><b>Home</b></Link> page to see books.
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
            <Form onSubmit={handleSubmit} >
              <Form.Field>
                <label>GeekID or E-mail</label>
                <input placeholder='GeekID/E-mail' name="credential" value={userInput.credential} onChange={handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type='password'
                  placeholder='Password'
                  name="password"
                  onChange={handleChange}
                  value={userInput.password} />
              </Form.Field>
              <div>
                <Button.Group>
                  <Button positive>Log In!</Button>
                  <Button.Or />
                  <Link to="/register">
                    <Button animated='fade' onClick={() => handleSubmit}>
                      <Button.Content visible>Register for an account</Button.Content>
                      <Button.Content hidden>It is free!</Button.Content>
                    </Button>
                  </Link>
                </Button.Group>
              </div>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
};

export default UserLogIn;