import { useState } from "react";
import { Grid, Button, Form, Segment, Message } from "semantic-ui-react";
import axios from '../config/axios';

const EditCardForm = ({ userID, card }) => {

  const [errors, setErrors] = useState(null);
  const [cardName, setCardName] = useState(card.Name)
  const [cardNumber, setCardNumber] = useState(card.Number)
  const [owner, setCardOwner] = useState(card.Owner)
  const [cardExpMonth, setCardMonth] = useState(card.ExpMonth)
  const [cardExpYear, setCardYear] = useState(card.ExpYear)
  const [cardCVV, setCardCVV] = useState(card.CVV)
  const [cardAddress, setCardAddress] = useState(card.Address)

  const handleUpdateCard = () => {
    const postObj = {
      Owner: userID,
      cardID: card.ID,
      cardName: cardName,
      nameOnCard: owner,
      number: cardNumber,
      expYear: cardExpYear,
      expMonth: cardExpMonth,
      CVV: cardCVV,
      address: cardAddress
    }
    
    axios.post(`/users/editcard/`, postObj).then(res => {
      window.location.reload()
    })
      .catch(err => console.log(err))
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
                <Message.Header>Error editing card.</Message.Header>
                {Object.entries(errors).map(([key, value]) => (
                  <li>{value}</li>
                ))}
              </Message>
            )}
            <Form>
              <Form.Field>
                <label>Card Name</label>
                <input
                  placeholder="Ex. Card1, etc"
                  name="cardName"
                  value={cardName}
                  onChange={handleNameChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Name on Card</label>
                <input
                  placeholder="Card Owner"
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
                  placeholder="4 digit year"
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
                  <Button onClick={handleUpdateCard}>
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

export default EditCardForm;
