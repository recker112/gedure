import { Box, Grid, Slide } from "@mui/material";

import Aside from "./Aside";
import institutoFondo from '../../img/instituto.jpg';
import Form from "./Form";
import useNotifier from "../../hooks/useNotifier";

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
		width: '100%'
  }
};

export default function Login() {
  document.title = 'Entrar - La Candelaria';
  useNotifier();

  return (
    <Box component='main' sx={classes.container}>
      <Grid container sx={{height: '100%'}}>
        <Slide direction="right" in={true}>
          <Grid container item sm md sx={classes.fondo}>
            <Aside />
          </Grid>
        </Slide>

        <Slide direction="left" in={true}>
          <Grid container alignItems='center' item sm={12} md={8}>
            <Form />
          </Grid>
        </Slide>
      </Grid>
    </Box>
  );
}
