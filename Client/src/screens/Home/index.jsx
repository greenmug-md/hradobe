import { Box, Button, Typography } from "@material-ui/core";
import React from 'react';
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import styles from "./index.module.scss";
import LogIn from "./Login";
import SignUp from "./Registration";

function Main() {
	let { url } = useRouteMatch()
	return (
		<div className={styles.root}>
			<header className={styles.header}>

				<Typography className={styles.title} variant="h6">
						HR Signing Platform
				</Typography>

				<Box flexGrow={1} />

				<div className={styles.actionsContainer}>
					<Button className={styles.logInButton} to="/home/logIn" component={Link}>
						Log In
					</Button>

					<Button className={styles.signUpButton} variant="contained" to="/home/signUp" component={Link}>
						Sign Up
					</Button>
				</div>
			</header>

			<Switch>
				<Route exact path={`${url}/logIn`}>
					<LogIn />
				</Route>

				<Route exact path={`${url}/signUp`}>
					<SignUp />
				</Route>
			</Switch>
		</div>
	)
}

export default Main
