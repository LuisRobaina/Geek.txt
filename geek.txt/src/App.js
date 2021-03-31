import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import React Components
import NavBar from "./components/Navbar/Navbar"
import './App.css';
import Home from './views/Home';
import Book from './views/Book';
import NotFound from './views/NotFound';
import UserLogIn from './views/UserLogIn';
import UserRegister from './views/UserRegister';

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
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
