import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core/";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

export default props => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="headline" color="inherit">
        Login
      </Typography>
    </Toolbar>
  </AppBar>
);
