import React, { useMemo } from 'react'

// MUI
import { Box, Container, Grid } from '@mui/material';
import Filtrador from './Filtrador';

// Table
import ReactTableBase from '../../../components/ReactTableBase';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Registros() {
  document.title = 'Registros - La Candelaria';

  const columns = useMemo(() => [
    {
      Header: 'Usuario',
      accessor: 'username',
    },
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Acción',
      accessor: 'action',
    },
    {
      Header: 'Fecha',
      accessor: 'created_at',
    }
  ],[]);

  const data = useMemo(() => [{
    username: 'recker1',
    name: 'José Ortiz',
    action: 'Entrar, afirmativo',
    created_at: 'hoy'
  },{
    username: 'recker2',
    name: 'José Ortiz',
    action: 'Entrar, afirmativo',
    created_at: 'hoy'
  },{
    username: 'recker3',
    name: 'José Ortiz',
    action: 'Entrar, afirmativo',
    created_at: 'hoy'
  },{
    username: 'recker4',
    name: 'José Ortiz',
    action: 'Entrar, afirmativo',
    created_at: 'hoy'
  },{
    username: 'recker5',
    name: 'José Ortiz',
    action: 'Entrar, afirmativo',
    created_at: 'hoy'
  }], []);

  return (
    <Box component='main' sx={classes.container}>
      <Container>
        <Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Registros</Box>
        <Grid container spacing={2}>
          <Filtrador />
          <Grid item xs={12}>
            <ReactTableBase
              data={data}
              columns={columns}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
