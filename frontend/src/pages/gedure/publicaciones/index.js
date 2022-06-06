import React from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { Box, Button, Container, Grid } from '@mui/material';

// Components
import Table from './Table';
import DialogConfirmation from '../../../components/DialogConfirmation';
import useNotifier from '../../../hooks/useNotifier';
import TourPublic from './TourPublic';

// Redux
import { useSelector } from 'react-redux';
import { deletePost, setConfirmConfgsPUB } from '../../../store/slices/gedure/publicaciones/confirmDialogs';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Publicaciones() {
  document.title = 'Publicaciones - La Candelaria';
  useNotifier();

  const { administrar: { posts_create } } = useSelector((state) => state.auth.permissions);

  const navigate = useNavigate();

  const handleOpenCreate = () => {
    navigate('crear');
  }

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Publicaciones
        </Box>
        <Grid container spacing={2}>
          <Grid container justifyContent="flex-end" item xs={12}>
            <Button variant="contained" data-tour="gdPub__create" onClick={handleOpenCreate} disabled={!posts_create}>Crear publicación</Button>
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
      <TourPublic />
    </Box>
  )
}
