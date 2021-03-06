import { Link } from 'react-router-dom';
import {useState} from 'react'
import { Button, Menu, Segment } from 'semantic-ui-react'
import {userProfile} from './userProfile';

const NavBar = () => {
    const [active, setActive] = useState("home")
    return(
        <Segment>
            <Menu secondary size="large">
                <Link to="/">
                    <Menu.Item name="Geek Text, Your Geeky Book Store"/>
                </Link>
                <Link to="/login">
                    <Button positive>Login or Register</Button>
                </Link>
                <userProfile />
            </Menu>
        </Segment>
    );
}

export default NavBar;