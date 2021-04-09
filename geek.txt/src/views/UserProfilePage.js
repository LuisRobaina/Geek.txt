//import { useState} from 'react'
import { Link } from 'react-router-dom';
import { Header, Divider, Segment, Button, Grid } from 'semantic-ui-react';


const UserProfilePage = () => {

    return (
        <div>
            <Segment raised textAlign='center'>
            <Header size='huge'>Account Overview</Header>
            <Header size='large'>User Profile</Header>
            </Segment>

            <Grid columns='two' divided>
            <Grid.Column>
            <Segment.Group>
            <Segment vertical textAlign='center'><Header size='medium'>User: Fname Lname</Header></Segment>
            <Segment vertical textAlign='center'><Header size='medium'>Email: Fname Lname</Header></Segment>
            <Segment vertical textAlign='center'><Header size='medium'>GeekID: Fname Lname</Header></Segment>
            <Segment vertical textAlign='center'><Header size='medium'>Nickname: Fname Lname</Header></Segment>
            </Segment.Group>
            </Grid.Column>

            <Grid.Column>
            <Segment.Group>
            <Segment vertical textAlign='center'><Header size='medium'>Credit Cards: List?</Header></Segment>
            <Segment vertical textAlign='center'><Header size='medium'>Addresses: List?</Header></Segment>
            </Segment.Group>
            </Grid.Column>
            </Grid>

            <Divider horizontal>Options</Divider>

            <Segment basic textAlign='center'>
                <Button.Group>
                    <Link to="/addcard">
                    <Button>Add Credit Card</Button>
                    </Link>
                    <Button.Or />
                    <Link to="/addaddress">
                    <Button>Add Address</Button>
                    </Link>
                    <Button.Or />
                    <Link to="/editprofile">
                    <Button>Edit Profile</Button>
                    </Link>
                    <Button.Or />
                    <Link to="/editcards">
                    <Button>Edit Credit Cards</Button>
                    </Link>
                    <Button.Or />
                    <Link to="/editaddresses">
                    <Button>Edit Addresses</Button>
                    </Link>
                </Button.Group>
            </Segment>

        </div>
      );
};

export default UserProfilePage;