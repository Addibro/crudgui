import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import Grow from "@material-ui/core/Grow";
import blue from "@material-ui/core/colors/blue";
import Tooltip from "@material-ui/core/Tooltip";

const muiTheme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  button: {
    position: "absolute",
    margin: theme.spacing.unit,
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3
  },
  fabMoveUp: {
    transform: "translate3d(0, 0, 0)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut
    })
  },
  fabMoveDown: {
    transform: "translate3d(0, 60px, 0)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.easeOut
    })
  },
  hide: {
    display: "none"
  }
});

const handleClick = props => {
  props.handleResultPaneOpen();
};

const ReopenResultPane = props => {
  const { classes } = props;
  return (
    <div>
      <MuiThemeProvider theme={muiTheme}>
        <Tooltip title="Open Latest Fetch" placement="top" enterDelay={500}>
          <Button
            variant="fab"
            aria-label="Show"
            color="primary"
            className={classNames(
              classes.button,
              props.resultPaneOpen
                ? classes.fabMoveDown
                : props.rows.length
                  ? classes.fabMoveUp
                  : classes.hide
            )}
            onClick={() => handleClick(props)}
          >
            <UpIcon />
          </Button>
        </Tooltip>
      </MuiThemeProvider>
    </div>
  );
};

ReopenResultPane.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReopenResultPane);
