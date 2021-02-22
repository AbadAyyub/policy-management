import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "axios";

import PurchasePolicy from "./PurchasePolicy";

import NavBar from "./NavBar";
import { Alert } from "react-bootstrap";

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import {
  Router,
  Route,
  Link,
  NavLink,
  browserHistory,
  IndexRoute,
} from "react-router";

import ViewPolicy from "./ViewPolicies";
import UpdateInfo from "./UpdateInfo";

import store from "../store";

import { loggedOut } from "../actionCreators";
import styles from "../app.module.css";
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},

      isHomePage: true,
      isViewPolicyPage: false,
      isUpdateInfo: false,
      isPolicyPurchased: false,
      isPurchasePolicy: false,
      policyNumber: "",
    };
  }

  componentDidMount() {
    let userId = store.getState().userinfo.id;

    axios.get(`http://localhost:3001/users/?id=${userId}`).then((res) => {
      this.setState({
        user: res.data[0],
      });
      console.log("user data at dashboard", this.state.user);
    });
  }

  handleClickOnMenu = (e) => {
    const { name } = e.target;

    if (name === "home") {
      this.setState({
        isHomePage: true,
        isViewPolicyPage: false,
        isUpdateInfo: false,
        isPurchasePolicy: false,
        isPolicyPurchased: false,
      });
    } else if (name === "policypurchase") {
      this.setState({
        isPurchasePolicy: true,
        isViewPolicyPage: false,
        isUpdateInfo: false,
        isHomePage: false,
        isPolicyPurchased: false,
      });
    } else if (name === "viewpol") {
      this.setState({
        isPurchasePolicy: false,
        isViewPolicyPage: true,
        isUpdateInfo: false,
        isHomePage: false,
        isPolicyPurchased: false,
      });
    } else if (name === "updatedata") {
      this.setState({
        isPurchasePolicy: false,
        isViewPolicyPage: false,
        isUpdateInfo: true,
        isHomePage: false,
        isPolicyPurchased: false,
      });
    } else if (name === "logout") {
      this.setState({
        isPurchasePolicy: false,
        isViewPolicyPage: false,
        isUpdateInfo: false,
        isHomePage: false,
        isPolicyPurchased: false,
      });

      store.dispatch(loggedOut({}));
    }
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    console.log(e.target);
    console.log(id, value);

    this.setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  handleSubmit = (refs) => {
    const api = axios.create({
      baseURL: `http://localhost:3001/policies`,
    });
    console.log("Polciydata", refs);
    let userid = store.getState().userinfo.id;

    const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const policyNumber = "PN-".concat(randomNumber);

    this.setState({
      policyNumber,
      isPolicyPurchased: true,
    });
    let policyData = {
      policytype: refs["policytype"].value,
      policyamount: refs["policyamount"].value,
      effectivedate: refs["effectivedate"].value,
      policyduration: refs["policyduration"].value,
      policyNumber,
      userid,
    };

    api.post("/", policyData).then((res) => {
      console.log("res.status", res.status);
    });
  };
  render() {
    return (
      <div id="dashboarddata" className="centre-allign">
        {this.state.isPolicyPurchased && (
          <Alert variant="success">
            You have successfully purchased a policy and here is your policy
            number
            <b>{this.state.policyNumber}</b>
          </Alert>
        )}

        <Navbar className="navbar navbar-dark bg-primary" variant="dark">
          <Nav className="mr-auto">
            <Navbar.Brand name="home" href="#" onClick={this.handleClickOnMenu}>
              Home
            </Navbar.Brand>

            <Nav.Link
              name="policypurchase"
              href="#"
              onClick={this.handleClickOnMenu}
            >
              Purchase Policy
            </Nav.Link>

            <Nav.Link name="viewpol" href="#" onClick={this.handleClickOnMenu}>
              View Policy
            </Nav.Link>
            <Nav.Link
              name="updatedata"
              href="#"
              onClick={this.handleClickOnMenu}
            >
              Update Profile
            </Nav.Link>
          </Nav>
          <div>
            <b className={styles.userName}>{store.getState().userinfo.name}</b>
          </div>
          <Nav>
            <Nav.Link name="logout" href="/" onClick={this.handleClickOnMenu}>
              Signout
            </Nav.Link>
          </Nav>
        </Navbar>
        <section>
          <div>
            <p>
              {" "}
              <b>Welcome To Policy Bazaar</b>
            </p>

            <p>
              {" "}
              <b>Policy Bazaar</b> When you buy insurance from us, you get more
              than just financial safety. You also get: our promise of
              simplifying complex insurance terms and conditions, quick
              stress-free claims, instant quotes from top insurers and being
              present for you in the toughest of times
            </p>
          </div>
        </section>
        <div>
          {this.state.isPurchasePolicy && (
            <PurchasePolicy onSubmit={this.handleSubmit} />
          )}
        </div>
        <div>
          {this.state.isViewPolicyPage && (
            <ViewPolicy userid={store.getState().userinfo.id} />
          )}
        </div>
        <div>
          {this.state.isUpdateInfo && (
            <UpdateInfo userinfo={this.state.user} success={true} />
          )}
        </div>
      </div>
    );
  }
}

export default DashBoard;
