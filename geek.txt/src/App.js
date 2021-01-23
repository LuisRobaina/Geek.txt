import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

// Import React Components
import NavBar from "./components/navbar.component"
import './App.css';
 


// Example of component routing:
// <Route path="/" exact component={BookBrowser} />

function App() {
  return (
    <Router>
      <NavBar />
      <br />
    </Router>
  );
}

export default App;
