import React, { Component } from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PurchasePolicy from "./PurchasePolicy";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";

configure({ adapter: new Adapter() });
describe("Testing Purchase policy", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PurchasePolicy />);
  });
  it("Testing PurchasePolicy function", () => {
    expect(wrapper.find("#purchasepolicy")).toHaveLength(1);
  });

  it("Testing PurchasePolicy elements", () => {
    expect(wrapper.find(Row)).toHaveLength(5);
  });
  it("Testing PurchasePolicy button", () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
