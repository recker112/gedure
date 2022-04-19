import React from 'react'

// MUI
import { Box, Container, Grid } from '@mui/material';
import Filtrador from './Filtrador';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Registros() {
  document.title = 'Registros - La Candelaria';

  return (
    <Box component='main' sx={classes.container}>
      <Container>
        <Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Registros</Box>
        <Grid container spacing={2}>
          <Filtrador />
        </Grid>
      </Container>
    </Box>
  )
}
