import React, { useMemo, useEffect } from 'react'

// MUI
import { Box, Container, Grid, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Format
import { format } from 'date-fns';

// Components
import useNotifier from '../../../hooks/useNotifier';
import TourRegistros from './TourRegistros';
import Filtrador from './Filtrador';
import ShowRegistro from './ShowRegistro';
import ReactTableBase from '../../../components/ReactTableBase';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../store/slices/tables';
import { getRegistros } from '../../../store/slices/tables/async_trunk/registros/getRegistros';
import { setRequestStatus } from '../../../store/slices/requestStatus';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Registros() {
  useNotifier({
    messageTo200: false,
  });

  const { dataR, loading, pageSize, pageCount, count_notify } = useSelector(state => ({
    dataR: state.tables.registros.tableData.data,
    loading: state.tables.registros.tableData.loading,
    pageSize: state.tables.registros.tableData.pageSize,
    pageCount: state.tables.registros.tableData.pageCount,
    count_notify: state.auth.notify.count,
  }));
  const dispatch = useDispatch();

  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Registros - La Candelaria` : 'Registros - La Candelaria';

  const columns = useMemo(() => [
    {
      Header: 'Usuario',
      accessor: 'username',
      Cell: ({ cell: { row: { original: { user } } } }) => user?.privilegio ? `${user.privilegio}${user.username}` : 'A-gedure'
    },
    {
      Header: 'Nombre',
      accessor: 'name',
      Cell: ({ cell: { row: { original: { user } } } }) => user?.name ? user.name : 'Gedure'
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
              let formatData = {...original};

              // Format Data
              if (Object.keys(formatData).length) {
                formatData.payload = typeof formatData.payload !== 'object' ? JSON.parse(formatData.payload) : formatData.payload;
                formatData.date = format(new Date(formatData.date_format), 'dd/MM/yy');
                formatData.hours = format(new Date(formatData.date_format), 'hh:mm a');
                formatData.username = formatData.user?.privilegio+formatData.user?.username;
                formatData.name = formatData.user?.name;
              }

              dispatch(setRequestStatus({open: true, data: formatData, select: 'showReg'}));
            }}
            data-tour="gdReg__show"
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
      promise = dispatch(getRegistros());
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
      dispatch(resetTableConfig({ select: 'registros' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'registros'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'registros' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'registros' }));
  }

  return (
    <Box component='main' sx={classes.container}>
      <Container>
        <Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>Registros</Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ReactTableBase
              title='Registros del sistema'
              data={data}
              columns={columns}
              pageCountData={pageCount}
              pageSizeData={pageSize}
              loading={loading}
              handleGlobalFilter={handleGlobalFilter}
              handleChange={handleChange}
              filter={gotoPage => <Filtrador gotoPage={gotoPage} />}
              refresh={handleRefresh}
            />
          </Grid>
        </Grid>
        <ShowRegistro />
      </Container>
      <TourRegistros />
    </Box>
  )
}