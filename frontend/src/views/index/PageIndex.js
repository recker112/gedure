import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Material-UI
import LockIcon from '@material-ui/icons/Lock';
import { Zoom } from '@material-ui/core';


//Componentes
import Form from './Form';
import AlertsState from '../../components/AlertsState';
import ReloginVerify from '../../components/ReloginVerify';

function PageIndex({auth, reloginSuccess}) {
  //Regresar contenido del login
  return(
		<ReloginVerify>
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
					<AlertsState />
				</main>
			</div>
		</ReloginVerify>
  )
}

export default PageIndex;