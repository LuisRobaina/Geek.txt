import { useState } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import axios from '../config/axios';

const AddAddressForm = ({ user }) => {

  const [errors, setErrors] = useState(false);
  const [addressName, setName] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipcode, setZip] = useState("")
  
  const handleAddCard = () => {
    const postObj = {
      addressOwner: user._id,
      addressName: addressName,
      street,
      state,
      city,
      zipcode
    }
    
    axios.post(`/users/addaddress/`, postObj).then(res => {
      window.location.reload()
    })
      .catch(err => {
        console.log(err)
        setErrors(true)
      })
  };
  const handleAddressNameChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }
  const handleStreetChange = (e) => {
    e.preventDefault()
    setStreet(e.target.value)
  }
  const handleStateChange = (e) => {
    e.preventDefault()
    setState(e.target.value)
  }
  const handleCityChange = (e) => {
    e.preventDefault()
    setCity(e.target.value)
  }
  const handleZipChange = (e) => {
    e.preventDefault()
    setZip(e.target.value)
  }
  return (
    <div>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
          <Segment>
            {errors && (
              <Message negative>
                <Message.Header>Error adding address, check your inputs.</Message.Header>
              </Message>
            )}
            <Form>
              <Form.Field>
                <label>Address Name</label>
                <input
                  placeholder="Ex. Card1, Moms Card, etc"
                  name="addressName"
                  value={addressName}
                  onChange={handleAddressNameChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Street</label>
                <input
                  placeholder="Card owner"
                  name="addressStreet"
                  value={street}
                  onChange={handleStreetChange}
                />
              </Form.Field>
              <Form.Field>
                <label>City</label>
                <input
                  name="city"
                  value={city}
                  onChange={handleCityChange}
                />
              </Form.Field>

              <Form.Field>
                <label>State</label>
                <input
                  placeholder="Month must be a digit eg. 4"
                  name="state"
                  value={state}
                  onChange={handleStateChange}
                />
              </Form.Field>
              <Form.Field>
                <label>zipcode</label>
                <input
                  placeholder="Card owner"
                  name="zipcode"
                  value={zipcode}
                  onChange={handleZipChange}
                />
              </Form.Field>
              <div>
                <Button.Group>
                  <Button positive onClick={handleAddCard}>
                    <Button.Content visible >Add Address</Button.Content>
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

export default AddAddressForm;
