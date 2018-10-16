import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const styles = {
  list: { width: 240 }
};

class FilterMenu extends React.Component {
  toggleDrawer = () => {
    this.props.menuOpen(false);
  };

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        open={this.props.filterMenuOpen}
        anchor="right"
        onClose={this.toggleDrawer}
      >
        <div className={classes.list}>
          <List component="nav">
            <ListItem>Hello</ListItem>
            <Divider />
          </List>
        </div>
      </Drawer>
    );
  }
}

FilterMenu.PropTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)(FilterMenu);
