import React, { useEffect, useMemo } from 'react'

// MUI
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreIcon from '@mui/icons-material/Restore';

// Components
import ReactTableBase from '../../../../components/ReactTableBase';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../../store/slices/tables';
import { getUsersDisabled } from '../../../../store/slices/tables/async_trunk/configuracion/TableUsersDisabled';
import { setRequestStatus } from '../../../../store/slices/requestStatus';

export default function Table() {
  const { dataR, loading, pageSize, pageCount, gedure: { users_disabled_restore, users_disabled_destroy } } = useSelector(state => ({
    dataR: state.tables.usersDisabled.tableData.data,
    loading: state.tables.usersDisabled.tableData.loading,
    pageSize: state.tables.usersDisabled.tableData.pageSize,
    pageCount: state.tables.usersDisabled.tableData.pageCount,
    gedure: state.auth.permissions.gedure,
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
              component='span'
              disabled={!users_disabled_restore}
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: {id, privilegio, username}, select: 'restoreUser'}))
              }}
            >
              <RestoreIcon /> 
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar' arrow>
            <IconButton
              component='span'
              disabled={!users_disabled_destroy}
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: {id, privilegio, username}, select: 'destroyUser'}))
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
      promise = dispatch(getUsersDisabled());
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
      dispatch(resetTableConfig({ select: 'usersDisabled' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'usersDisabled'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'usersDisabled' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'usersDisabled' }));
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
              component='span'
              disabled={!users_disabled_restore}
              onClick={() => {
                let i = 0;
								let idsArray = [];
								for(let value of dataMassive){
									idsArray[i] = value.id;
									i++;
								}

                dispatch(setRequestStatus({select: 'restoreMassiveUser', open: true, data: idsArray}))
              }}
            >
              <RestoreIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" arrow>
            <IconButton
              component='span'
              disabled={!users_disabled_destroy}
              onClick={() => {
                let i = 0;
								let idsArray = [];
								for(let value of dataMassive){
									idsArray[i] = value.id;
									i++;
								}

                dispatch(setRequestStatus({select: 'destroyMassiveUser', open: true, data: idsArray}))
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