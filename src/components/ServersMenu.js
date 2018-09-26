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
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
// import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 842,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  drawerPaper: {
    position: "relative",
    width: 240
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

const servers = [
  {
    server1: "server1"
  },
  {
    server2: "server2"
  },
  {
    server3: "server3"
  },
  {
    server4: "server4"
  },
  {
    server5: "server5"
  },
  {
    server6: "server6"
  },
  {
    server7: "server7"
  },
  {
    server8: "server8"
  },
  {
    server9: "server9"
  },
  {
    server10: "server10"
  },
  {
    server11: "server11"
  },
  {
    server12: "server12"
  },
  {
    server13: "server13"
  },
  {
    server14: "server14"
  },
  {
    server15: "server15"
  },
  {
    server16: "server16"
  },
  {
    server17: "server17"
  },
  {
    server18: "server18"
  },
  {
    server19: "server19"
  },
  {
    server20: "server20"
  }
];

class ServersMenu extends React.Component {
  state = {
    selectedIndex: -1
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
          <List component="nav">
            {servers.map((server, i) => (
              <ListItem
                key={i}
                button
                selected={this.state.selectedIndex === i}
                onClick={event => this.handleListItemClick(event, i)}
              >
                <ListItemIcon>
                  <DeviceHubRounded />
                </ListItemIcon>
                <ListItemText primary={`${server[`server${i + 1}`]}`} />
              </ListItem>
            ))}
          </List>
        </Drawer>
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
