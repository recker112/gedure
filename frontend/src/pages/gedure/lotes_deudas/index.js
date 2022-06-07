import React from 'react';

// MUI
import { Box, Button, Container, Grid } from '@mui/material';

// Components
import DialogConfirmation from '../../../components/DialogConfirmation';
import useNotifier from '../../../hooks/useNotifier';

// Redux
import { useSelector } from 'react-redux';
import Table from './Table';
import { deletePost, setConfirmConfgsPUB } from '../../../store/slices/gedure/publicaciones/confirmDialogs';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function LotesDeudas() {
  document.title = 'Lotes de deudas - La Candelaria';
  useNotifier();

  const { administrar: { posts_create } } = useSelector((state) => state.auth.permissions);

  const handleOpenCreate = () => {
    //
  }

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Lotes de deudas
        </Box>
        <Grid container spacing={2}>
          <Grid container justifyContent="flex-end" item xs={12}>
            <Button variant="contained" data-tour="gdPub__create" onClick={handleOpenCreate} disabled={!posts_create}>Crear lote de deudas</Button>
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
      <DialogConfirmation
        rdx1='gdPUBConfirm' 
        rdx2='delete'
        close={
          setConfirmConfgsPUB({open: false, data: {}, confirm: 'delete'})
        }
        request={
          data => deletePost(data.slug)
        }
      >
        {(data) => (<span>Está a punto de eliminar la noticia <strong>{data.title}</strong>. Una vez realizada no se podrá deshacer esta acción.</span>)}
      </DialogConfirmation>
    </Box>
  )
}
