import React, { useEffect, useMemo } from 'react'

// MUI
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreIcon from '@mui/icons-material/Restore';

// Components
import ReactTableBase from '../../../../components/ReactTableBase';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getDataGCDU, refreshGCDU, resetTableConfigGCDU, setConfigTableGCDU, setSearchGCDU } from '../../../../store/slices/gedure/configuracion/user_disabled/table';
import { setConfirmConfgsGCDU } from '../../../../store/slices/gedure/configuracion/user_disabled/confirm';

export default function Table() {
  const { dataR, loading, pageSize, pageCount } = useSelector(state => ({
    dataR: state.gdGCDUTable.tableData.data,
    loading: state.gdGCDUTable.tableData.loading,
    pageSize: state.gdGCDUTable.tableData.pageSize,
    pageCount: state.gdGCDUTable.tableData.pageCount,
  }));
  const dispatch = useDispatch();

  const columns = useMemo(() => [
    {
      Header: 'Usuario',
      accessor: 'code',
      Cell: ({ cell: { row: { original: { privilegio, username } } } }) => `${privilegio}${username}`
    },
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Correo',
      accessor: 'email',
    },
    {
      id: 'options',
      Header: 'Opciones',
      accessor: 'options',
      Cell: ({ cell: { row: { original: { id, username, privilegio } } } }) => (
        <>
          <Tooltip title='Restaurar' arrow>
            <IconButton
              onClick={() => {
                dispatch(setConfirmConfgsGCDU({open: true, data: {id, privilegio, username}, confirm: 'restore'}))
              }}
            >
              <RestoreIcon /> 
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar' arrow>
            <IconButton
              onClick={() => {
                dispatch(setConfirmConfgsGCDU({open: true, data: {id, privilegio, username}, confirm: 'destroy'}))
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
      promise = dispatch(getDataGCDU());
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
      dispatch(resetTableConfigGCDU());
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearchGCDU(value || ""));
  }

  const handleChange = value => {
    dispatch(setConfigTableGCDU(value));
  }

  const handleRefresh = () => {
    dispatch(refreshGCDU());
  }

  return (
    <ReactTableBase
      title='Usuarios desactivados'
      data={data}
      columns={columns}
      pageCountData={pageCount}
      pageSizeData={pageSize}
      loading={loading}
      handleGlobalFilter={handleGlobalFilter}
      handleChange={handleChange}
      refresh={handleRefresh}
      massiveOptions={dataMassive => (
        <>
          <Tooltip title="Restaurar" arrow>
            <IconButton
              onClick={() => {
                let i = 0;
								let idsArray = [];
								for(let value of dataMassive){
									idsArray[i] = value.id;
									i++;
								}

                dispatch(setConfirmConfgsGCDU({confirm: 'restoreMassive', open: true, data: idsArray}))
              }}
            >
              <RestoreIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" arrow>
            <IconButton
              onClick={() => {
                let i = 0;
								let idsArray = [];
								for(let value of dataMassive){
									idsArray[i] = value.id;
									i++;
								}

                dispatch(setConfirmConfgsGCDU({confirm: 'destroyMassive', open: true, data: idsArray}))
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    />
  )
}