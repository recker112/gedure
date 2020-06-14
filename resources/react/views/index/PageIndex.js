import React from 'react';

//Material-UI
import LockIcon from '@material-ui/icons/Lock';
import { Zoom } from '@material-ui/core';

//Componentes
import Form from './Form';
import VerifyRelogin from './VerifyRelogin';

function PageIndex({ auth, reloginSuccess }) {
	//Regresar contenido del login
	return (
		<VerifyRelogin>
			<main class="Container">
				<Zoom in={true} timeout={600}>
					<div className="HeadBox">
						<span className="HeadBox__Icon">
							<LockIcon style={{ fontSize: 40 }} />
						</span>
						<h1 className="HeadBox__Title">La Candelaria</h1>
					</div>
				</Zoom>
				<Form />
			</main>
		</VerifyRelogin>
	);
}

export default PageIndex;