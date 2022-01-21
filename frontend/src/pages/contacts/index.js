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
  const { auth } = useSelector(state => state.auth.auth);

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
