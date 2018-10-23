import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blue from "@material-ui/core/colors/blue";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    paddingLeft: 12
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: "none"
  },
  header: {
    paddingLeft: 12
  }
});

const muiTheme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }
  },
  typography: {
    useNextVariants: true
  }
});

const Header = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={muiTheme}>
        <AppBar
          position="absolute"
          color="primary"
          className={classNames(
            classes.appBar,
            props.serverMenuOpen && props.signedOn && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={props.signedOn}>
            {props.signedOn ? (
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={() => props.toggleDrawer()}
                className={classes.menuButton}
              >
                {props.serverMenuOpen ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            ) : null}
            <Typography
              variant="h5"
              color="inherit"
              className={classNames(classes.grow, classes.header)}
            >
              {props.text}
            </Typography>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
