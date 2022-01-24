import { Box, Grid, Slide } from "@mui/material";

import Aside from "./Aside";
import institutoFondo from '../../img/instituto.jpg';

const classes = {
  container: {
    flexGrow: 1,
  },
  aside: (theme) => ({
    background: theme.palette.primary.main + 'c7',
  }),
  fondo: {
    background: `url(${institutoFondo}) no-repeat`,
		backgroundSize: 'cover',
		width: '100%',
    height: '100%'
  }
};

export default function Login() {
  document.title = 'La Candelaria - Entrar';

  return (
    <Box component='main' sx={classes.container}>
      <Grid container style={{height: '100%'}}>
        <Slide direction="right" in={true}>
          <Grid container alignItems='center' item sm md sx={classes.fondo}>
            <Aside />
          </Grid>
        </Slide>

        <Slide direction="left" in={true}>
          <Grid container alignItems='center' item sm={12} md={8}>
            FORM
          </Grid>
        </Slide>
      </Grid>
    </Box>
  );
}
