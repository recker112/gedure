import React from 'react'

// MUI
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionAdmin(props) {
  const { expand, handleChange, classes } = props;
  return (
    <>
      <Accordion
				expanded={expand === 'cargar-estudiantes'} 
				onChange={handleChange('cargar-estudiantes')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='cargar-estudiantes-content'
					id='cargar-estudiantes-header'
				>
					<Typography sx={classes.heading}>
						¿Cómo puedo cargar estudiantes?
					</Typography>
					<Typography sx={classes.secondaryHeading}>
						Formato e instrucciones
					</Typography>
          </AccordionSummary>
				<AccordionDetails>
					<Typography>
						Para poder cargar estudiantes dentro de <strong>Gedure</strong> ustéd necesita tener una <strong>nómina en excel</strong>, esta debe contener el <strong>formato de SACE</strong>, lo único que debe tener en cuenta es que <strong>cada sección debe estar separada en una hoja</strong>, y el nombre de las hoja debe contener el <strong>código del curso</strong> al que se desean cargar <Box component='span' sx={classes.secondaryHeading}>(los códigos de los cursos los puede ver en la Configurar Gedure)</Box>. Tenga en cuenta que si un estudiante <strong>no posee correo electrónico</strong> en esa nómina, no se le podrá enviar la invitación, pero el usuario <strong>se creará de todas maneras</strong>.
						<br />
						<br />
						Si un usuario <strong>ya está creado</strong> en el sistema, simplemente se le moverá de sección y se le actualizará el nombre <Box component='span' sx={classes.secondaryHeading}>(si es que se ha cambiado)</Box>.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion 
				expanded={expand === 'cargar-boletas'} 
				onChange={handleChange('cargar-boletas')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='cargar-boletas-content'
					id='cargar-boletas-header'
				>
					<Typography sx={classes.heading}>
						¿Cómo puedo cargar boletas?
					</Typography>
					<Typography sx={classes.secondaryHeading}>
						Formato e instrucciones
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						<strong>Gedure busca automáticamente</strong> al estudiante después de <strong>encontrar una cédula</strong> en el archivo <strong>PDF</strong>, esto le permite <strong>usar cualquier formato en la boleta</strong> ya que el sistema se encargará de adaptarse al formato dado. Debe de tener en cuenta que <strong>cada boleta</strong> debe estar <strong>separada</strong> y debe de tener el <strong>formato PDF</strong>, una vez cumpla esto requisitos simplemente <strong>comprima</strong> todas las boletas en el <strong>orden que quiera</strong> en un <strong>archivo ZIP</strong> y súbalo al servidor, el sistema se encargará de distribuirlas a los estudiantes existentes.
						<br />
						<br />
						Cabe destacar que <strong>solo puede subir boletas del curso actual</strong> donde esté el estudiante, si desea modificar boletas anteriores tendrá que hacerlo manualmente.
					</Typography>
				</AccordionDetails>
			</Accordion>
    </>
  )
}
