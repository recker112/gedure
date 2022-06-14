import React, { useMemo, useEffect } from 'react';

// MUI
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Components
import ReactTableBase from '../../../components/ReactTableBase';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getSoliContacto } from '../../../store/slices/tables/async_trunk/soli_contacto/getSoliContacto';
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../store/slices/tables';
import { setRequestStatus } from '../../../store/slices/requestStatus';

export default function Table() {
  const { dataR, loading, pageSize, pageCount } = useSelector(state => ({
    dataR: state.tables.soliContacto.tableData.data,
    loading: state.tables.soliContacto.tableData.loading,
    pageSize: state.tables.soliContacto.tableData.pageSize,
    pageCount: state.tables.soliContacto.tableData.pageCount,
  }));
  const dispatch = useDispatch();

  const columns = useMemo(() => [
    {
      Header: 'Nombre',
      accessor: 'nombre',
    },
    {
      Header: 'Asunto',
      accessor: 'asunto',
    },
    {
      Header: 'Correo',
      accessor: 'email',
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
        <>
          <Tooltip title='Ver detalles' arrow>
            <IconButton
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: original, select: 'verSoliContacto'}));
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar' arrow>
            <IconButton
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: original, select: 'deleteSoliContacto'}));
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </>
      )
    },
    // eslint-disable-next-line
  ],[]);

  const data = useMemo(() => dataR, [dataR]);

  // NOTA(RECKER): Core request
  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(getSoliContacto());
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
      dispatch(resetTableConfig({ select: 'soliContacto' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'soliContacto'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'soliContacto' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'soliContacto' }));
  }

  return (
    <ReactTableBase
      title='Lista de contáctanos'
      data={data}
      columns={columns}
      pageCountData={pageCount}
      pageSizeData={pageSize}
      loading={loading}
      handleGlobalFilter={handleGlobalFilter}
      handleChange={handleChange}
      refresh={handleRefresh}
    />
  )
}
