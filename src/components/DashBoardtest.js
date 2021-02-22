import React, { Component } from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DashBoard from "./DashBoard";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
configure({ adapter: new Adapter() });
// describe("Testing DashBoard", () => {
//   it("Testing DashBoard function", () => {
//     const wrapper = mount(<DashBoard />);
//     expect(wrapper.find("#dashboarddata")).toHaveLength(1);
//   });
//   //   it("Testing DashBoard function", () => {
//   //     const wrapper = mount(<DashBoard />);
//   //     expect(wrapper.find(Navbar)).toHaveLength(1);
//   //   });
// });
