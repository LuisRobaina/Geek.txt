import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { getUser } from "./utils/userService";
// Import React Components
import NavBar from "./components/Navbar/Navbar";
import "./App.css";
import Home from "./views/Home";
import Book from "./views/Book";
import NotFound from "./views/NotFound";
import UserLogIn from "./views/UserLogIn";
import UserRegister from "./views/UserRegister";

// Example of component routing:
// <Route path="/" exact component={BookBrowser} />

const App = () => {
  const [user, setUser] = useState(getUser());

  return (
    <Router>
      <NavBar user={user} />
      <Switch>
        <Route path="/login" exact>
          <UserLogIn setUser={setUser} />
        </Route>
        <Route path="/register" exact>
          <UserRegister setUser={setUser} />
        </Route>
        <Route path="/books/:id" exact>
          <Book />
        </Route>
        <Route path="/" exact>
          <Home user={user} />
        </Route>
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
