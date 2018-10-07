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
    paddingLeft: 10
  }
});

const muiTheme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }
  }
});

class Header extends React.Component {
  handleDrawerOpen = () => {
    this.props.drawerOpen(true);
  };

  handleMenuDrawer = () => {
    this.props.menuOpen(true);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={muiTheme}>
          <AppBar
            position="absolute"
            color="primary"
            className={classNames(
              classes.appBar,
              this.props.serverMenuOpen &&
                this.props.signedOn &&
                classes.appBarShift
            )}
          >
            <Toolbar disableGutters={this.props.signedOn}>
              {this.props.signedOn ? (
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classes.menuButton}
                >
                  {this.props.serverMenuOpen ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              ) : null}
              <Typography
                variant="headline"
                color="inherit"
                className={classNames(classes.grow, classes.header)}
              >
                {this.props.text}
              </Typography>
              {/* <IconButton
                color="inherit"
                aria-label="Menu"
                onClick={this.handleMenuDrawer}
                className={classNames(
                  classes.menuButton,
                  !this.props.signedOn && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton> */}
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
