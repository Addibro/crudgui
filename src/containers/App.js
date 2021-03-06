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
import ResultPane from "../components/ResultPane";
import ReopenResultPane from "../components/ReopenResultPane";

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
    popupOpen: false,
    getFormOpen: false,
    resultPaneOpen: false,
    popupMessage: "",
    snackbarVariant: "",
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
    rows: [],
    port: "",
    basePath: "" /* /web/services/invent */,
    path: "" /* /select/{ID} */,
    wholePath: "",
    parameters: [],
    query: "",
    parameterVariables: [],
    headerText: "Webserver Explorer",
    version: "0.3.0"
  };

  async componentDidMount() {
    try {
      const webserversResponse = await Fetcher.getWebservers();
      if (webserversResponse.ok) {
        const jsonResponse = await webserversResponse.json();
        this.handleWebservers(jsonResponse.WSS);
        const infoResponse = await Promise.all(
          jsonResponse.WSS.map(server => server.NAME.split(" ")[0]).map(
            Fetcher.getWebserverInfo
          )
        );
        this.setState({ infoLoading: false });
        const webserviceResponse = await Promise.all(
          jsonResponse.WSS.map(server => server.NAME.split(" ")[0]).map(
            Fetcher.getWebservices
          )
        );
        this.handleWebservices(webserviceResponse, infoResponse);
      } else {
        this.handleError(
          "Problem fetching servers: " + webserversResponse.statusText
        );
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      this.handleError("Problem fetching servers: " + error.message);
    }
  }

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
      wholePath: this.getWholePath(
        this.state.port,
        basePath,
        parameters,
        query,
        path
      ),
      parameters: parameters,
      query: query,
      parameterVariables: parameters.map(param => {
        if (param.parameters) {
          return param.parameters.map(p => ({
            name: p.name,
            value: p.name
          }));
        } else {
          return { name: param.name, value: param.name };
        }
      })
    });
  };

  getParameter;

  getWholePath = (port, basePath, parameters, query, path) => {
    return (
      Fetcher.baseURL +
      ":" +
      port +
      basePath +
      (parameters.length && query !== "body"
        ? path.slice(0, path.indexOf("{") - 1)
        : path) +
      (query === "query" ? "/?" : query === "path" ? "/" : "")
    );
  };

  handleParameterChange = (e, paramIndex, nestedIndex) => {
    let parameterVariables = Object.assign([], this.state.parameterVariables);
    if (nestedIndex == undefined) {
      parameterVariables[paramIndex].value = e.target.value;
    } else {
      parameterVariables[paramIndex][nestedIndex].value = e.target.value;
      console.log(
        parameterVariables[paramIndex][nestedIndex],
        paramIndex,
        nestedIndex
      );
    }
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

  handleResponse = response => {
    this.state.getResultSchema
      .filter(
        schema => schema.type === "string" && response[schema.objectName] !== ""
      )
      .forEach(message =>
        this.handleInfoMessage(
          `${message.objectName}: ${response[message.objectName]}`
        )
      );

    const schemaProps = this.state.getResultSchema.find(
      schema => schema.properties
    );

    let resultObject;

    if (
      schemaProps &&
      schemaProps.properties &&
      schemaProps.properties[0].parameters
    ) {
      resultObject = schemaProps.properties.map(
        ({ name, parameters, type }) => ({
          objectName: name,
          columns: parameters.map(col => ({ name: col.name })),
          columnWidth: parameters.map(col => ({
            columnName: col.name,
            width: 200
          })),
          type: type
        })
      )[0];
    } else {
      resultObject = this.state.getResultSchema
        .filter(schema => schema.properties)
        .map(({ objectName, properties, type }) => ({
          objectName: objectName,
          columns: properties.map(col => ({ name: col.name })),
          columnWidth: properties.map(col => ({
            columnName: col.name,
            width: 200
          })),
          type: type
        }))[0];
    }

    if (resultObject) {
      const columns = resultObject.columns;

      const columnWidth = resultObject.columnWidth;

      const rows = schemaProps.properties[0].parameters
        ? response[schemaProps.objectName][resultObject.objectName]
        : response[resultObject.objectName];

      const type = resultObject.type;

      this.setState({
        columns: columns,
        columnWidth: columnWidth,
        rows: type ? rows : [rows],
        resultPaneOpen: true
      });
    }
  };

  handleResultPaneClose = () => {
    this.setState({ resultPaneOpen: false });
  };

  handleResultPaneOpen = () => {
    this.setState({ resultPaneOpen: true });
  };

  setData = data => this.setState({ data: data });

  render() {
    const { classes } = this.props;
    const { signedOn, popupMessage, popupOpen, serverMenuOpen } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <Header
            toggleDrawer={this.toggleDrawer}
            menuOpen={this.menuOpen}
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
              <ReopenResultPane
                handleResultPaneOpen={this.handleResultPaneOpen}
                rows={this.state.rows}
                resultPaneOpen={this.state.resultPaneOpen}
              />
            </div>
          )}
          {!signedOn && (
            <div>
              <SignIn
                authorized={this.authorized}
                handleError={this.handleError}
              />
              <Footer version={this.state.version} />
            </div>
          )}
          {/* {!signedOn && <Footer version={this.state.version} />} */}
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
            wholePath={this.state.wholePath}
            parameters={this.state.parameters}
            query={this.state.query}
            parameterVariables={this.state.parameterVariables}
            methodType={this.state.methodType}
          />
          <ResultPane
            open={this.state.resultPaneOpen}
            title={this.state.selectedMethod}
            onClose={this.handleResultPaneClose}
            columns={this.state.columns}
            columnWidth={this.state.columnWidth}
            rows={this.state.rows}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
