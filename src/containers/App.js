import React from "react";
import "typeface-roboto";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import Services from "../components/Services";
import ServersMenu from "../components/ServersMenu";
import FilterMenu from "../components/FilterMenu";
import Footer from "../components/Footer";
import ErrorMessage from "../components/ErrorMessage";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  }
});

class App extends React.Component {
  state = {
    signedOn: false,
    serverMenuOpen: true,
    filterMenuOpen: false,
    error: false,
    errorMessage: "",
    servers: [],
    filteredServers: [],
    serverInfo: [],
    serversLoading: true,
    selectedServerIndex: -1,
    services: [],
    servicesLoading: true,
    selectedServer: "",
    selectedService: "",
    headerText: "CRUDGENGUI",
    version: "0.1.4"
  };

  authorized = condition => {
    this.setState({ signedOn: condition });
  };

  onSelectedServer = (index, server) => {
    this.setState({ selectedServerIndex: index, selectedServer: server });
  };

  drawerOpen = () => {
    this.setState({ serverMenuOpen: !this.state.serverMenuOpen });
  };

  menuOpen = condition => {
    this.setState({ filterMenuOpen: condition });
  };

  handleWebservers = webservers => {
    this.setState({
      servers: webservers,
      filteredServers: webservers,
      serversLoading: false
    });
  };

  handleServerSearch = filteredServers =>
    this.setState({ filteredServers: filteredServers });

  handleWebservices = (services, serverInfo) => {
    this.setState({
      services: services,
      serverInfo: serverInfo,
      servicesLoading: false
    });
  };

  render() {
    const { classes } = this.props;
    const {
      signedOn,
      errorMessage,
      error,
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
            text={this.state.headerText}
            signedOn={signedOn}
            serverMenuOpen={serverMenuOpen}
          />
          {signedOn && (
            <div className={classes.root}>
              <ServersMenu
                handleWebservers={this.handleWebservers}
                handleServerSearch={this.handleServerSearch}
                handleWebservices={this.handleWebservices}
                onSelectedServer={this.onSelectedServer}
                drawerOpen={this.drawerOpen}
                {...this.state}
              />
              <Services
                onSelectedServer={this.onSelectedServer}
                selected={this.state.selectedServerIndex}
                {...this.state}
              />
            </div>
          )}
          {!signedOn && <SignIn authorized={this.authorized} />}
          {!signedOn && <Footer version={this.state.version} />}
          {error && <ErrorMessage message={errorMessage} />}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
