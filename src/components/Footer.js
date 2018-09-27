import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core/";

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
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="caption">@ Apper Systems AB</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="caption">v. {props.version}</Typography>
          </Grid>
        </Grid>
      </footer>
    </div>
  );
};

export default withStyles(styles)(Footer);
