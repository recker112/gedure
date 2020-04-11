//React
import React from 'react';

//Material-UI
import { Button, CircularProgress } from '@material-ui/core';

function ButtonLoading({ 
	estilo, 
	colorsito, 
	loading, 
	text, 
	progressBar = false, 
	progress = 0,
	progressLabel = false
}) {
	if (loading) {
		if (progressBar && progress !== 100) {
			return (
				<React.Fragment>
					<CircularProgress 
						color={colorsito} 
						variant="static" 
						value={progress} 
					/>
					<span style={{position: 'relative', top: '-30px'}}>
						{progress}%
					</span>
					{progressLabel && (
						<span style={{position: 'relative', top: '-10px'}}>
							{progressLabel}
						</span>
					)}
				</React.Fragment>
			);
		}else {
			return (
				<CircularProgress color={colorsito} />
			);
		}
	} else {
		return (
			<Button variant={estilo} type="submit" color={colorsito}>
				{text}
			</Button>
		);
	}
}

export default ButtonLoading;