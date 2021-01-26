import React from 'react';

import { CircularProgress, Backdrop, Grid, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	progressLabel: {
		marginTop: 5,
	},
}));

function LoadingComponent(props) {
	const { loading, backDrop = false, children } = props;

	const SelectProgressBar = (props) => {
		const { color = 'primary', progressLabel, progressLoading, progress } = props;
		const classes = useStyles();

		if (progressLoading && progress <= 99) {
			return (
				<Box>
					<Box position="relative" display="inline-flex">
						<CircularProgress color={color} variant="static" value={progress} />
						<Box
							top={0}
							left={0}
							bottom={0}
							right={0}
							position="absolute"
							display="flex"
							alignItems="center"
							justifyContent="center"
						>
							<Typography variant="caption" component="div" color="textSecondary">
								{progress}%
							</Typography>
						</Box>
					</Box>
					{progressLabel && (
						<Grid container justify='center'>
							<span className={classes.progressLabel}>{progressLabel}</span>
						</Grid>
					)}
				</Box>
			);
		}

		return <CircularProgress color={color} />;
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