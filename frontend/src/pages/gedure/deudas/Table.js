import React, { useMemo, useEffect } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { Chip, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextBoxCheck as TextBoxCheckIcon } from 'mdi-material-ui';

// Components
import ReactTableBase from '../../../components/ReactTableBase';
import { parseFloatToMoneyString } from '../../../components/Utils/ParseString';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../store/slices/tablesWallet';
import { getDeudas } from '../../../store/slices/tablesWallet/async_trunk/deudas/TableDeudas';
import { setRequestStatus } from '../../../store/slices/requestStatusWallet';

const colorChip = {
  'no pagada': 'error',
  'pagada': 'success',
  'futura': 'default',
}

export default function Table() {
  const { dataR, loading, pageSize, pageCount } = useSelector(state => ({
    dataR: state.tablesWallet.deudas.tableData.data,
    loading: state.tablesWallet.deudas.tableData.loading,
    pageSize: state.tablesWallet.deudas.tableData.pageSize,
    pageCount: state.tablesWallet.deudas.tableData.pageCount,
  }));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const columns = useMemo(() => [
    {
      Header: 'Motivo',
      accessor: 'debt_lote.reason',
    },
    {
      Header: 'Cantidad',
      accessor: 'debt_lote.amount_to_pay',
      Cell: ({ cell: { row: { original: { debt_lote, transaction} } } }) => (parseFloatToMoneyString(transaction?.amount ? transaction.amount : debt_lote.amount_to_pay)),
    },
    {
      Header: 'Estado', 
      accessor: 'status',
      Cell: ({ value }) => (
        <Chip
          color={colorChip[value]}
          variant='outlined'
          label={value.toUpperCase()[0] + value.slice(1)}
        />
      ),
    },
    {
      id: 'options',
      Header: 'Opciones',
      accessor: 'options',
      Cell: ({ cell: { row: { original } } }) => (
        <>
          {original.status === 'pagada' && (
            <Tooltip title='Ver' arrow>
              <IconButton
                onClick={() => {
                  navigate(`/gedure/monedero/transacciones/ver/${original.transaction?.id}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          )}
          {original.status !== 'pagada' && (
            <Tooltip title='Pagar' arrow>
              <IconButton
                onClick={() => {
                  dispatch(setRequestStatus({open: true, data: original, select: 'payDebts'}));
                }}
              >
                <TextBoxCheckIcon />
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
      promise = dispatch(getDeudas());
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
      dispatch(resetTableConfig({ select: 'deudas' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'deudas'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'deudas' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'deudas' }));
  }

  return (
    <ReactTableBase
      title='Lista de deudas'
      data-tour="table"
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