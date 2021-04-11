import { useState } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import axios from '../config/axios';

const AddCardForm = ({ user }) => {

  const [errors, setErrors] = useState("");
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [owner, setCardOwner] = useState("")
  const [cardExpMonth, setCardMonth] = useState("")
  const [cardExpYear, setCardYear] = useState("")
  const [cardCVV, setCardCVV] = useState("")
  const [cardAddress, setCardAddress] = useState("")

  const handleAddCard = () => {
    const postObj = {
      cardOwner: user._id,
      cardName: cardName,
      nameOnCard: owner,
      number: cardNumber,
      expYear: cardExpYear,
      expMonth: cardExpMonth,
      CVV: cardCVV,
      address: cardAddress
    }
    
    axios.post(`/users/addcard/`, postObj).then(res => {
      window.location.reload()
    })
      .catch(err => {
        console.log(err)
        setErrors(String(err))
      })
  };
  const handleNameChange = (e) => {
    e.preventDefault()
    setCardName(e.target.value)
  }
  const handleNumberChange = (e) => {
    e.preventDefault()
    setCardNumber(e.target.value)
  }
  const handleOwnerChange = (e) => {
    e.preventDefault()
    setCardOwner(e.target.value)
  }
  const handleMonthChange = (e) => {
    e.preventDefault()
    setCardMonth(e.target.value)
  }
  const handleYearChange = (e) => {
    e.preventDefault()
    setCardYear(e.target.value)
  }
  const handleCVVChange = (e) => {
    e.preventDefault()
    setCardCVV(e.target.value)
  }
  const handleChangeAddress = (e) => {
    e.preventDefault()
    setCardAddress(e.target.value)
  }
  return (
    <div>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, margin: 20 }}>
          <Segment>
            {errors && (
              <Message negative>
                <Message.Header>Error adding card, check your inputs.</Message.Header>
              </Message>
            )}
            <Form>
              <Form.Field>
                <label>Card Name</label>
                <input
                  placeholder="Ex. Card1, Moms Card, etc"
                  name="cardName"
                  value={cardName}
                  onChange={handleNameChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Name on Card</label>
                <input
                  placeholder="Card owner"
                  name="nameOnCard"
                  value={owner}
                  onChange={handleOwnerChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Card Number</label>
                <input
                  name="number"
                  value={cardNumber}
                  onChange={handleNumberChange}
                />
              </Form.Field>

              <Form.Field>
                <label>Expiration Month</label>
                <input
                  placeholder="Month must be a digit eg. 4"
                  name="expMonth"
                  value={cardExpMonth}
                  onChange={handleMonthChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Expiration Year</label>
                <input
                  placeholder="Card owner"
                  name="expYear"
                  value={cardExpYear}
                  onChange={handleYearChange}
                />
              </Form.Field>

              <Form.Field>
                <label>CVV Number</label>
                <input
                  name="CVV"
                  value={cardCVV}
                  onChange={handleCVVChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Billing Address</label>
                <input
                  name="Address"
                  value={cardAddress}
                  onChange={handleChangeAddress}
                />
              </Form.Field>
              <div>
                <Button.Group>
                  <Button positive onClick={handleAddCard}>
                    <Button.Content visible >Add Card</Button.Content>
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

export default AddCardForm;
