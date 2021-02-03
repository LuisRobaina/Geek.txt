import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import React Components
import NavBar from "./components/navbar.component"
import './App.css';
import Home from './views/Home';
import Book from './views/Book';
import NotFound from './views/NotFound';
 


// Example of component routing:
// <Route path="/" exact component={BookBrowser} />

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/book/:id" exact component={Book} />
        <Route path="/" exact component={Home} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
