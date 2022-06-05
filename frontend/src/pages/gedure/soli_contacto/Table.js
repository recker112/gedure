import React, { useMemo, useEffect } from 'react';

// MUI
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Components
import ReactTableBase from '../../../components/ReactTableBase';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getDataSCT, refreshSCT, resetTableConfigSCT, setConfigTableSCT, setConfirmConfgsSCT, setSearchSCT, setSeeBoxSCT } from '../../../store/slices/gedure/soli_contacto/index.js';

export default function Table() {
  const { dataR, loading, pageSize, pageCount } = useSelector(state => ({
    dataR: state.gdSCTable.tableData.data,
    loading: state.gdSCTable.tableData.loading,
    pageSize: state.gdSCTable.tableData.pageSize,
    pageCount: state.gdSCTable.tableData.pageCount,
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
                dispatch(setSeeBoxSCT({open: true, data: original}));
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar' arrow>
            <IconButton
              onClick={() => {
                dispatch(setConfirmConfgsSCT({open: true, data: original, confirm: 'deleteSC'}))
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
      promise = dispatch(getDataSCT());
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
      dispatch(resetTableConfigSCT());
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearchSCT(value || ""));
  }

  const handleChange = value => {
    dispatch(setConfigTableSCT(value));
  }

  const handleRefresh = () => {
    dispatch(refreshSCT());
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
