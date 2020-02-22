//React
import React from 'react';

//Material-UI
import { Button, CircularProgress } from '@material-ui/core';

function ButtonLoading({ estilo, colorsito, loading }) {
	if (loading) {
		return <CircularProgress />;
	} else {
		return (
			<Button variant={estilo} type="submit" color={colorsito}>
				Acceder
			</Button>
		);
	}
}

export default ButtonLoading;