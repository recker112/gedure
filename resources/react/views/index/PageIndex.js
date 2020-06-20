import React from 'react';

//Material-UI
import LockIcon from '@material-ui/icons/Lock';
import { Zoom, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

//Componentes
import Form from './Form';
import VerifyRelogin from './VerifyRelogin';

function PageIndex({ auth, reloginSuccess }) {
	//Resolution RESPONSIVE
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	
	const classMobile = fullScreen ? 'Container--Mobile' : '';
	
	//Regresar contenido del login
	return (
		<VerifyRelogin>
			<main className={`Container ${classMobile}`}>
				<Zoom in={true} timeout={600}>
					<div className="HeadBox">
						<span className="HeadBox__Icon">
							<LockIcon style={{ fontSize: 40 }} />
						</span>
						<h1 className="HeadBox__Title">U.E.P A.P.E.P La Candelaria</h1>
						<h2 className="HeadBox__SubTitle">Turmero - Estado Aragua</h2>
					</div>
				</Zoom>
				<Form />
			</main>
		</VerifyRelogin>
	);
}

export default PageIndex;