import React from 'react'

// MUI
import { Box, Container } from '@mui/material';

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
        X
      </Container>
    </Box>
  )
}
