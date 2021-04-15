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
import UserProfilePage from './views/UserProfilePage';
import RatingsRecord from "./views/RatingRecods";
import CommunityGuidelines from "./views/CommunityGuidelines";
import MyBooks from "./views/MyBooks";
import Cart from "./views/ShoppingCart/Cart";

// Example of component routing:
// <Route path="/" exact component={BookBrowser} />

const App = () => {
  const [user, setUser] = useState(getUser());

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/login" exact>
          <UserLogIn setUser={setUser} />
        </Route>
        <Route path="/cart" exact>
          <Cart setUser={setUser} />
        </Route>
        <Route path="/register" exact>
          <UserRegister setUser={setUser} />
        </Route>
        <Route path="/profile" exact>
          <UserProfilePage user={user} setUser={setUser}/>
        </Route>
        <Route
          path="/books/:id"
          exact
          render={(props) => <Book {...props} user={user} />}
        />
        <Route path="/mybooks" exact>
          <MyBooks user={user}/>
        </Route>
        <Route path="/guidelines" exact component={CommunityGuidelines} />
        <Route path="/ratings/:id" exact component={RatingsRecord} />
        <Route path="/" exact>
          <Home user={user} />
        </Route>
        <Route path="/*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
