import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import React Components
import NavBar from "./components/Navbar/Navbar"
import './App.css';
import Home from './views/Home';
import Book from './views/Book';
import NotFound from './views/NotFound';
import Register from './views/Register';
import Login from './views/Login';
import userLogIn from './views/userLogIn';
import userRegister from './views/userRegister';


// Example of component routing:
// <Route path="/" exact component={BookBrowser} />

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register} />
        <Route path="/login/" exact component={userLogIn} /> 
        <Route path="/book/:id" exact component={Book} />
        <Route path="/register" exact component={userRegister} />
        <Route path="/" exact component={Home} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
