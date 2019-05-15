import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Navbar, Nav, Form, Button, FormControl,
} from 'react-bootstrap';
import { Home, Search } from './routes';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="search">Movies</Nav.Link>
          <Nav.Link href="suggestion">Suggest a Movie</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>
      <Router>
        <div className={styles.container}>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    </div>
  );
}

export default App;
