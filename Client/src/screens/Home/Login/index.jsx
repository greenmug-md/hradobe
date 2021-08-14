import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import { Alert } from "@material-ui/lab";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import AxiosInstance from "../../../api/AxiosInstance";
import Auth from "../../../api/Login";
import UserAccount from "../../../api/UserAccount";
import Loading from "../../../components/dialog/Loading";
import Session from "../../../utils/Session";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        HR Signing Platform
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignIn() {
  let history = useHistory();
  const classes = useStyles();
  let [companyForm, setCompanyForm] = useState("Candidate");
  let [username, setUsername] = useState("");
  let [loading, setLoading] = useState(false);
  let [password, setPassword] = useState("");

  let [errorMessage, setErrorMessage] = useState("");

  let onClickInRadioButton = useCallback((event) => {
    setCompanyForm(event.target.value);
  });

  let onChangeUsernameField = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  let onChangePasswordField = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  let onClickSignInButton = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (username && password) {
      try {
        let token = await Auth.logIn(username, password, companyForm);

        AxiosInstance.setToken(token);

        let basicData = await UserAccount.currentUser();
        Session.setData(basicData);
        setLoading(false)
        history.push("/dashboard");
        setErrorMessage("");
      } catch (error) {
        setLoading(false)
        console.log(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false)
      }
    }
  };

  let onCloseSnackBar = () => {
    setErrorMessage("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={4000}
        onClose={onCloseSnackBar}
      >
        <Alert onClose={onCloseSnackBar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Loading loading={loading}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          <SupervisorAccount />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={onChangeUsernameField}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={onChangePasswordField}
              autoComplete="current-password"
            />
            <RadioGroup row aria-label="role" name="role">
              <FormControlLabel
                value="CANDIDATE"
                control={<Radio />}
                label="CANDIDATE"
                onClick={onClickInRadioButton}
              />
              <FormControlLabel
                value="COMPANY"
                control={<Radio />}
                label="COMPANY"
                onClick={onClickInRadioButton}
              />
            </RadioGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClickSignInButton}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/home/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Loading>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;
