import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

class ErrorMessage extends React.Component {
  handleClose = (event, reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    this.props.handleErrorMessageClose();
  };

  componentWillUnmount = () => {
    this.props.handleErrorMessageClose();
  };

  render() {
    const { classes, message } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.props.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id" className={classes.message}>
              <ErrorIcon
                className={classNames(classes.icon, classes.iconVariant)}
              />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func
  // variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

export default withStyles(styles)(ErrorMessage);
