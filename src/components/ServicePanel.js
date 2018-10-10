import Fetcher from "../utils/Fetcher";
import SwaggerParser from "../utils/SwaggerParser";

import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
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
  }
});

class ServicePanel extends React.Component {
  state = {
    open: false,
    loadingSwagger: true,
    failedFetch: true,
    basePath: "",
    definitions: {},
    paths: []
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
          // definitions: response.definitions,
          paths: SwaggerParser.getPaths(response),
          loadingSwagger: false
        });
      } else {
        this.setState({ loadingSwagger: false, failedFetch: true });
        this.props.handleError(prepareSwaggerResponse.ERR);
      }
    } catch (error) {
      this.setState({ loadingSwagger: false, failedFetch: true });
      this.props.handleError(error.message);
    }
  };

  render() {
    const { classes } = this.props;

    return (
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
              <Typography variant="caption" color="error">
                <br />
                Fetch failed
              </Typography>
            ) : (
              <div>
                <List
                  component="nav"
                  subheader={
                    <ListSubheader component="div">Methods</ListSubheader>
                  }
                >
                  {this.state.paths.map(path => (
                    <div>
                      <ListItem button>
                        <ListItemIcon>
                          <PlayArrow />
                        </ListItemIcon>
                        <ListItemText
                          primary={path.path + ": " + path.method}
                        />
                      </ListItem>
                    </div>
                  ))}
                </List>
              </div>
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ServicePanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ServicePanel);
