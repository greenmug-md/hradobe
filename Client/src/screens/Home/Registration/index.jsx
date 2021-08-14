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
import { useHistory, useRouteMatch } from "react-router-dom";
import validator from "validator";
import UserAccount from "../../../api/UserAccount";
import Loading from "../../../components/dialog/Loading";
import Role from "../../../utils/constants";


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
    marginTop: theme.spacing(3),
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


function SignUp() {
  let history = useHistory();
  const classes = useStyles();
  let match = useRouteMatch();
  
  let [companyForm, setCompanyForm] = useState(Role.CANDIDATE);
  let [firstName, setfirstName] = useState("");
  let [lastName, setlastName] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [confirmpassword, setConfirmPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [companyname, setCompanyname] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  let onCloseSnackBar = () => {
    setErrorMessage("");
  };

  let onChangeUserNameField = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  let onChangePasswordField = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  let onChangeConfirmPasswordField = useCallback((event) => {
    setConfirmPassword(event.target.value);
  }, []);

  let onChangeFirstNameField = useCallback((event) => {
    setfirstName(event.target.value);
  }, []);

  let onChangeEmailField = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  let onChangeLastNameField = useCallback((event) => {
    setlastName(event.target.value);
  }, []);

  let onChangeCompanyNameField = useCallback((event) => {
    setCompanyname(event.target.value);
  }, []);

  let onClickInRadioButton = useCallback((event) => {
    setCompanyForm(event.target.value);
  });

  let onClickSignUpButton = async (e) => {
    e.preventDefault();

    if (
      (companyForm === Role.CANDIDATE &&
        username &&
        password &&
        firstName &&
        lastName &&
        confirmpassword &&
        companyname &&
        email) ||
      (companyForm == Role.COMPANY &&
        username &&
        password &&
        confirmpassword &&
        companyname &&
        email)
    ) {
      if (companyForm === Role.COMPANY) {
        firstName = username;
        lastName = username;
      }
      if (password !== confirmpassword) {
        setErrorMessage("Passwords do not match");
      } else if (!validator.isEmail(email)) {
        setErrorMessage("Invalid Email");
      } else {
        try {
          await UserAccount.signUp({
            username: username,
            password: password,
            role: companyForm,
            firstname: firstName,
            company: companyname,
            email: email,
            lastname: lastName,
          });

          let parentPath = match.url.replace(/[/][\w]+$/, "");
          let loginPath = `${parentPath}/logIn`;

          setErrorMessage("");
          history.push(loginPath);
        } catch (error) {
          console.log(error);
          setErrorMessage(error.message);
        } finally {
        }
        return false;
      }
    } else {
      setErrorMessage(
        "Some fields are missing, Please fill all required fields"
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={4000}
        onClose={onCloseSnackBar}>
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
            Sign up
          </Typography>

          <RadioGroup row aria-label="role" name="role">
            <FormControlLabel
              checked={companyForm === "CANDIDATE" ? true : false}
              value={Role.CANDIDATE}
              control={<Radio />}
              label={Role.CANDIDATE}
              onClick={onClickInRadioButton}
            />
            <FormControlLabel
              checked={companyForm === "CANDIDATE" ? false : true}
              value={Role.COMPANY}
              control={<Radio />}
              label={Role.COMPANY}
              onClick={onClickInRadioButton}
            />
          </RadioGroup>

          <form id="candidate" className={classes.form}>
            <Grid container spacing={2}>
              <Grid
                style={{
                  display: companyForm === "CANDIDATE" ? "block" : "none",
                }}
                item
                xs={12}
                sm={6}
              >
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={firstName}
                  id="firstName"
                  label="First Name"
                  onChange={onChangeFirstNameField}
                  autoFocus
                />
              </Grid>
              <Grid
                style={{
                  display: companyForm === "CANDIDATE" ? "block" : "none",
                }}
                item
                xs={12}
                sm={6}
              >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={onChangeLastNameField}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="Username"
                  value={username}
                  onChange={onChangeUserNameField}
                  autoComplete="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={onChangePasswordField}
                  autoComplete="current-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmpassword}
                  onChange={onChangeConfirmPasswordField}
                  id="confirmpassword"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChangeEmailField}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={companyname}
                  onChange={onChangeCompanyNameField}
                  name="companyname"
                  label="Company Name"
                  id="companyname"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClickSignUpButton}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/home/logIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Loading>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;
