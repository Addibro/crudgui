import SignIn from "../SignIn";
import { mount } from "enzyme";

describe("SignIn", () => {
  it("should show when user is not signed in", () => {
    let signedIn = false;
  });

  it("should post username and password when submitted", () => {
    let expected = {
      user: "username",
      password: "password"
    };
    let actual = {};
  });

  it("should show error message when entered invalid user or password info", () => {});

  it("doesn't show signin if user is signed in", () => {});

  it("posts user and password when submitted", () => {});
});
