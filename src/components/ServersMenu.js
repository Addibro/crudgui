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
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Services from "./Services";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: window.innerHeight,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  drawerPaper: {
    position: "relative",
    // whiteSpace: "",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
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
    justifyContent: "flex-end",
    padding: "0 8px",
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
  }
});

class ServersMenu extends React.Component {
  state = {
    selectedIndex: 0,
    loading: false,
    services: [{ service1: "Service1" }],
    info: []
  };

  handleServerClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  handleOnClose = () => {
    this.props.drawerOpen(false);
  };

  render() {
    const { classes, theme } = this.props;
    const { services, info } = this.state;

    return (
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
            <Typography variant="headline">Webservers</Typography>
            <IconButton onClick={this.handleOnClose} style={{ marginLeft: 30 }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List component="nav">
            {this.props.servers.map((server, i) => {
              return this.state.loading ? (
                <ListItem key={`loader${i}`}>
                  <CircularProgress className={classes.progress} />
                </ListItem>
              ) : (
                <React.Fragment key={`server${i}`}>
                  <ListItem
                    button
                    selected={this.state.selectedIndex === i}
                    onClick={event => this.handleServerClick(event, i)}
                  >
                    <ListItemIcon>
                      <DeviceHubRounded
                        className={
                          server.NAME.includes("(Running)")
                            ? classes.runningServer
                            : classes.stoppedServer
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary={`${server.NAME.split(" ")[0]}`} />
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        </Drawer>
        <Services
          selected={this.state.selectedIndex}
          // info={info}
          services={services}
        />
      </div>
    );
  }
}

ServersMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ServersMenu);
