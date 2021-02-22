import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: "#861e71" }} variant="dark">
          <Nav className="mr-auto">
            <Navbar.Brand
              name="home"
              href="#"
              onClick={(event) => this.props.onClick()}
            >
              Home
            </Navbar.Brand>

            <Nav.Link name="policypurchase" href="#">
              Purchase Policy
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/">Signout</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
