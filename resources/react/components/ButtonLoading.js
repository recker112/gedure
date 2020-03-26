//React
import React from 'react';

//Material-UI
import { Button, CircularProgress } from '@material-ui/core';

function ButtonLoading({ estilo, colorsito, loading, text }) {
	if (loading) {
		return <CircularProgress color={colorsito} />;
	} else {
		return (
			<Button variant={estilo} type="submit" color={colorsito}>
				{text}
			</Button>
		);
	}
}

export default ButtonLoading;