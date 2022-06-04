import React from 'react';

// MUI
import { Box, Button, Container, Grid } from '@mui/material';

// Redux
import { useSelector } from 'react-redux';
import Table from './Table';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Boletas() {
  document.title = 'Boletas - La Candelaria';

  const { administrar: { boletas_upload } } = useSelector((state) => state.auth.permissions);

  const handleOpenUpload = () => {
    //
  }

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Boletas
        </Box>
        <Grid container spacing={2}>
          <Grid container justifyContent="flex-end" item xs={12}>
            <Button variant="contained" onClick={handleOpenUpload} disabled={!boletas_upload}>Cargar boletas</Button>
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
