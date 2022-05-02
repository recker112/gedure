import React, { useMemo, useEffect } from 'react'

// MUI
import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Components
import useNotifier from '../../../hooks/useNotifier';

// Table
import ReactTableBase from '../../../components/ReactTableBase';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getData, setSearch, setConfigTable, resetTableConfig, setRegBox } from '../../../store/slices/gedure/registros';
import Filtrador from './Filtrador';
import ShowRegistro from './ShowRegistro';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Registros() {
  document.title = 'Registros - La Candelaria';
  useNotifier({
    messageTo200: false,
  });

  const { dataR, loading, pageSize, pageCount } = useSelector(state => ({
    dataR: state.gdRegistros.tableData.data,
    loading: state.gdRegistros.tableData.loading,
    pageSize: state.gdRegistros.tableData.pageSize,
    pageCount: state.gdRegistros.tableData.pageCount,
  }));
  const dispatch = useDispatch();

  const columns = useMemo(() => [
    {
      Header: 'Usuario',
      accessor: 'username',
      Cell: ({ cell: { row: { original: { user: { privilegio, username } } } } }) => `${privilegio}${username}`
    },
    {
      Header: 'Nombre',
      accessor: 'name',
      Cell: ({ cell: { row: { original: { user: { name } } } } }) => name
    },
    {
      Header: 'Acción',
      accessor: 'action',
    },
    {
      Header: 'Fecha',
      accessor: 'created_at',
    },
    {
      id: 'options',
      Header: 'Opciones',
      accessor: 'options',
      Cell: ({ cell: { row: { original } } }) => (
        <Tooltip title='Ver detalles' arrow>
          <IconButton
            onClick={() => {
              dispatch(setRegBox({open: true, data: original}));
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      )
    },
    // eslint-disable-next-line
  ],[]);

  const data = useMemo(() => dataR, [dataR]);

  // NOTA(RECKER): Core request
  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(getData());
    }

    return () => {
      if (loading) {
        promise.abort(); 
      }
    }
    // eslint-disable-next-line
  }, [loading]);

  // NOTA(RECKER): Reinicar config al desmontar
  useEffect(() => {
    return () => {
      dispatch(resetTableConfig());
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch(value || ""));
  }

  const handleChange = value => {
    dispatch(setConfigTable(value));
  }

  return (
    <Box component='main' sx={classes.container}>
      <Container>
        <Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Registros</Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ReactTableBase
              data={data}
              columns={columns}
              pageCountData={pageCount}
              pageSizeData={pageSize}
              loading={loading}
              handleGlobalFilter={handleGlobalFilter}
              handleChange={handleChange}
              filter={<Filtrador />}
            />
          </Grid>
        </Grid>
        <ShowRegistro />
      </Container>
    </Box>
  )
}