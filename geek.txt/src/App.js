import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import React Components
import NavBar from "./components/Navbar/Navbar"
import './App.css';
import Home from './views/Home';
import Book from './views/Book';
import NotFound from './views/NotFound';
import UserLogIn from './views/UserLogIn';
import UserRegister from './views/UserRegister'; 
import UserProfilePage from './views/UserProfilePage';
import AddNewCard from './views/AddNewCard';
import AddNewAddress from './views/AddNewAddress';
import EditProfile from './views/EditProfile';
import EditCard from './views/EditCard';
import EditAddress from './views/EditAddress';

// Example of component routing:
// <Route path="/" exact component={BookBrowser} />

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login" exact component={UserLogIn}/>
        <Route path="/register" exact component={UserRegister} />
        <Route path="/books/:id" exact component={Book} />
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={UserProfilePage}/>
        <Route path="/addcard" component={AddNewCard} />
        <Route path="/addaddress" component={AddNewAddress} />
        <Route path="/editprofile" component={EditProfile} />
        <Route path="/editcards" component={EditCard} />
        <Route path="/editaddresses" component={EditAddress} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
