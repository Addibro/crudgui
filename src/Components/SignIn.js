import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";
import { VisibilityOff, Visibility } from "@material-ui/icons/";
import withStyles from "@material-ui/core/styles/withStyles";
import Fetcher from "../utils/Fetcher";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    marginBottom: theme.spacing.unit * 46.8
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends React.Component {
  state = {
    user: "",
    password: "",
    showPassword: false,
    submitted: false
  };

  handleShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    /* event.target.name is the name of the input, event.target.value is the value of the input.
       When a user enters something in the field, the "onChange" method will invoke */
  };

  handleSubmit = async event => {
    event.preventDefault(); // to bypass the default behaviour of form submits
    try {
      const response = await Fetcher.getWebServers();
      console.log(response.data);
      const data = "";
      this.props.handleSignOn(data);
    } catch (err) {}
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    const { showPassword, user, password, submitted } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Username</InputLabel>
                <Input
                  id="user"
                  name="user" // the property event.target.name uses
                  autoFocus
                  value={user}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={this.handleChange}
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                disabled={!user || !password || submitted} // !user checks for a faulsy value ("", undefined, 0 ect)
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
