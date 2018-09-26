import React from "react";
import App from "../App";
import { shallow } from "enzyme";

describe("App", () => {
  it("renders without crashing", () => {
    let mountedApp = shallow(<App />);
  });

  it("renders a header", () => {
    let mountedApp = shallow(<App />);
    const header = mountedApp.find("Header");
    expect(header.length).toBe(1);
  });
});
