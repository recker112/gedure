import React, { useState } from 'react'

// MUI
import { Box, Container, Fade, Grid, Slide } from '@mui/material';

// Components
import AccordionAdmin from './AccordionAdmin';
import AccordionUser from './AccordionUser';

// Redux
import { useSelector } from 'react-redux';

const classes = {
  container: {
    flexGrow: 1,
  },
  header: (theme) => ({
		background: theme.palette.primary.main,
		height: 300,
		borderRadius: '0px 0px 15px 15px'
	}),
  content: {
		position: 'relative',
		top: -60,
	},
  heading: (theme) => ({
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	}),
	secondaryHeading: (theme) => ({
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	})
}

function Header() {
  return (
    <Container sx={{height: '100%'}}>
      <Grid container justifyContent='flex-start' alignItems='center' sx={{height: '100%'}}>
				<Grid item xs>
					<Box color='primary.contrastText' fontSize={{ xs: 'h5.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }} className='text__bold--semi'>
						<Box color='secondary.main' component='span'>Preguntas</Box> frecuentes,
					</Box>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize' }} className='text__bold--semi'>
          resuelva sus dudas sobre <Box color='secondary.main' component='span'>Gedure</Box>
					</Box>
				</Grid>
			</Grid>
    </Container>
  );
}

export default function FAQ() {
  document.title = 'La Candelaria - Preguntas Frecuentes';
  const [expand, setExpand] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
		setExpand(isExpanded ? panel : false);
	}
  
  const privilegio = useSelector(state => state.auth.user.privilegio);

  return (
    <Box component='main' sx={classes.container}>
      <Slide direction="down" in={true} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={classes.header}>
          <Header />
        </Box>
      </Slide>
      <Fade in={true} style={{ transitionDelay: '1000ms' }}>
        <Container sx={classes.content}>
          {privilegio === "A-" && (
            <AccordionAdmin expand={expand} handleChange={handleChange} classes={classes} />
          )}

          {privilegio === "V-" && (
            <AccordionUser expand={expand} handleChange={handleChange} classes={classes} />
          )}
        </Container>
      </Fade>
    </Box>
  )
}