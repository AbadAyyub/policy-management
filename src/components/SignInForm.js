import React, { Component, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { Alert } from "react-bootstrap";

import store from "../store";

import { loggedIn } from "../actionCreators";
import styles from "../App.css";

import BackGroundImage from "../images/policybazzar-1.jpg";
export default function SignInForm() {
  const api = axios.create({
    baseURL: `http://localhost:3001/users`,
  });

  let history = useHistory();
  const [state, setState] = useState({
    userName: "",
    password: "",
    successMessage: null,
    isValidUser: true,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    const { userName, password, isValidUser } = state;
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const { userName, password, isValidUser } = state;
    console.log(userName, password, isValidUser);
    api
      .get("/")
      .then((res) => {
        const userData = res.data.filter((user) => user.username === userName);
        console.log("userData", userData);
        if (
          userData &&
          userData.length > 0 &&
          userData[0].password === password
        ) {
          store.dispatch(loggedIn(userData[0]));
          history.push("/dashBoard");
        } else {
          setState({ isValidUser: false });
        }
      })
      .catch((error) => {
        state.isValidUser = false;
      });
  };

  const backGroundDiv = {
    color: "#2596be",
    backgroundImage: `url(${BackGroundImage})`,
    backgroundRepeat: "no-repeat",
    width: "1000px",
    height: "1000px",
  };

  return (
    <div style={backGroundDiv} id="signinform">
      <div>
        {!state.isValidUser && (
          <Alert variant="danger">
            You seem to have entered invalid credentials, Please enter valid
            credentials
          </Alert>
        )}
      </div>
      <form onSubmit={handleSubmitClick}>
        <div className="form-group text-left">
          <label htmlFor="exampleInputName1">UserName</label>
          <input
            type="text"
            value={state.userName}
            className="form-control"
            id="userName"
            placeholder="Enter userName"
            onChange={handleChange}
          />
        </div>

        <div className="form-group text-left">
          <label htmlFor="exampleInputName1">Password</label>
          <input
            type="password"
            value={state.password}
            className="form-control"
            id="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmitClick}
          >
            Login
          </button>
        </div>
        <Row>
          <Col>
            <Form.Group controlId="registrationMessage">
              <Form.Label>
                Not registered yet???
                <Link to="/register">Register here</Link>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
      </form>
    </div>
  );
}
