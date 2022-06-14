import { Box, Container, Grid, Link, Typography } from "@mui/material";

// Components
import GedureLogo from '../img/gedure-logo-recto.svg';

export default function Footer() {
  return (
    <Box bgcolor='primary.main' color="primary.contrastText" component="footer" py={3}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} sm>
            <Typography>&copy; U.E.P A.P.E.P "La Candelaria" | 2022</Typography>
          </Grid>
          <Grid container direction='column' item xs={12} sm alignItems='flex-end'>
            <Typography variant="h6" className="text__opacity--semi text__bold--semi">
              Powered by
            </Typography>
            <Link target='_blank' href='https://github.com/recker112/gedure'>
              <img src={GedureLogo} alt="Logo de gedure" height="30" style={{opacity: 0.99}} />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
