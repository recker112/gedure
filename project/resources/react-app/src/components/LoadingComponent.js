import React from 'react';

import { CircularProgress, Backdrop, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	progress: {
		position: 'absolute',
	},
	progressLabel: {
		marginTop: 5,
	},
}));

function LoadingComponent(props) {
	const { loading, backDrop = false, children } = props;

	const SelectProgressBar = (props) => {
		const { color = 'primary', progressLabel, progressLoading, progress, ...rest } = props;
		const classes = useStyles();

		if (progressLoading && progress <= 99) {
			return (
				<Grid container justify="center" alignItems="center" {...rest}>
					<Grid container justify="center" alignItems="center" item xs={12}>
						<CircularProgress color={color} variant="static" value={progress} />
					</Grid>
					<span className={classes.progress}>{progress}%</span>
					{progressLabel && (
						<Grid item xs>
							<span className={classes.progressLabel}>{progressLabel}</span>
						</Grid>
					)}
				</Grid>
			);
		}

		return <CircularProgress color={color} {...rest} />;
	};

	if (loading && !backDrop) {
		return <SelectProgressBar {...props} />;
	}

	if (loading && backDrop) {
		return (
			<Backdrop open={true} style={{ zIndex: 200 }}>
				<SelectProgressBar {...props} />
			</Backdrop>
		);
	}

	return children;
}

export default LoadingComponent;