import { useState, useReducer } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";

const UserInfoForm = ({ user }) => {

  const [errors, setErrors] = useState(null);
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [geekID, setgeekID] = useState(user.geekID)

  const handleChangeFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  return (
    <div>
      <h1>Account Info</h1>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
          <Segment>
            {errors && (
              <Message negative>
                <Message.Header>Error updating user.</Message.Header>
                {Object.entries(errors).map(([key, value]) => (
                  <li>{value}</li>
                ))}
              </Message>
            )}
            <Form>
              <Form.Field>
                <label>First Name</label>
                <input
                  name="firstName"
                  value={firstName}
                  onChange={handleChangeFirstName}
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={lastName}
                  onChange={handleChangeLastName}
                />
              </Form.Field>
              {/* <Form.Field>
                <label>Geek ID</label>
                <input
                  placeholder="This is how other Geeks will know you!"
                  name="geekID"
                  value={user.geekID}
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Email</label>
                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Form.Field> */}
              {/* <Form.Field>
                <label>Password</label>
                <input
                  name="password"
                  value={}
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
              </Form.Field> */}

              <div>
                <Button.Group>
                  <Button positive animated="fade">
                    <Button.Content visible>Update Profile</Button.Content>
                    <Button.Content hidden>Things change!</Button.Content>
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

export default UserInfoForm;
