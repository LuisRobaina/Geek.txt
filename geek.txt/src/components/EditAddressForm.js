import { useState } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import axios from '../config/axios';

const EditAddressForm = ({ userID, address }) => { //do i need userID?
  
  //userID????

  const [errors, setErrors] = useState(null);
  //const [owner, setAddressOwner] = useState(address.Owner) //do i need????
  const [addressName, setAddressName] = useState(address.Name)
  const [addressStreet, setAddressStreet] = useState(address.Street)
  const [addressCity, setAddressCity] = useState(address.City)
  const [addressState, setAddressState] = useState(address.State)
  const [addressZipcode, setAddressZipcode] = useState(address.Zipcode)

  const handleUpdateAddress = () => {
    console.log("UPDATE")

    const postObj = {
      //Owner: userID,
      addressID: address.ID,
      addressName: addressName,
      street: addressStreet,
      city: addressCity,
      state: addressState,
      zipcode: addressZipcode
    }
    
    axios.post(`/users/editaddress/`, postObj).then(res => {
      console.log(res)
    })
      .catch(err => console.log(err))
  };
  //const handleOwnerChange = (e) => {
    //e.preventDefault()
    //setAddressOwner(e.target.value)
  //}
  const handleNameChange = (e) => {
    e.preventDefault()
    setAddressName(e.target.value)
  }
  const handleStreetChange = (e) => {
    e.preventDefault()
    setAddressStreet(e.target.value)
  }
  const handleCityChange = (e) => {
    e.preventDefault()
    setAddressCity(e.target.value)
  }
  const handleStateChange = (e) => {
    e.preventDefault()
    setAddressState(e.target.value)
  }
  const handleZipcodeChange = (e) => {
    e.preventDefault()
    setAddressZipcode(e.target.value)
  }

  return (
    <div>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
          <Segment>
            {errors && (
              <Message negative>
                <Message.Header>Error editing address.</Message.Header>
                {Object.entries(errors).map(([key, value]) => (
                  <li>{value}</li>
                ))}
              </Message>
            )}
            <Form>
              <Form.Field>
                <label>Address Name</label>
                <input
                  placeholder="Ex. Address1, etc"
                  name="addressName"
                  value={addressName}
                  onChange={handleNameChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Street</label>
                <input
                  name="street"
                  value={addressStreet}
                  onChange={handleStreetChange}
                />
              </Form.Field>
              <Form.Field>
                <label>City</label>
                <input
                  name="city"
                  value={addressCity}
                  onChange={handleCityChange}
                />
              </Form.Field>

              <Form.Field>
                <label>State</label>
                <input
                  placeholder="State Abbreviation"
                  name="state"
                  value={addressState}
                  onChange={handleStateChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Zipcode</label>
                <input
                  placeholder="5 digit area code"
                  name="zipcode"
                  value={addressZipcode}
                  onChange={handleZipcodeChange}
                />
              </Form.Field>
              <div>
                <Button.Group>
                  <Button onClick={handleUpdateAddress}>
                    <Button.Content visible >Update Card</Button.Content>
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

export default EditAddressForm;
