import React, { useMemo, useEffect } from 'react';

// MUI
import { Chip, IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Components
import ReactTableBase from '../../../../components/ReactTableBase';
import { parseFloatToMoneyString } from '../../../../components/Utils/ParseString';
import { BankListSearch } from '../../../../components/Utils/BankList';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../../store/slices/tablesWallet';
import { getPendingPayments } from '../../../../store/slices/tablesWallet/async_trunk/monedero/TablePendingPayments';
import { setRequestStatus } from '../../../../store/slices/requestStatusWallet';

const colorChip = {
  'no encontrado': 'error',
  'pendiente': 'info',
  'verificado': 'success',
}

export default function Table() {
  const { dataR, loading, pageSize, pageCount } = useSelector(state => ({
    dataR: state.tablesWallet.pendingPayments.tableData.data,
    loading: state.tablesWallet.pendingPayments.tableData.loading,
    pageSize: state.tablesWallet.pendingPayments.tableData.pageSize,
    pageCount: state.tablesWallet.pendingPayments.tableData.pageCount,
    administrar_transac: state.auth.permissions.administrar_transac,
  }));
  const dispatch = useDispatch();

  const columns = useMemo(() => [
    {
      Header: 'Referencia',
      accessor: 'reference',
    },
    {
      Header: 'Cantidad',
      accessor: 'amount',
      Cell: ({
        cell: {
          row: {
            original: { amount },
          },
        },
      }) => parseFloatToMoneyString(amount),
    },
    {
      Header: 'Fecha', 
      accessor: 'date',
    },
    {
      Header: 'Banco', 
      accessor: 'code',
      Cell: ({
        cell: {
          row: {
            original: { code },
          },
        },
      }) => BankListSearch[code],
    },
    {
      Header: 'Estado',
      accessor: 'status',
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
      id: 'options',
      Header: 'Opciones',
      accessor: 'options',
      Cell: ({ cell: { row: { original } } }) => (
        <>
          <Tooltip title='Eliminar' arrow>
            <IconButton
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: original, select: 'deletePendingPayments'}));
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
      promise = dispatch(getPendingPayments());
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
      dispatch(resetTableConfig({ select: 'pendingPayments' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'pendingPayments'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'pendingPayments' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'pendingPayments' }));
  }

  return (
    <ReactTableBase
      title='Lista de pagos pendientes'
      data-tour='table'
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