import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import blue from "@material-ui/core/colors/blue";
import ServicePanel from "./ServicePanel";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Grow from "@material-ui/core/Grow";

const styles = theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 5
  },
  typography: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 30
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit
  },
  services: {
    padding: theme.spacing.unit * 3
  },
  progress: {
    margin: theme.spacing.unit,
    color: blue[500]
  },
  toolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

class Services extends React.Component {
  render() {
    const { classes, serverInfo, services, getIndex } = this.props;
    // console.log(getIndex());
    // console.log(serverInfo[getIndex()].WSINFO);

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {this.props.selectedServer === "" ? (
          <React.Fragment>
            <Typography
              className={classes.typography}
              variant="display3"
              noWrap
            >
              Welcome
            </Typography>
            <Typography variant="subheading">
              Select a server you wish to work with
            </Typography>
          </React.Fragment>
        ) : this.props.servicesLoading ? (
          <CircularProgress className={classes.progress} />
        ) : serverInfo[getIndex()].ERR === "" ? (
          <div>
            <Typography variant="display1">
              {services[getIndex()].NAME}
              's webservices
            </Typography>
            <Typography variant="subheading">
              Runtime user ID:&nbsp;
              <Chip
                avatar={
                  <Avatar>
                    {serverInfo[getIndex()].WSINFO.RUNTIMEUSERID.slice(0, 1)}
                  </Avatar>
                }
                label={serverInfo[getIndex()].WSINFO.RUNTIMEUSERID}
              />
            </Typography>
            <Typography variant="subheading">
              Application server port:&nbsp;
              <Chip
                label={serverInfo[
                  getIndex()
                ].WSINFO.APPLICATIONSERVERPORTS.slice(0, -1)}
              />
            </Typography>
            <Typography variant="subheading">
              Http port:&nbsp;
              <Chip
                label={serverInfo[getIndex()].WSINFO.HTTPSERVERPORTS.slice(
                  0,
                  -1
                )}
              />
            </Typography>
            <br />
            <Divider />
            <br />
            <Grid container spacing={16}>
              {services[getIndex()].SERVICES.map(service => (
                <Grow in key={service.NAME}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    key={service.NAME.split(" ")[0]}
                  >
                    <ServicePanel
                      serviceName={service.NAME}
                      info={"Info about this service"}
                      className={classes.panel}
                    />
                  </Grid>
                </Grow>
              ))}
            </Grid>
          </div>
        ) : (
          <div>
            <Typography variant="display1">
              {services[getIndex()].NAME}
              's webservices
            </Typography>
            <Typography variant="subheading" color="error">
              {serverInfo[getIndex()].ERR}
            </Typography>
          </div>
        )}
      </main>
    );
  }
}

export default withStyles(styles)(Services);
