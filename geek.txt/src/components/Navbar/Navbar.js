import { Link } from 'react-router-dom';
import {useState} from 'react'
import classes from './Navbar.module.css';


const NavBar = () => {
    const [active, setActive] = useState("home")
    return(
        <nav>
            <Link to="/" >
            <div className={classes.logoContainer}>
                <img src="./GeekText.jpg" alt="logo" className={classes.logo}/>
                <span className={classes.title}>GeekText</span>
            </div>
            </Link>
            <div>
                <ul>
                    <Link to="/"><li className={classes.listItem}>Home</li></Link>
                    <Link to="/login"><li className={classes.listItem}>Login</li></Link>
                    <Link to="/register"><li className={classes.listItem}>Register</li></Link>
 
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;