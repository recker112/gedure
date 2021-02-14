import React from 'react';

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function AccordionUser({ expanded, handleChange, classes }) {
	return (
		<React.Fragment>
			<Accordion 
				expanded={expanded === 'descargar-boletas'} 
				onChange={handleChange('descargar-boletas')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='descargar-boletas-content'
					id='descargar-boletas-header'
				>
					<Typography className={classes.heading}>
						¿Por qué no puedo descargar boletas?
					</Typography>
					<Typography className={classes.secondaryHeading}>
						Causas y soluciones
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Si recibe el <strong>error "No tienes permisos para esta acción"</strong> al intentar <strong>descargar</strong> sus boletas es posible que tenga las boletas desactivadas, para poder solucionar este problema <strong>contacte directamente con un directivo</strong> del instituto <span className={classes.secondaryHeading}>(preferiblemente control de estudio)</span> para poder solventar este inconveniente.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</React.Fragment>
	);
}