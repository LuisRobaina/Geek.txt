import { useState} from "react"; 
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import axios from '../config/axios';

const UserInfoForm = ({ user }) => {

  const [errors, setErrors] = useState(null);
  const [alert, setAlert] = useState(null); 
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [geekID, setGeekID] = useState(user.geekID)
  const [email, setEmail] = useState(user.email)
  const [password1, setPass1] = useState(user.password)
  const [password2, setPass2] = useState(user.password)

  const handleChangeFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };
  const handleChangePass1 = (e) => {
    e.preventDefault();
    setPass1(e.target.value);
  }
  const handleChangePass2 = (e) => {
    e.preventDefault();
    setPass2(e.target.value);
  }
  const handleSubmit = () => {
    console.log("submit")
    setErrors("");
    setAlert("");

    const postObj = {
        Owner: user._id,
        geekID,
        firstName,
        lastName,
        email,
        password: "ABCD",
        password2: "ABCD"
    }
    axios.post('/users/editprofile', postObj)
    .then((res) => {
        console.log(res)
        setAlert(res.data)
    })
    .catch((err) => {
      console.log(err)
      setErrors(err.data.errors)
    })

  };
  const handleChangeLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  const handleChangeGeekID = (e) => {
    e.preventDefault();
    setGeekID(e.target.value);
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  //need to be able to update password but not show it on frontend

  return (
    <div>
      {alert && (
              <Message negative>
                <Message.Header>Update profile.</Message.Header>
                <p>{alert}</p>
              </Message>
      )}
      <h1>Account Info</h1>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
          <Segment>
            {errors && (
              <Message negative>
                <Message.Header>Error updating user.</Message.Header>
                {errors}
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
               <Form.Field>
                <label>Geek ID</label>
                <input
                  placeholder="This is how other Geeks will know you!"
                  name="geekID"
                  value={geekID}
                  onChange={handleChangeGeekID}
                />
              </Form.Field>

              <Form.Field>
                <label>Email</label>
                <input
                  name="email"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </Form.Field> 

              <Form.Field>
                <label>Password</label>
                <input
                  name="password"
                  value={password1}
                  onChange={handleChangePass1}
                  type="password"
                />
              </Form.Field>

              <Form.Field>
                <label>Confirm Password</label>
                <input
                  name="password2"
                  value={password2}
                  onChange={handleChangePass2}
                  type="password"
                />
              </Form.Field>

              <div>
                <Button.Group >
                  <Button positive animated="fade" onClick={handleSubmit}>
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
