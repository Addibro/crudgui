import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import DeviceHubRounded from "@material-ui/icons/DeviceHubRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 858,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class ServersMenu extends React.Component {
  state = {
    selectedIndex: -1,
    loading: true
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.toolbar} />
          <List
            component="nav"
            subheader={
              <ListSubheader component="div">Webservers</ListSubheader>
            }
          >
            <Divider />
            {this.props.servers.map((server, i) => {
              return this.state.loading ? (
                <ListItem key={`loader${i}`}>
                  <CircularProgress className={classes.progress} />
                </ListItem>
              ) : (
                <React.Fragment key={`server${i}`}>
                  <ListItem
                    button
                    selected={this.state.selectedIndex === i}
                    onClick={event => this.handleListItemClick(event, i)}
                  >
                    <ListItemIcon>
                      <DeviceHubRounded />
                    </ListItemIcon>
                    <ListItemText primary={`${server.NAME}`} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>{"Hello"}</Typography>
        </main>
      </div>
    );
  }
}

ServersMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ServersMenu);

class AlertDialog extends React.Component {
  state = {
    open: false,
    title: "",
    content: ""
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
