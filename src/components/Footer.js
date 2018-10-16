import React from "react";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.grey[300],
    padding: `${theme.spacing.unit * 4}px`
  }
});

const Footer = props => {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <footer className={classes.footer}>
          <Grid container>
            <Grid item xs={11}>
              <Typography>@ Apper Systems AB</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography>v. {props.version}</Typography>
            </Grid>
          </Grid>
        </footer>
      </div>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(Footer);
