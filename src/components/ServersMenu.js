import Fetcher from "../utils/Fetcher";
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import DeviceHubRounded from "@material-ui/icons/DeviceHubRounded";
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
import Settings from "@material-ui/icons/Settings";
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

  handleOnClose = () => this.props.drawerOpen(false);

  fetchServers = async () => {
    let body;
    try {
      const webserversResponse = await Fetcher.getWebservers();
      if (webserversResponse.status === 200) {
        const body = await webserversResponse.json();
        // const servers = webserversResponse.servers;
        // console.log(body.WSS);
        this.props.handleWebservers(body.WSS);
        // this.props.handleWebservers(servers.WSS);
        const infoResponse = await Promise.all(
          body.WSS.map(server => server.NAME.split(" ")[0]).map(
            Fetcher.getWebserverInfo
          )
        );
        const infoJson = await Promise.all(
          infoResponse.map(Fetcher.getJsonFromResponse)
        );
        const webserviceResponse = await Promise.all(
          body.WSS.map(server => server.NAME.split(" ")[0]).map(
            Fetcher.getWebservices
          )
        );
        const webserviceJson = await Promise.all(
          webserviceResponse.map(Fetcher.getJsonFromResponse)
        );
        console.log(webserviceJson);
        this.props.handleWebservices(webserviceJson, infoJson);
      } else {
        throw Error(body.message);
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      throw Error(error);
    }
  };

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

  getIndex = () => {
    for (let i = 0; i < this.props.servers.length; i++) {
      const element = this.props.servers[i];
      if (this.props.selectedServer === element.NAME) return i;
    }
  };

  componentDidMount = () => this.fetchServers();

  componentWillUnmount = () => Fetcher.AbortController.abort();

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
                />
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
                          selected={this.getIndex() === i}
                          onClick={event =>
                            this.handleServerClick(event, i, server.NAME)
                          }
                        >
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
            <Divider />
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
