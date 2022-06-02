import React from 'react';

// MUI
import { Box, Button, Container, Grid } from '@mui/material';

// Components
import Table from './Table';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Publicaciones() {
  document.title = 'Publicaciones - La Candelaria';

  const handleOpenCreate = () => {

  }

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Publicaciones
        </Box>
        <Grid container spacing={2}>
          <Grid container justifyContent="flex-end" item xs={12}>
            <Button variant="contained" onClick={handleOpenCreate}>Crear publicación</Button>
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
