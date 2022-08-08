import React from 'react';

// MUI
import { Box, Container, Grid } from '@mui/material';

// Components
import Table from './Table';

// Redux
import { useSelector } from 'react-redux';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Transacciones() {
  const { count_notify } = useSelector(state => ({
    count_notify: state.auth.notify.count
  }));

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Transacciones - La Candelaria` : `Transacciones - La Candelaria`;

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Transacciones
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
