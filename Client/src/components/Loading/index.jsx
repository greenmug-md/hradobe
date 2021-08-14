import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress, Typography } from "@material-ui/core"

import classes from "./index.module.scss"

let Loading = (props) => {
	let {
		children,
		loading,
		message,
		...otherProps
	} = props

	return (
		<div className={classes.root} {...otherProps}>
			{children}

			<div className={loading ? classes.loading : classes.hideLoading}>
				<CircularProgress color="inherit" />

				{
					message && 
					<Typography className={classes.message}>
						{message}
					</Typography>
				}
			</div>
		</div>
	)
}

Loading.propTypes = {
	loading: PropTypes.bool,
	message: PropTypes.string
}

Loading.defaultProps = {
	loading: false,
	message: ""
}

export default Loading