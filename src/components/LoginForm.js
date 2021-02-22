import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { userHistory } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passwWord: "",
      isValidUser: true,
    };
  }

  handleUserNameChange = (event) => {
    console.log("username", event.target.value);
    this.setState({
      userName: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    console.log("password", event.target.value);
    this.setState({
      passwWord: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { userName, passwWord, isValidUser } = this.state;
    console.log("User and pwd is", userName, passwWord);
    if (isValidUser) {
    }
  };
  render() {
    const { userName, passwWord } = this.state;
    return (
      <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group text-left">
            <label htmlFor="exampleInputName1">UserName</label>
            <input
              type="text"
              value={userName}
              className="form-control"
              id="userName"
              placeholder="Enter userName"
              onChange={this.handleUserNameChange}
            />
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputName1">Password</label>
            <input
              type="text"
              value={passwWord}
              className="form-control"
              id="password"
              placeholder="Enter Password"
              onChange={this.handlePasswordChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
