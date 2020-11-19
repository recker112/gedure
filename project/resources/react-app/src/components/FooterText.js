import React from 'react';

import { Box } from '@material-ui/core';

function FooterText({ ...rest }) {
	return (
		<Box {...rest} textAlign='center'>
			&copy; U.E.P A.P.E.P "La Candelaria" | 2020
			<br/>
			Desarrollado por Recker
			<br/>
			Powered by Gedure
		</Box>
	)
}

export default FooterText;