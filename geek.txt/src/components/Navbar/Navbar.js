import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { signOut } from "../../utils/userService";

const NavBar = ({ user, setUser }) => {
  const handleLogOut = () => {
    signOut();
    setUser(null);
  };

  return (
    <nav>
      <Link to="/">
        <div className={classes.logoContainer}>
          <img
            src="https://res.cloudinary.com/rocasto/image/upload/v1615102284/logo_sno9j8.jpg"
            alt="logo"
            className={classes.logo}
          />
          <span className={classes.title}>GeekText</span>
        </div>
      </Link>
      <div>
        <ul>
          <Link to="/">
            <li className={classes.listItem}>Home</li>
          </Link>
          {user ? (
            <>
              <Link to="/profile">
                <li className={classes.listItem}>
                  {user.firstName + "'s"} Profile
                </li>
              </Link>
              <Link to="/">
                <li className={classes.listItem} onClick={handleLogOut}>
                  Logout
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className={classes.listItem}>Login</li>
              </Link>
              <Link to="/register">
                <li className={classes.listItem}>Register</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
