import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 10,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit
  },
  services: {
    padding: theme.spacing.unit * 3
  }
});

class Services extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {this.props.selected === -1 ? (
          <React.Fragment>
            <Typography variant="display3" noWrap>
              Welcome
            </Typography>
            <Typography variant="subheading">
              Select a server you wish to work with
            </Typography>
          </React.Fragment>
        ) : (
          <div>
            {this.props.services.map((service, i) => (
              <React.Fragment>
                <Paper className={classes.paper}>
                  <div className={classes.services}>
                    <Typography variant="display2">
                      {service.service1}
                    </Typography>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="button">Info</Typography>
                  </div>
                </Paper>
              </React.Fragment>
            ))}
          </div>
        )}
      </main>
    );
  }
}

export default withStyles(styles)(Services);
