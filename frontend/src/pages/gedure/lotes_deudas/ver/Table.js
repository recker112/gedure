import React, { useMemo, useEffect } from 'react';

// Router
import { useNavigate, useParams } from 'react-router-dom';

// MUI
import { Chip, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Components
import ReactTableBase from '../../../../components/ReactTableBase';
import { parseFloatToMoneyString } from '../../../../components/Utils/ParseString';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../../store/slices/tablesWallet';
import { setRequestStatus } from '../../../../store/slices/requestStatusWallet';
import { getLotesDeudasUsers } from '../../../../store/slices/tablesWallet/async_trunk/lotes_deudas/TableLotesDeudasUsers';

const colorChip = {
  'no pagada': 'error',
  'pagada': 'success',
  'reembolsada': 'info',
}

export default function Table() {
  const { id } = useParams();

  const { dataR, loading, pageSize, pageCount, administrar_transac } = useSelector(state => ({
    dataR: state.tablesWallet.lotesDeudasUsers.tableData.data,
    loading: state.tablesWallet.lotesDeudasUsers.tableData.loading,
    pageSize: state.tablesWallet.lotesDeudasUsers.tableData.pageSize,
    pageCount: state.tablesWallet.lotesDeudasUsers.tableData.pageCount,
    administrar_transac: state.auth.permissions.administrar_transac,
  }));
  const { debt_lote_delete, debt_lote_edit } = administrar_transac;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const columns = useMemo(() => [
    {
      Header: 'Usuario',
      accessor: 'user',
      Cell: ({
        cell: {
          row: {
            original: { user: { username, privilegio } },
          },
        },
      }) => `${privilegio}${username}`,
    },
    {
      Header: 'Estado',
      accessor: 'estado',
      Cell: ({
        cell: {
          row: {
            original: { status },
          },
        },
      }) => (
        <Chip
          color={colorChip[status]}
          variant='outlined'
          label={status.toUpperCase()[0] + status.slice(1)}
        />
      ),
    },
    {
      Header: 'Fecha del pago',
      accessor: 'updated_at',
      Cell: ({ cell: { row: { original: { created_at, updated_at } } } }) => created_at === updated_at ? '--------------------' : updated_at,
    },
    {
      id: 'options',
      Header: 'Opciones',
      accessor: 'options',
      Cell: ({ cell: { row: { original } } }) => (
        <>
          {original.status !== 'no pagada' && (
            <Tooltip title='Ver' arrow>
              <IconButton
                onClick={() => {
                  navigate(`ver/${original.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          )}
          {original.status === 'pagada' && (
            <Tooltip title='Reembolsar' arrow>
              <IconButton
                onClick={() => {
                  dispatch(setRequestStatus({open: true, data: original, select: 'editLoteDeuda'}));
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {original.status === 'no pagada' && (
            <Tooltip title='Eliminar' arrow>
              <IconButton
                onClick={() => {
                  dispatch(setRequestStatus({open: true, data: original, select: 'deleteLoteDeuda'}));
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          )}
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
      promise = dispatch(getLotesDeudasUsers(id));
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
      dispatch(resetTableConfig({ select: 'lotesDeudasUsers' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'lotesDeudasUsers'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'lotesDeudasUsers' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'lotesDeudasUsers' }));
  }

  return (
    <ReactTableBase
      title='Lista de usuarios'
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