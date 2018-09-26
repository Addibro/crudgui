import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography } from "@material-ui/core/";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
});

const muiTheme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }
  }
});

const Header = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={muiTheme}>
        <AppBar position="absolute" color="primary" className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="headline"
              color="inherit"
              className={classes.grow}
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
