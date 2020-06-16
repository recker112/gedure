//React
import React from 'react';

//Material-UI
import { Button, CircularProgress, Backdrop } from '@material-ui/core';

function ProgressBar({color, progress, label}) {
	return (
		<React.Fragment>
			<CircularProgress 
				color={color} 
				variant="static" 
				value={progress} 
			/>
			<span style={{position: 'relative', top: '-30px'}}>
				{progress}%
			</span>
			{label && (
				<span style={{position: 'relative', top: '-10px'}}>
					{label}
				</span>
			)}
		</React.Fragment>
	);
}

function BackDropLoading({ 
	loading, 
	progress, 
	progressBar, 
	colorsito, 
	progressLabel 
}) {
	if(loading && progressBar && progress !== 100) {
		return (
			<Backdrop open={true} style={{zIndex: 200}}>
				<ProgressBar 
					color={colorsito} 
					progress={progress} 
					label={progressLabel}
				/>
			</Backdrop>
		);
	}else {
		return (
			<Backdrop open={true} style={{zIndex: 200}}>
				<CircularProgress color={colorsito} />
			</Backdrop>
		);
	}
}

function ButtonLoading({ 
	estilo, 
	colorsito, 
	loading, 
	text, 
	onClick = ()=>{},
	progressBar = false, 
	progress = 0,
	progressLabel = false,
	backDrop = false
}) {
	if (loading && !backDrop) {
		if (progressBar && progress !== 100) {
			return (
				<ProgressBar 
					color={colorsito} 
					progress={progress} 
					label={progressLabel}
				/>
			);
		}else {
			return (
				<CircularProgress color={colorsito} />
			);
		}
	} else {
		return (
			<React.Fragment>
				<Button onClick={onClick} variant={estilo} type="submit" color={colorsito}>
					{text}
				</Button>
				{loading && <BackDropLoading
					loading={true}
					progress={progress}
					progressBar={progressBar}
					colorsito={colorsito}
					progressLabel={progressLabel}
				/> }
			</React.Fragment>
		);
	}
}

export default ButtonLoading;