import React, { Component } from "react";
import axios from "axios";

import { Alert } from "react-bootstrap";

class UpdateInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: this.props.userinfo,
      errors: {},
      isInfoUpdatedSuccessfully: false,
    };
    console.log("userdata is", this.state.userinfo);
  }

  handleChange = (e) => {
    let userinfo = this.state.userinfo;
    userinfo[e.target.name] = e.target.value;
    this.setState({
      userinfo,
    });
  };

  validateForm = () => {
    let userinfo = this.state.userinfo;
    let errors = {};
    let formValid = true;
    const { name, contactno, dob, email } = userinfo;

    if (typeof name !== "undefined") {
      if (!name.match(/^[a-zA-Z ]*$/)) {
        formValid = false;
        errors["username"] = "*Please enter alphabets only.";
      }
    }

    if (typeof contactno !== "undefined") {
      if (!contactno.match(/^[0-9]{10}$/) || contactno.length > 10) {
        formValid = false;
        errors["contactno"] =
          "*Please enter a valid phone number with numbers and 10 digits";
      }
    }
    if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        formValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (typeof dob !== "undefined") {
      let age = this.calculateAge(dob);
      if (age < 18 || age > 96) {
        formValid = false;
        errors["dob"] = "Your age is not eligible for using this app";
      }
    }

    this.setState({
      errors: errors,
    });

    return formValid;
  };

  calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  submitRegistrationForm = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const api = axios.create({
        baseURL: `http://localhost:3001/users`,
      });

      const userinfo = { ...this.state.userinfo };
      userinfo.age = this.calculateAge(userinfo.dob);

      api.patch(`/${userinfo.id}`, userinfo).then((res) => {
        console.log("res.status", res.status);
      });
      this.setState({
        isInfoUpdatedSuccessfully: true,
      });
    }
  };
  render() {
    return (
      <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
        {this.state.isInfoUpdatedSuccessfully && (
          <Alert variant="success">
            Your informations has been updated successfully
          </Alert>
        )}

        <form
          name="userRegistrationForm"
          onSubmit={this.submitRegistrationForm}
        >
          <div className="form-group text-left">
            <label htmlFor="exampleInputName1">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={this.state.userinfo.name}
              onChange={this.handleChange}
              required
            />
            <div className="errorMsg">{this.state.errors.name}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputName1">User Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="username"
              placeholder="Enter UserName"
              required
              value={this.state.userinfo.username}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.username}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={this.state.userinfo.password}
              onChange={this.handleChange}
              required
            />
            <div className="errorMsg">{this.state.errors.password}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Enter your Address"
              value={this.state.userinfo.address}
              required
              onChange={this.handleChange}
              required
            />
            <div className="errorMsg">{this.state.errors.address}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Citizenship</label>
            <input
              type="text"
              className="form-control"
              id="citizenship"
              placeholder="citizenship"
              name="citizenship"
              value={this.state.userinfo.citizenship}
              onChange={this.handleChange}
              required
            />
            <div className="errorMsg">{this.state.errors.citizenship}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">State</label>

            <select
              id="states"
              name="states"
              value={this.state.userinfo.states}
              onChange={this.handleChange}
              required
              className="form-control"
            >
              <option value="select">select</option>

              <option value="california">california</option>
              <option value="florida">florida</option>
              <option value="New York">NewYork</option>
            </select>

            <div className="errorMsg">{this.state.errors.states}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Country</label>
            <select
              id="countries"
              name="countries"
              value={this.state.userinfo.countries}
              onChange={this.handleChange}
              required
              className="form-control"
            >
              <option value="select">select</option>

              <option value="India">India</option>
              <option value="Netherlands">Netherlands</option>
              <option value="USA">USA</option>
            </select>

            <div className="errorMsg">{this.state.errors.countries}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              required
              value={this.state.userinfo.email}
              onChange={this.handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            <div className="errorMsg">{this.state.errors.email}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Gender</label>
            <select
              id="genders"
              name="gender"
              value={this.state.userinfo.gender}
              onChange={this.handleChange}
              required
              className="form-control"
            >
              <option value="select">select</option>

              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <div className="errorMsg">{this.state.errors.gender}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Marital Status</label>
            <select
              id="maritalstatus"
              name="maritalstatuses"
              value={this.state.userinfo.maritalstatuses}
              onChange={this.handleChange}
              required
              className="form-control"
            >
              <option value="select">select</option>

              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Seperated">Seperated</option>
              <option value="Divorced">Divorced</option>
            </select>

            <div className="errorMsg">{this.state.errors.maritalstatuses}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Contact No</label>
            <input
              type="text"
              className="form-control"
              id="contactno"
              placeholder="Enter your Contact Number"
              name="contactno"
              value={this.state.userinfo.contactno}
              onChange={this.handleChange}
              required
            />
            <div className="errorMsg">{this.state.errors.contactno}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              placeholder="Enter your Birth Date"
              name="dob"
              value={this.state.userinfo.dob}
              onChange={this.handleChange}
              required
            />
            <div className="errorMsg">{this.state.errors.dob}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Registration Date</label>
            <input
              type="date"
              className="form-control"
              id="regdate"
              name="regdate"
              value={this.state.userinfo.regdate}
              onChange={this.handleChange}
              required
            />
            <div className="errorMsg">{this.state.errors.regdate}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Identity Proof Type</label>
            <input
              type="text"
              className="form-control"
              id="idProof"
              placeholder="Proof Type"
              name="idProof"
              value={this.state.userinfo.idProof}
              onChange={this.handleChange}
              required
            />
            <div className="errorMsg">{this.state.errors.idProof}</div>
          </div>

          <div className="form-group text-left">
            <label htmlFor="exampleInputPassword1">Document No:</label>
            <input
              type="text"
              className="form-control"
              id="documentNo"
              placeholder="documentNumber"
              name="documentNo"
              value={this.state.userinfo.documentNo}
              onChange={this.handleChange}
              required
            />
            <div className="errorMsg">{this.state.errors.documentNo}</div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.submitRegistrationForm}
            >
              Update Info
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateInfo;
