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
import Fetcher from "../utils/Fetcher";
import DisplayTable from "../components/DisplayTable";

const columns = ["Name", "Company", "City", "State"];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"]
];

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
  constructor(props) {
    super(props);
    this.authorized = this.authorized.bind(this);
    this.onSelectedServer = this.onSelectedServer.bind(this);
    this.handleSelectedService = this.handleSelectedService.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.menuOpen = this.menuOpen.bind(this);
    this.handleWebservers = this.handleWebservers.bind(this);
    this.handleServerSearch = this.handleServerSearch.bind(this);
    this.handleWebservices = this.handleWebservices.bind(this);
    this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  state = {
    signedOn: true,
    serverMenuOpen: true,
    filterMenuOpen: false,
    errorReceived: "",
    errorMessageOpen: false,
    servers: [],
    filteredServers: [],
    serverInfo: [],
    serversLoading: true,
    selectedServer: "",
    services: [],
    servicesLoading: true,
    selectedService: "",
    selectedMethod: "",
    data: [],
    columns: [],
    headerText: "CRUDGENGUI",
    version: "0.2.0"
  };

  async componentDidMount() {
    try {
      const webserversResponse = await Fetcher.getWebservers();
      this.handleWebservers(webserversResponse.WSS);
      const infoResponse = await Promise.all(
        webserversResponse.WSS.map(server => server.NAME.split(" ")[0]).map(
          Fetcher.getWebserverInfo
        )
      );
      const webserviceResponse = await Promise.all(
        webserversResponse.WSS.map(server => server.NAME.split(" ")[0]).map(
          Fetcher.getWebservices
        )
      );
      this.handleWebservices(webserviceResponse, infoResponse);
    } catch (error) {
      if (error.name === "AbortError") return;
      this.handleError(error.message);
    }
  }

  // componentWillUnmount = () => Fetcher.AbortController.abort();

  authorized = condition => {
    this.setState({ signedOn: condition });
  };

  onSelectedServer = server => {
    this.setState({ selectedServer: server });
  };

  handleSelectedService = service =>
    this.setState({ selectedService: service });

  toggleDrawer = () => {
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

  handleError = error => {
    this.setState({ errorReceived: error, errorMessageOpen: true });
  };

  handleErrorMessageClose = () => {
    this.setState({ errorMessageOpen: false });
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

  setColumns = columns => this.setState({ columns: columns });

  setData = data => this.setState({ data: data });

  getIndex = () => {
    for (let i = 0; i < this.state.servers.length; i++) {
      const element = this.state.servers[i];
      if (this.state.selectedServer === element.NAME) return i;
    }
    return -1;
  };

  render() {
    const { classes } = this.props;
    const {
      signedOn,
      errorReceived,
      errorMessageOpen,
      serverMenuOpen,
      selectedMethod,
      filterMenuOpen
    } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <Header
            toggleDrawer={this.toggleDrawer}
            menuOpen={this.menuOpen}
            text={this.state.headerText}
            signedOn={signedOn}
            serverMenuOpen={serverMenuOpen}
          />
          {signedOn && (
            <div className={classes.root}>
              <ServersMenu
                getIndex={this.getIndex}
                handleWebservers={this.handleWebservers}
                handleServerSearch={this.handleServerSearch}
                handleWebservices={this.handleWebservices}
                handleError={this.handleError}
                onSelectedServer={this.onSelectedServer}
                toggleDrawer={this.toggleDrawer}
                {...this.state}
              />
              {selectedMethod === "" ? (
                <Services
                  getIndex={this.getIndex}
                  handleSelectedService={this.handleSelectedService}
                  onSelectedServer={this.onSelectedServer}
                  handleError={this.handleError}
                  {...this.state}
                />
              ) : (
                <DisplayTable title="Test" data={data} columns={columns} />
              )}
            </div>
          )}
          {!signedOn && <SignIn authorized={this.authorized} />}
          {!signedOn && <Footer version={this.state.version} />}
          <ErrorMessage
            handleErrorMessageClose={this.handleErrorMessageClose}
            open={errorMessageOpen}
            message={errorReceived}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
