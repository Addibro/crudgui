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
    padding: theme.spacing.unit * 8
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

const Services = props => {
  const { classes, serverInfo, services, getIndex } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {props.selectedServer === "" ? (
        <React.Fragment>
          <Typography className={classes.typography} variant="h2" noWrap>
            Welcome
          </Typography>
          <Typography variant="subtitle1">
            Select a server you wish to work with
          </Typography>
        </React.Fragment>
      ) : props.servicesLoading ? (
        <CircularProgress className={classes.progress} />
      ) : serverInfo[getIndex()].ERR === "" ? (
        <div>
          <Typography variant="h4">
            {services[getIndex()].NAME}
            's webservices
          </Typography>
          <Typography variant="subtitle1">
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
          <Typography variant="subtitle1">
            Application server port:&nbsp;
            <Chip
              label={serverInfo[getIndex()].WSINFO.APPLICATIONSERVERPORTS.slice(
                0,
                -1
              )}
            />
          </Typography>
          <Typography variant="subtitle1">
            Http port:&nbsp;
            <Chip
              label={serverInfo[getIndex()].WSINFO.HTTPSERVERPORTS.slice(0, -1)}
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
                  sm={12}
                  lg={12}
                  key={service.NAME.split(" ")[0]}
                >
                  <ServicePanel
                    handleSelectedService={props.handleSelectedService}
                    handleError={props.handleError}
                    serviceName={service.NAME}
                    selectedServer={props.selectedServer}
                    selectedService={props.selectedService}
                    getIndex={props.getIndex}
                    className={classes.panel}
                    port={serverInfo[getIndex()].WSINFO.HTTPSERVERPORTS.slice(
                      0,
                      -1
                    )}
                    {...props}
                  />
                </Grid>
              </Grow>
            ))}
          </Grid>
        </div>
      ) : (
        <div>
          <Typography variant="h4">
            {services[getIndex()].NAME}
            's webservices
          </Typography>
          <Typography variant="subtitle1" color="error">
            {serverInfo[getIndex()].ERR}
          </Typography>
        </div>
      )}
    </main>
  );
};

export default withStyles(styles)(Services);
