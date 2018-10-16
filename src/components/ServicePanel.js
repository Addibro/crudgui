import Fetcher from "../utils/Fetcher";
import SwaggerParser from "../utils/SwaggerParser";

import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grow from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Button from "@material-ui/core/Button";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  button: {
    color: blue[500]
  },
  progress: {
    margin: theme.spacing.unit,
    color: blue[500]
  },
  column: {
    flexBasis: "25%"
  }
});

class ServicePanel extends React.Component {
  state = {
    open: false,
    loadingSwagger: true,
    failedFetch: true,
    basePath: "",
    definitions: [],
    paths: []
  };

  onMethodClick = pathObject => {
    const { method, reference } = pathObject;
    let resultSchemaOfMethod;
    try {
      switch (method) {
        case "get":
          resultSchemaOfMethod = SwaggerParser.resultOfGet(
            reference,
            this.state.definitions
          );

          break;
        default:
          this.props.handleError("Unrecognizable method type");
      }
      this.props.setRequestOptions(
        resultSchemaOfMethod,
        this.state.basePath,
        pathObject
      );
      this.props.handleGetFormOpen();
    } catch (error) {
      this.props.handleError(error.message);
    }
  };

  handlePanelClick = () => {
    this.setState({
      open: !this.state.open,
      loadingSwagger: true,
      failedFetch: false
    });
    if (!this.state.open) {
      this.props.handleSelectedService(this.props.serviceName);
      this.getSwagger();
    }
  };

  getSwagger = async () => {
    let webserver = this.props.selectedServer.split(" ")[0];
    let webservice = this.props.serviceName.split(" ")[0];
    try {
      const prepareSwaggerResponse = await Fetcher.prepareSwagger(
        webserver,
        webservice
      );
      if (prepareSwaggerResponse.ERR === "") {
        const response = await Fetcher.getSwagger(webserver, webservice);
        console.log(response);
        this.setState({
          basePath: response.basePath,
          definitions: SwaggerParser.getDefinitions(response),
          paths: SwaggerParser.getPaths(response),
          loadingSwagger: false
        });
      } else {
        this.setState({ failedFetch: true });
        this.props.handleError(prepareSwaggerResponse.ERR);
      }
    } catch (error) {
      this.setState({ failedFetch: true });
      this.props.handleError(error.message);
    } finally {
      this.setState({ loadingSwagger: false });
    }
  };

  formatQueryString = path => {
    let queryString = "/?";
    path.parameters.map(param => (queryString += "{" + param.name + "}&"));
    if (queryString.length > 30) {
      queryString = queryString.slice(0, 30);
      queryString += "...";
      return queryString;
    }
    return queryString.slice(0, -1);
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              onClick={this.handlePanelClick}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}>
                {this.props.serviceName}
              </Typography>
            </ExpansionPanelSummary>
            <Divider />
            <ExpansionPanelDetails>
              {this.state.loadingSwagger ? (
                <CircularProgress className={classes.progress} size={30} />
              ) : this.state.failedFetch ? (
                <Typography color="error">
                  <br />
                  Fetch failed
                </Typography>
              ) : (
                <React.Fragment>
                  <div className={classes.column}>
                    <List
                      component="nav"
                      subheader={
                        <ListSubheader component="div">Methods</ListSubheader>
                      }
                    >
                      {this.state.paths.map(path => (
                        <div key={path.name}>
                          <ListItem
                            button
                            onClick={() => this.onMethodClick(path)}
                          >
                            <ListItemIcon>
                              <PlayArrow style={{ color: green[500] }} />
                            </ListItemIcon>
                            <ListItemText primary={path.name} />
                          </ListItem>
                        </div>
                      ))}
                    </List>
                  </div>
                  <div style={{ flexBasis: "25%" }}>
                    <List
                      component="nav"
                      subheader={
                        <ListSubheader component="div">Type</ListSubheader>
                      }
                    >
                      {this.state.paths.map((path, i) => (
                        <div key={path.method + i}>
                          <ListItem>
                            <ListItemText primary={path.method.toUpperCase()} />
                          </ListItem>
                        </div>
                      ))}
                    </List>
                  </div>
                  <div style={{ flexBasis: "50%" }}>
                    <List
                      component="nav"
                      subheader={
                        <ListSubheader component="div">Template</ListSubheader>
                      }
                    >
                      {this.state.paths.map(path => (
                        <div key={path.path}>
                          <ListItem>
                            {path.query ? (
                              <ListItemText
                                primary={this.formatQueryString(path)}
                              />
                            ) : (
                              <ListItemText primary={path.path} />
                            )}
                          </ListItem>
                        </div>
                      ))}
                    </List>
                  </div>
                </React.Fragment>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </MuiThemeProvider>
    );
  }
}

ServicePanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ServicePanel);
