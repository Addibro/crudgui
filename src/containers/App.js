import React from "react";
import "typeface-roboto";
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import ServersMenu from "../components/ServersMenu";
import Footer from "../components/Footer";
import ErrorMessage from "../components/ErrorMessage";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends React.Component {
  state = {
    serverMenuOpen: true,
    filterMenuOpen: false,
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

  changeHeader = text => {
    this.setState({ headerText: text });
  };

  drawerOpen = condition => {
    this.setState({ serverMenuOpen: condition });
  };

  menuOpen = condition => {
    this.setState({ filterMenuOpen: condition });
  };

  render() {
    const {
      signedOn,
      errorMessage,
      error,
      servers,
      serverMenuOpen,
      filterMenuOpen
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <Header
            drawerOpen={this.drawerOpen}
            menuOpen={this.menuOpen}
            signedOn={signedOn}
            text={this.state.headerText}
            serverMenuOpen={serverMenuOpen}
          />
          {signedOn && (
            <ServersMenu
              changeHeader={() => this.chageHeader("Servers")}
              onSelectedServer={this.onSelectedServer}
              servers={servers}
              serverMenuOpen={serverMenuOpen}
              drawerOpen={this.drawerOpen}
              signedOn={signedOn}
            />
          )}
          {!signedOn && <SignIn handleSignOn={this.handleSignOn} />}
          {error && <ErrorMessage message={errorMessage} />}
          {!signedOn && <Footer version={this.state.version} />}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
