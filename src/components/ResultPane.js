import React from "react";
import PropTypes from "prop-types";
import {
  createMuiTheme,
  withStyles,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import DisplayTable from "./DisplayTable";
import blue from "@material-ui/core/colors/blue";

const muiTheme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  appBar: {
    position: "sticky",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    paddingLeft: 12
  },
  flex: {
    flex: 1
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ResultPane extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={muiTheme}>
        <div>
          <Dialog
            fullScreen
            open={this.props.open}
            onClose={this.props.onClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar disableGutters>
                <IconButton
                  color="inherit"
                  onClick={this.props.onClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  style={{ paddingLeft: 12 }}
                  variant="h6"
                  color="inherit"
                  className={classes.flex}
                >
                  {this.props.title}
                </Typography>
                {/* <Button color="inherit" onClick={this.handleClose}>
                save
              </Button> */}
              </Toolbar>
            </AppBar>
            <DisplayTable
              title={this.props.title}
              columns={this.props.columns}
              columnWidth={this.props.columnWidth}
              rows={this.props.rows}
            />
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

ResultPane.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResultPane);
