import React from "react";
import "typeface-roboto";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import Services from "../components/Services";
import ServersMenu from "../components/ServersMenu";
import FilterMenu from "../components/FilterMenu";
import Footer from "../components/Footer";
import Popup from "../components/Popup";
import RequestForm from "../components/RequestForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fetcher from "../utils/Fetcher";
import DisplayTable from "../components/DisplayTable";

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
    signedOn: true,
    serverMenuOpen: true,
    filterMenuOpen: false,
    popupMessage: "",
    popupOpen: false,
    snackbarVariant: "",
    getFormOpen: false,
    servers: [],
    filteredServers: [],
    serverInfo: [],
    infoLoading: true,
    serversLoading: true,
    selectedServer: "",
    services: [],
    servicesLoading: true,
    selectedService: "",
    selectedMethod: "",
    methodType: "",
    getResultSchema: [],
    data: [],
    port: "",
    basePath: "" /* /web/services/invent */,
    path: "" /* /select/{ID} */,
    parameters: [],
    query: "",
    parameterVariables: [],
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
      this.setState({ infoLoading: false });
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

  // Server methods

  handleSelectedServer = server => {
    this.setState({ selectedServer: server });
  };

  handleSelectedService = service =>
    this.setState({
      selectedService: service,
      port: this.state.serverInfo[
        this.getServerIndex()
      ].WSINFO.HTTPSERVERPORTS.slice(0, -1)
    });

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

  handlePort = port => this.setState({ port: port });

  getServerIndex = () => {
    for (let i = 0; i < this.state.servers.length; i++) {
      const element = this.state.servers[i];
      if (this.state.selectedServer === element.NAME) return i;
    }
    return -1;
  };

  // Menu methods

  toggleDrawer = () => {
    this.setState({ serverMenuOpen: !this.state.serverMenuOpen });
  };

  menuOpen = condition => {
    this.setState({ filterMenuOpen: condition });
  };

  // Error handling

  handleError = message => {
    this.setState({
      popupMessage: message,
      popupOpen: true,
      snackbarVariant: "error"
    });
  };

  handlePopupClose = () => {
    this.setState({ popupOpen: false });
  };

  // Success message

  handleSuccessMessage = message => {
    this.setState({
      popupMessage: message,
      popupOpen: true,
      snackbarVariant: "success"
    });
  };

  // Info message

  handleInfoMessage = message => {
    this.setState({
      popupMessage: message,
      popupOpen: true,
      snackbarVariant: "info"
    });
  };

  // Request methods

  setRequestOptions = (
    getResultSchema,
    basePath,
    { name, path, method, parameters, query }
  ) => {
    this.setState({
      getResultSchema: getResultSchema,
      selectedMethod: name,
      methodType: method,
      basePath: basePath,
      path: path,
      parameters: parameters,
      query: query,
      parameterVariables: parameters.map(param => ({
        name: [param.name],
        value: [param.name]
      }))
    });
  };

  cleanPath = path => {
    return path.replace(/[{}]/g, "");
  };

  handleParameterChange = (e, paramIndex) => {
    let parameterVariables = Object.assign([], this.state.parameterVariables);
    parameterVariables[paramIndex].value = e.target.value;
    this.setState({ parameterVariables });
  };

  handleRequestFormOpen = () => {
    this.setState({ getFormOpen: true });
  };

  handleRequestFormClose = () => {
    this.setState({
      getFormOpen: false
    });
  };

  handleResponse = message => {
    this.handleSuccessMessage(message);
  };

  setData = data => this.setState({ data: data });

  render() {
    const { classes } = this.props;
    const {
      signedOn,
      popupMessage,
      popupOpen,
      serverMenuOpen,
      selectedMethod,
      filterMenuOpen,
      data
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
                getIndex={this.getServerIndex}
                handleWebservers={this.handleWebservers}
                handleServerSearch={this.handleServerSearch}
                handleWebservices={this.handleWebservices}
                handleError={this.handleError}
                handleSelectedServer={this.handleSelectedServer}
                toggleDrawer={this.toggleDrawer}
                {...this.state}
              />
              {selectedMethod !== "Hello" ? (
                <Services
                  getServerIndex={this.getServerIndex}
                  handleSelectedService={this.handleSelectedService}
                  onSelectedServer={this.handleSelectedServer}
                  handleError={this.handleError}
                  handleGetFormOpen={this.handleRequestFormOpen}
                  handlePort={this.handlePort}
                  setRequestOptions={this.setRequestOptions}
                  {...this.state}
                />
              ) : (
                <DisplayTable
                  title={this.state.selectedMethod}
                  data={this.state.data}
                  columns={this.state.getResultSchema}
                />
              )}
            </div>
          )}
          {!signedOn && (
            <SignIn
              authorized={this.authorized}
              handleError={this.handleError}
            />
          )}
          {!signedOn && <Footer version={this.state.version} />}
          <Popup
            handlePopupClose={this.handlePopupClose}
            variant={this.state.snackbarVariant}
            open={popupOpen}
            message={popupMessage}
          />
          <RequestForm
            handleRequestFormClose={this.handleRequestFormClose}
            handleParameterChange={this.handleParameterChange}
            handleResponse={this.handleResponse}
            handleError={this.handleError}
            handleInfoMessage={this.handleInfoMessage}
            getFormOpen={this.state.getFormOpen}
            title={this.state.selectedMethod}
            getResultSchema={this.state.getResultSchema}
            port={this.state.port}
            basePath={this.state.basePath}
            path={this.state.path}
            parameters={this.state.parameters}
            query={this.state.query}
            parameterVariables={this.state.parameterVariables}
            methodType={this.state.methodType}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
