import React from 'react'

// MUI
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionUser(props) {
  const { expand, handleChange, classes } = props;
  return (
    <>
      <Accordion 
				expanded={expand === 'descargar-boletas'} 
				onChange={handleChange('descargar-boletas')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='descargar-boletas-content'
					id='descargar-boletas-header'
				>
					<Typography sx={classes.heading}>
						¿Por qué no puedo descargar boletas?
					</Typography>
					<Typography sx={classes.secondaryHeading}>
						Causas y soluciones
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Si recibe el <strong>error "No tienes permisos para esta acción"</strong> al intentar <strong>descargar</strong> sus boletas es posible que tenga las boletas desactivadas, para poder solucionar este problema <strong>contacte directamente con un directivo</strong> del instituto <Box component='span' sx={classes.secondaryHeading}>(preferiblemente control de estudio)</Box> para poder solventar este inconveniente.
					</Typography>
				</AccordionDetails>
			</Accordion>
    </>
  )
}
