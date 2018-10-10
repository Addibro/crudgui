import Fetcher from "../utils/Fetcher";
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
// Icons
import DeviceHubRounded from "@material-ui/icons/DeviceHubRounded";
import Settings from "@material-ui/icons/Settings";
import Close from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Services from "./Services";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Grow from "@material-ui/core/Grow";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    height: window.innerHeight
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "flex-end",
    padding: "0 3px",
    ...theme.mixins.toolbar
  },
  progress: {
    margin: theme.spacing.unit,
    color: blue[500]
  },
  runningServer: {
    backgroundColor: green[200],
    "&:hover": {
      backgroundColor: green[300]
    },
    borderRadius: theme.shape.borderRadius
  },
  stoppedServer: {
    backgroundColor: red[200],
    "&:hover": {
      backgroundColor: red[300]
    },
    borderRadius: theme.shape.borderRadius
  },
  settings: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    },
    marginRight: theme.spacing.unit,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 1.6,
      width: "auto"
    }
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputInput: {
    padding: 5,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 140
    }
  }
});

class ServersMenu extends React.Component {
  handleServerClick = (event, index, server) =>
    this.props.onSelectedServer(index, server);

  filter = event => {
    const filteredServers = this.props.servers.filter(server => {
      return (
        server.NAME.split(" ")[0]
          .toLowerCase()
          .search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.props.handleServerSearch(filteredServers);
  };
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.props.serverMenuOpen && classes.drawerPaperClose
              )
            }}
            open={this.props.serverMenuOpen}
          >
            <div className={classes.toolbar}>
              <div className={classes.settings}>
                <IconButton>
                  <Settings />
                </IconButton>
              </div>
              <div className={classes.search}>
                <Input
                  onChange={this.filter}
                  placeholder="Search servers..."
                  disableUnderline
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                >
                  <IconButton>
                    <Close />
                  </IconButton>
                </Input>
              </div>
            </div>
            <Divider />
            <List component="nav" className={classes.root}>
              {this.props.serversLoading ? (
                <ListItem>
                  <CircularProgress className={classes.progress} />
                </ListItem>
              ) : (
                this.props.filteredServers.map((server, i) => {
                  const onlyName = server.NAME.split(" ")[0];
                  return (
                    <React.Fragment key={server.NAME}>
                      <Grow in>
                        <ListItem
                          className={classes.listItem}
                          button
                          selected={this.props.selectedServer === server.NAME}
                          onClick={event =>
                            this.handleServerClick(event, i, server.NAME)
                          }
                        >
                          {!this.props.serverMenuOpen ? (
                            <Tooltip title={onlyName} placement="right-end">
                              <ListItemIcon>
                                <DeviceHubRounded
                                  className={
                                    server.NAME.includes("(Running)")
                                      ? classes.runningServer
                                      : classes.stoppedServer
                                  }
                                />
                              </ListItemIcon>
                            </Tooltip>
                          ) : (
                            <ListItemIcon>
                              <DeviceHubRounded
                                className={
                                  server.NAME.includes("(Running)")
                                    ? classes.runningServer
                                    : classes.stoppedServer
                                }
                              />
                            </ListItemIcon>
                          )}
                          <ListItemText
                            classes={{ primary: classes.primary }}
                            primary={`${onlyName}`}
                          />
                        </ListItem>
                      </Grow>
                    </React.Fragment>
                  );
                })
              )}
            </List>
          </Drawer>
        </div>
      </React.Fragment>
    );
  }
}

ServersMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ServersMenu);
