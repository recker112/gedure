import React from 'react';

import { 
	Box, 
	Container, 
	Grid,
	Typography,
	Link,
} from '@material-ui/core';

// Components
import GedureLogo from '../imgs/gedure-logo-recto.svg';

function Footer() {
	return (
		<Box bgcolor="primary.main" color="primary.contrastText" component="footer" py={3}>
			<Container>
				<Grid container alignItems="center">
					<Grid item xs={12} sm>
						<Typography>&copy; U.E.P A.P.E.P "La Candelaria" | 2020</Typography>
						<Typography variant="body2" className="text__opacity--semi">
							Desarrollado por Recker
						</Typography>
					</Grid>
					<Grid container direction="column" alignItems="flex-end" item xs={12} sm>
						<Typography variant="h6" className="text__opacity--semi text__bold--semi">
							Powered by
						</Typography>
						<Link href='https://github.com/recker112/gedure'>
							<img src={GedureLogo} alt="Logo de gedure" height="30" style={{opacity: 0.99}} />
						</Link>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Footer;