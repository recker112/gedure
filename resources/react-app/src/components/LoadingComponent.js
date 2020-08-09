import React from 'react';

import { CircularProgress, Backdrop } from '@material-ui/core';

function LoadingComponent(props) {
	const { loading, color='primary', backDrop = false, children } = props;
	
	if (loading && !backDrop) {
		return <CircularProgress color={color} />
	}
	
	if (loading && backDrop) {
		return (
			<Backdrop open={true} style={{zIndex: 200}}>
				<CircularProgress color={color} />
			</Backdrop>
		);
	}
	
	return children;
}

export default LoadingComponent;