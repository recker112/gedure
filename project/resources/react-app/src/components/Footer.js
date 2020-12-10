import React from 'react';

import { 
	Box, 
	Container, 
	Grid,
	Typography,
	Link,
} from '@material-ui/core';

// Components
import gedureLogo from '../imgs/Gedure-Logo.png';

function Footer() {
	return (
		<Box bgcolor="primary.main" color="primary.contrastText" component="footer" py={4}>
			<Container>
				<Grid container alignItems="center">
					<Grid item xs={12} sm>
						<Typography>&copy; U.E.P A.P.E.P "La Candelaria" | 2020</Typography>
						<Typography variant="body2" className="text__opacity--semi">
							Desarrollado por Recker
						</Typography>
					</Grid>
					<Grid container direction="column" alignItems="flex-end" item xs={12} sm>
						<Typography variant="h5" className="text__opacity--semi text__bold--semi">
							Powered by
						</Typography>
						<Link href='https://github.com/recker112/gedure'>
							<img src={gedureLogo} alt="Logo de gedure" height="40" />
						</Link>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Footer;