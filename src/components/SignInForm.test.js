import React, { Component } from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SigninForm from "./SigninForm";
configure({ adapter: new Adapter() });
describe("Testing SigninForm", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SigninForm />);
  });
  it("Testing signin function", () => {
    expect(wrapper.find("#signinform")).toHaveLength(1);
  });
});
