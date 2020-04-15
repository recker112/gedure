import React from 'react';

//Material-UI
import LockIcon from '@material-ui/icons/Lock';
import { Zoom } from '@material-ui/core';

//Componentes
import Form from './Form';
import VerifyRelogin from './VerifyRelogin';
import ShowInfoVersion from '../../components/ShowInfoVersion';

function PageIndex({ auth, reloginSuccess }) {
	//Titulo
	document.title = 'La Candelaria - Login';

	//Regresar contenido del login
	return (
		<VerifyRelogin>
			<div className="BoxPageIndex">
				<main>
					<Zoom in={true} timeout={600}>
						<div className="HeadMain">
							<span className="IconBoxIndex">
								<LockIcon style={{ fontSize: 40 }} />
							</span>
							<h1 className="TitleIndex">La Candelaria</h1>
						</div>
					</Zoom>
					<Form />
				</main>
			</div>
			<ShowInfoVersion />
		</VerifyRelogin>
	);
}

export default PageIndex;