import { Typography, Box, Stack, Container, Paper, Divider } from "@mui/material";
import Footer from "../../components/Footer";

import institutoLogo from '../../img/instituto.jpg';
import SectionEtapas from "./SectionEtapas";
import SectionExpand from "./SectionExpand";
import SectionInfo from "./SectionInfo";

const classes = {
  container: {
		marginBottom: 10,
  },
  header: (theme) => ({
		bgcolor: theme.palette.primary.main + 'c7',
		height: 500,
	}),
  headerImg: {
		background: `url(${institutoLogo})`,
		backgroundAttachment: 'fixed',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		height: 500,
	},
  containerContent: {
		position: 'relative',
		top: -70,
	},
}

export default function Home() {
  document.title = 'La Candelaria';

  return (
    <>
      <Box component='main' sx={classes.container}>
        <Box sx={classes.headerImg}>
          <Box sx={classes.header}>
            <Stack 
              justifyContent="center"
              alignItems="center"
              height='100%'
            >
              <Typography sx={{color: 'primary.contrastText'}} align="center" variant="h3" className="text__bold--big">
                Enfocados en el Estudio y la Fe
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Container sx={classes.containerContent}>
          <Stack direction='column' spacing={3}>
            <Paper className="paper--padding">
              <Typography align="center">
              La U.E.P A.P.E.P “La Candelaria" brinda sus instalaciones a estudiantes de Primaria, Centro Taller Pre-Vocacional a los estudiantes de 6to grado de Escuelas Amigas, Media General y Media Técnica, tiene como norte la formación integral, en valores y principios religiosos, basados en la Fe Católica. Siguiendo la Filosofía APEP educar para la vida, para el trabajo. Los futuros Técnicos medios en las diferentes menciones tienen la oportunidad de iniciarse en el campo laboral luego de realizar el proceso de pasantías en su último año.
              </Typography>
            </Paper>
            <Box>
              <SectionInfo />
            </Box>
            <SectionExpand />
          </Stack>
        </Container>
        <Divider style={{position: 'relative', top: -35}} />
        <Container>
          <SectionEtapas />
        </Container>
      </Box>
      <Footer />
    </>
  )
}
