import reducer from "./reducer";
import actiontypes from "./constants/actiontypes";
import React, { Component } from "react";

describe("Testing reducers", () => {
  it("Testing initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });
});
