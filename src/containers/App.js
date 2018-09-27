import React, { Component } from "react";
// import injectTapEventPlugin from "react-tap-event-plugin";
import "./App.css";
import "typeface-roboto";
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import ServersMenu from "../components/ServersMenu";
import Footer from "../components/Footer";
import ErrorMessage from "../components/ErrorMessage";

class App extends Component {
  state = {
    version: "0.1.2",
    headerText: "CRUDGENGUI",
    signedOn: true,
    error: false,
    errorMessage: "",
    servers: [
      {
        NAME: "Alme (Running)"
      },
      {
        NAME: "IWSAlme (Running)"
      },
      {
        NAME: "IWSJohn (Running)"
      },
      {
        NAME: "WS_MATLID (Running)"
      },
      {
        NAME: "WSERVICE (Stopped)"
      },
      {
        NAME: "Wsynon (Stopped)"
      }
    ],
    selectedServer: "",
    selectedService: ""
  };

  handleSignOn = servers => {
    this.setState({ servers: servers });
  };

  onSelectedServer = data => {};

  render() {
    const { signedOn, errorMessage, error, servers } = this.state;
    return (
      <div className="App">
        <Header text={this.state.headerText} />
        {!signedOn && <SignIn handleSignOn={this.handleSignOn} />}
        {error && <ErrorMessage message={errorMessage} />}
        {signedOn && (
          <ServersMenu
            onSelectedServer={this.onSelectedServer}
            servers={servers}
          />
        )}
        <Footer version={this.state.version} />
      </div>
    );
  }
}

export default App;
