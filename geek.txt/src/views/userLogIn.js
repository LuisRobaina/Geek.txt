import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Form, Segment } from 'semantic-ui-react';
import axios from '../config/axios';

const UserLogIn = () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: ""
    }
  );

  const handleChange = (e) => {
    setUserInput({[e.target.name]: e.target.value})
  }

  const handleClick= (e) => {
    e.preventDefault();
    console.log(userInput)
    axios.post('/users/add', userInput).then(res => console.log(res))
  }

  return (
    <div>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
          <Segment>
            <Form onSubmit={handleClick} >
              <Form.Field>
                <label>GeekID or E-mail</label>
                <input placeholder='GeekID/E-mail' name="email" value={userInput.email} onChange={handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type='password' 
                  placeholder='Password'
                  name="password"
                  onChange={handleChange} 
                  value={userInput.password}/>
              </Form.Field>
              <div>
                <Button.Group>
                  <Button positive>Log In!</Button>
                  <Button.Or />
                  <Link to="/register">
                    <Button animated='fade' onClick={() => handleClick}>
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