import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Icon, Checkbox, Form, Segment } from 'semantic-ui-react'

const userLogIn = () => {
  return (
    <div>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
          <Segment>
            <Form>
              <Form.Field>
                <label>GeekID or E-mail</label>
                <input placeholder='GeekID/E-mail' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type='password' placeholder='Password' />
              </Form.Field>
              <div>
                <Button.Group>
                  <Button positive>Log In!</Button>
                  <Button.Or />
                  <Link to="/register">
                    <Button animated='fade'>
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

export default userLogIn;