import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core/";

const styles = theme => ({
  // root: {
  //   flexGrow: 1
  // },
  layout: {
    marginBottom: 0
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: "left",
    color: theme.palette.text.secondary
  }
});

function Footer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={23}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>@ Apper Systems AB</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Footer);
