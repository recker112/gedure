import React from 'react';

// MUI
import { Box, Container } from '@mui/material';

// Components
import Table from './Table';
import EditWallets from './EditWallets';
import useNotifier from '../../../hooks/useNotifier';

// Redux
import { useSelector } from 'react-redux';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function MonederoAdmin() {
  useNotifier();

  const { count_notify } = useSelector((state) => ({
    count_notify: state.auth.notify.count,
  }));

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Monederos - La Candelaria` : 'Monederos - La Candelaria';

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Monederos
        </Box>
        <Table />
        <EditWallets />
      </Container>
    </Box>
  )
}
