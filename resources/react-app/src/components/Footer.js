import React from 'react';

import { Box } from '@material-ui/core';

function Footer({ ...rest }) {
	return (
		<Box {...rest} textAlign='center'>
			&copy; 2020 - Desarrollado por Recker
			<br/>
			Powered by Gedure
		</Box>
	)
}

export default Footer;