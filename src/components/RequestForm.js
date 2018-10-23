import React from "react";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grow from "@material-ui/core/Grow";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import InputAdornment from "@material-ui/core/InputAdornment";
import Error from "@material-ui/icons/Error";
import Send from "@material-ui/icons/Send";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";

import Fetcher from "../utils/Fetcher";
import { Paper } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: blue[500]
    }
  }
});

const styles = theme => ({
  submit: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  }
});

class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.url = React.createRef();
    this.AbortController = new window.AbortController();
  }
  state = {
    fetchError: "",
    fetchLoading: false
  };

  handleClose = () => {
    this.AbortController.abort();
    this.props.handleRequestFormClose();
    this.setState({ fetchError: "" });
  };

  handleCloseChip = () => {
    this.setState({ fetchError: "" });
  };

  handleChange = (e, paramIndex, nestedIndex) => {
    this.props.handleParameterChange(e, paramIndex, nestedIndex);
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.AbortController = new window.AbortController();
    this.setState({ fetchError: "", fetchLoading: true });
    try {
      let response;
      switch (this.props.methodType) {
        case "get":
          response = await Fetcher.doGetMethod(
            this.url.current.props.value,
            this.AbortController.signal
          );
          break;
        case "post":
          response = await Fetcher.doPostMethod(
            this.url.current.props.value,
            this.AbortController.signal
          );
          break;
        default:
          this.setState({ fetchError: "Unknown method type" });
      }
      if (!response.ok) {
        this.setState({ fetchError: response.statusText });
        return;
      }
      const json = await response.json();
      this.handleClose();
      this.props.handleResponse(json);
    } catch (error) {
      if (error.name === "AbortError") {
        this.props.handleInfoMessage(error.message);
        return;
      }
      this.setState({ fetchError: error.message });
    } finally {
      this.setState({ fetchLoading: false });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          open={this.props.getFormOpen}
          onClose={this.handleClose}
          fullWidth
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
            <DialogContent>
              <TextField
                ref={this.url}
                disabled
                label="URL"
                value={
                  this.props.wholePath +
                  (this.props.query === "query"
                    ? this.props.parameterVariables
                        .map(param => param.name + "=" + param.value)
                        .join("&")
                    : this.props.query === "path"
                      ? this.props.parameterVariables
                          .map(param => param.value)
                          .join("/")
                      : "")
                }
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <br />
              <Paper style={{ padding: 25 }}>
                {this.props.parameters.length ? (
                  this.props.parameters.map((param, i) => {
                    return param.parameters ? ( // Nested parameters?
                      <React.Fragment key={i}>
                        <Typography variant="button">{param.name}</Typography>
                        <Divider />
                        {param.parameters.map((p, j) => {
                          return (
                            <div key={p.name}>
                              <FormControl required fullWidth>
                                <TextField
                                  margin="dense"
                                  name={p.name}
                                  label={p.name + " (" + p.type + ")"}
                                  type={
                                    p.type === "integer" ? "number" : p.type
                                  }
                                  required
                                  inputProps={{
                                    maxLength: p.maxLength ? p.maxLength : 0
                                  }}
                                  helperText={"*Required"}
                                  onChange={e => this.handleChange(e, i, j)}
                                  fullWidth
                                />
                              </FormControl>
                            </div>
                          );
                        })}
                        <br />
                      </React.Fragment>
                    ) : (
                      // Usual form
                      <div key={param.name}>
                        <FormControl required fullWidth>
                          <TextField
                            margin="dense"
                            name={param.name}
                            label={param.name + " (" + param.type + ")"}
                            type={
                              param.type === "integer" ? "number" : param.type
                            }
                            required={param.required ? param.required : true}
                            inputProps={{
                              maxLength: param.maxLength ? param.maxLength : 0
                            }}
                            helperText={param.required ? "*Required" : ""}
                            onChange={e => this.handleChange(e, i)}
                            fullWidth
                          />
                        </FormControl>
                        <br />
                      </div>
                    );
                  })
                ) : (
                  <Typography>No parameters needed</Typography>
                )}
                <br />
              </Paper>
              <br />
              <div>
                {this.props.parameters.length !== 0 && (
                  <Button
                    onClick={this.handleClearAll}
                    color="primary"
                    size="small"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              <br />
              {this.state.fetchError !== "" && (
                <Grow in>
                  <Chip
                    label={this.state.fetchError}
                    icon={<Error />}
                    onDelete={this.handleCloseChip}
                    color="secondary"
                  />
                </Grow>
              )}
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={this.handleClose} color="default">
                Cancel
              </Button>
              <div style={{ position: "relative", margin: 8 }}>
                <Button disabled={this.state.fetchLoading} type="submit">
                  {this.props.methodType.toUpperCase()}
                  <Send style={{ marginLeft: 10 }} fontSize="small" />
                </Button>
                {this.state.fetchLoading && (
                  <CircularProgress
                    size={24}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: -12,
                      marginLeft: -12
                    }}
                  />
                )}
              </div>
            </DialogActions>
          </form>
        </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(RequestForm);
