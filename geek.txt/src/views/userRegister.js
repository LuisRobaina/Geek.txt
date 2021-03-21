import { useState, useReducer } from 'react'
import { Grid, Button, Form, Segment, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from '../config/axios';


const UserRegister = () => {
    const [errors, setErrors] = useState("");
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
            geekId: ""
        }
    );

    const handleChange = (e) => {
        setUserInput({ [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        setErrors("");
        e.preventDefault();
        axios.post('/users/add', userInput).then(res => {
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
                                <label>First Name</label>
                                <input name="firstName" value={userInput.firstName} onChange={handleChange} />
                            </Form.Field>

                            <Form.Field>
                                <label>Last Name</label>
                                <input name="lastName" value={userInput.lastName}  />
                            </Form.Field>
                            {/* <Form.Field>
                                <label>Street</label>
                                <input />
                            </Form.Field>

                            <Form.Field>
                                <label>State</label>
                                <input />
                            </Form.Field>

                            <Form.Field>
                                <label>Zip Code</label>
                                <input />
                            </Form.Field> */}

                            <Form.Field>
                                <label>Geek ID</label>
                                <input placeholder="This is how other Geeks will know you!" name="geekId" value={userInput.geekId} onChange={handleChange} />
                            </Form.Field>

                            <Form.Field>
                                <label>Email</label>
                                <input name="email" value={userInput.email} onChange={handleChange} />
                            </Form.Field>

                            <Form.Field>
                                <label>Password</label>
                                <input name="password" value={userInput.password} onChange={handleChange} />
                            </Form.Field>

                            <Form.Field>
                                <label>Confirm  Password</label>
                                <input name="password2" value={userInput.password2} onChange={handleChange} />
                            </Form.Field>

                            <div>
                                <Button.Group>
                                    <Button positive animated='fade'>
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
    )
};

export default UserRegister;