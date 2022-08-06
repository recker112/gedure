// MUI
import { Box, Container, Grid } from '@mui/material';

// Components
import Footer from '../../components/Footer';
import SecDirection from './SecDirection';
import SecDirectivo from './SecDirectivo';
import FormContact from './FormContact';

// Redux
import { useSelector } from 'react-redux';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Contact() {
  document.title = 'Contáctanos - La Candelaria';
  const { auth, count_notify } = useSelector(state => ({
    auth: state.auth.auth,
    count_notify: state.auth.notify.count,
  }));

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Contáctanos - La Candelaria` : 'Contáctanos - La Candelaria';

  return (
    <>
      <Box component='main' sx={classes.container}>
        <Container>
          <Grid container spacing={2} justifyContent='center'>
            <SecDirection />
            <SecDirectivo />
            {!auth && (
							<Grid item xs={12}>
								<FormContact />
							</Grid>
						)}
          </Grid>
        </Container>
      </Box>

      {!auth && <Footer />}
    </>
  )
}
