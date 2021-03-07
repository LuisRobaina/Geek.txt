import React from 'react'
import { Grid, Button, Form, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const userRegister = () => {
    
    return (
        <div>
            <Grid centered>
                <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
                    <Segment>
                        <Form>
                            <Form.Field>
                                <label>First Name</label>
                                <input />
                            </Form.Field>

                            <Form.Field>
                                <label>Last Name</label>
                                <input />
                            </Form.Field>
                            <Form.Field>
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
                            </Form.Field>

                            <Form.Field>
                                <label>Geek ID</label>
                                <input placeholder="This is how other Geeks will know you!" />
                            </Form.Field>

                            <Form.Field>
                                <label>Email</label>
                                <input />
                            </Form.Field>

                            <Form.Field>
                                <label>Password</label>
                                <input />
                            </Form.Field>

                            <Form.Field>
                                <label>Confirm  Password</label>
                                <input />
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

export default userRegister;