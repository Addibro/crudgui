import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core/";
import createMuiTheme from "@material-ui/core/styles";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

export default props => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="headline" color="inherit">
          {props.text}
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);
