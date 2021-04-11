import { useState } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import axios from '../config/axios';
import { Link } from "react-router-dom";
import { signOut } from "../utils/userService";


const UserInfoForm = ({ user, setUser }) => {

  const handleLogOut = () => {
    signOut();
    setUser(null);
  };

  const [errors, setErrors] = useState(null);
  const [alert, setAlert] = useState(null);
  const [firstName, setFirstName] = useState(user ? user.firstName : "")
  const [lastName, setLastName] = useState(user ? user.lastName : "")
  const [geekID, setGeekID] = useState(user ? user.geekID : "")
  const [email, setEmail] = useState(user ? user.email : "")
  const [oldpass, setOldPass] = useState("")
  const [newpass, setNewPass] = useState("")

  const handleChangeOldPass = (e) => {
    e.preventDefault()
    setOldPass(e.target.value)
  }
  const handleChangeNewPass = (e) => {
    e.preventDefault()
    setNewPass(e.target.value)
  }

  const handleChangeFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };

  const handleChangePassword = () => {
    setErrors("");
    setAlert("");

    const postObj = {
      userID: user._id,
      oldpassword: oldpass,
      newpassword: newpass
    }
    axios.post('/users/editpassword', postObj)
      .then((res) => {
        console.log(res)
        setAlert(res.data)
        handleLogOut()
      })
      .catch((err) => {
        console.log(err)
        setErrors("Error updating profile.")
      })
  }
  const handleSubmit = () => {
    setErrors("");
    setAlert("");

    const postObj = {
      Owner: user._id,
      geekID,
      firstName,
      lastName,
      email
    }
    axios.post('/users/editprofile', postObj)
      .then((res) => {
        console.log(res)
        setAlert(res.data)
        handleLogOut()

      })
      .catch((err) => {
        console.log(err)
        setErrors("Error updating profile.")
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


  return (
    <div>

      {alert && (
        <Segment>
          <Message positive>
            <Message.Header>Updated profile.</Message.Header>
            <p>You must <Link to="/login"><b>log in</b></Link> again to get the changes</p>
          </Message>
        </Segment>
      )}

      <h1>Account Info</h1>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
          <Segment>
            {errors && (
              <Message negative>
                <Message.Header>Error updating user.</Message.Header>
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
          <h1>Change Password</h1>
          <Segment centered>
            {errors && (
              <Message negative>
                <Message.Header>Error updating password.</Message.Header>
              </Message>
            )}
            <Form>
              <Form.Field>
                <label>Current Password</label>
                <input
                  name="oldpass"
                  value={oldpass}
                  onChange={handleChangeOldPass}
                  type="password"
                />
              </Form.Field>
              <Form.Field>
                <label>New Password</label>
                <input
                  name="newpass"
                  value={newpass}
                  onChange={handleChangeNewPass}
                  type="password"
                />
              </Form.Field><div>
                <Button.Group >
                  <Button animated="fade" onClick={handleChangePassword}>
                    <Button.Content visible>Change Password</Button.Content>
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
