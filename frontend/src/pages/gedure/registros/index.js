import React from 'react'

// MUI
import { Box } from '@mui/material';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Registros() {
  return (
    <Box component='main' sx={classes.container}>
      <Container>
        X
      </Container>
    </Box>
  )
}
