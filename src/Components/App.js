import React, { Component } from "react";
// import injectTapEventPlugin from "react-tap-event-plugin";
import SignIn from "./SignIn";
import "./App.css";
import "typeface-roboto";
import Footer from "./Layouts/Footer";
import Header from "./Layouts/Header";

class App extends Component {
  state = {
    version: "0.1.1",
    headerText: "Login"
  };

  render() {
    return (
      <div className="App">
        <Header text={this.state.headerText} />
        <SignIn onSignOn={this.onSignOn} />
        <Footer version={this.state.version} />
      </div>
    );
  }
}

export default App;
