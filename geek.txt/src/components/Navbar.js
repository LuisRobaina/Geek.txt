import { Link } from 'react-router-dom';
import {useState} from 'react'
import { Menu, Segment } from 'semantic-ui-react'

const NavBar = () => {
    const [active, setActive] = useState("home")
    return(
        <Segment>
            <Menu secondary size="large">
                <Link to="/">
                    <Menu.Item name="BookLib" />
                </Link>
            </Menu>
        </Segment>
    );
}

export default NavBar;