import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import blue from "@material-ui/core/colors/blue";
import ServicePanel from "./ServicePanel";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Grow from "@material-ui/core/Grow";
import ListItem from "@material-ui/core/ListItem";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 8
  },
  welcome: {
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
  const { classes, ...other } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.selectedServer === "" ? (
          <React.Fragment>
            <Typography className={classes.welcome} variant="h2" noWrap>
              Welcome
            </Typography>
            <Typography variant="subtitle1">
              Select a server you wish to work with
            </Typography>
          </React.Fragment>
        ) : props.infoLoading ? (
          <ListItem>
            <CircularProgress className={classes.progress} />
            <Typography variant="caption">Fetching Server Info...</Typography>
          </ListItem>
        ) : props.servicesLoading ? (
          <ListItem>
            <CircularProgress className={classes.progress} />
            <Typography variant="caption">Fetching Services...</Typography>
          </ListItem>
        ) : props.serverInfo[props.getServerIndex()].ERR === "" ? (
          <div>
            <Typography variant="h4">
              {props.services[props.getServerIndex()].NAME}
              's webservices
            </Typography>
            <Typography variant="subtitle1">
              Runtime user ID:&nbsp;
              <Chip
                avatar={
                  <Avatar>
                    {props.serverInfo[
                      props.getServerIndex()
                    ].WSINFO.RUNTIMEUSERID.slice(0, 1)}
                  </Avatar>
                }
                label={
                  props.serverInfo[props.getServerIndex()].WSINFO.RUNTIMEUSERID
                }
              />
            </Typography>
            <Typography variant="subtitle1">
              Application server port:&nbsp;
              <Chip
                label={props.serverInfo[
                  props.getServerIndex()
                ].WSINFO.APPLICATIONSERVERPORTS.slice(0, -1)}
              />
            </Typography>
            <Typography variant="subtitle1">
              Http port:&nbsp;
              <Chip
                label={props.serverInfo[
                  props.getServerIndex()
                ].WSINFO.HTTPSERVERPORTS.slice(0, -1)}
              />
            </Typography>
            <br />
            <Divider />
            <br />
            <Grid container spacing={16}>
              {props.services[props.getServerIndex()].SERVICES.map(service => (
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
                      handleGetFormOpen={props.handleGetFormOpen}
                      setRequestOptions={props.setRequestOptions}
                      serviceName={service.NAME}
                      selectedServer={props.selectedServer}
                      selectedService={props.selectedService}
                      getServerIndex={props.getServerIndex}
                      className={classes.panel}
                      {...other}
                    />
                  </Grid>
                </Grow>
              ))}
            </Grid>
          </div>
        ) : (
          <div>
            <Typography variant="h4">
              {props.services[props.getServerIndex()].NAME}
              's webservices
            </Typography>
            <Typography variant="subtitle1" color="error">
              {props.serverInfo[props.getServerIndex()].ERR}
            </Typography>
          </div>
        )}
      </main>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(Services);
