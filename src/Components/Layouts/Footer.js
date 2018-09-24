import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core/";

const styles = theme => ({
  // root: {
  //   flexGrow: 1
  // },
  layout: {
    marginBottom: 0
  },
  paper: {
    padding: theme.spacing.unit * 3,
    color: theme.palette.text.secondary
  }
});

function Footer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="caption">@ Apper Systems AB</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="caption">{props.version}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Footer);
