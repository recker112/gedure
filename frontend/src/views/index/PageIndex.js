import React from 'react';

//Material-UI
import LockIcon from '@material-ui/icons/Lock';
import { Zoom } from '@material-ui/core';

//Componentes
import Form from './Form';
import RedirectVerify from '../../components/RedirectVerify';

function PageIndex({ auth, reloginSuccess }) {
	//Titulo
	document.title = 'La Candelaria - Login';

	//Regresar contenido del login
	return (
		<RedirectVerify>
			<div className="BoxPageIndex">
				<main>
					<Zoom in={true} timeout={600}>
						<div className="HeadMain">
							<span className="IconBoxIndex">
								<LockIcon style={{ fontSize: 40 }} />
							</span>
							<span className="TitleIndex">La Candelaria</span>
						</div>
					</Zoom>
					<Form />
				</main>
			</div>
		</RedirectVerify>
	);
}

export default PageIndex;