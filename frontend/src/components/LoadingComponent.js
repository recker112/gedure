import React from 'react';

import { CircularProgress, Backdrop, Grid, Box, Typography } from '@mui/material';

const classes = {
	progressLabel: {
		marginTop: 5,
	},
};

function LoadingComponent(props) {
	const { loading, backDrop = false, children } = props;

	const SelectProgressBar = (props) => {
		const { color = 'primary', progressLabel, progressLoading, progress } = props;

		if (progressLoading && progress <= 99) {
			return (
				<Box>
					<Box sx={{ position: 'relative', display: 'inline-flex' }}>
						<CircularProgress color={color} variant="determinate" value={progress} />
						<Box
							sx={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Typography variant="caption" component="div" color="textSecondary">
								{progress}%
							</Typography>
						</Box>
					</Box>
					{progressLabel && (
						<Grid container justify='center' sx={classes.progressLabel}>
							<span>{progressLabel}</span>
						</Grid>
					)}
				</Box>
			);
		}

		return <CircularProgress color={color} size={props.size} />;
	};

	if (loading && !backDrop) {
		return <SelectProgressBar {...props} />;
	}

	if (loading && backDrop) {
		return (
			<>
				<Backdrop open={true} style={{ zIndex: 200 }}>
					<SelectProgressBar {...props} />
				</Backdrop>
				{children}
			</>
		);
	}

	return children;
}

export default LoadingComponent;