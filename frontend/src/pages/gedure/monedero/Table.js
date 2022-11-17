import React, { useMemo, useEffect } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { Box, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Components
import ReactTableBase from '../../../components/ReactTableBase';
import { parseFloatToMoneyString } from '../../../components/Utils/ParseString';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../store/slices/tablesWallet';
import { getMonedero } from '../../../store/slices/tablesWallet/async_trunk/monedero/TableMonedero';

export default function Table() {
  const { dataR, loading, pageSize, pageCount } = useSelector(state => ({
    dataR: state.tablesWallet.monedero.tableData.data,
    loading: state.tablesWallet.monedero.tableData.loading,
    pageSize: state.tablesWallet.monedero.tableData.pageSize,
    pageCount: state.tablesWallet.monedero.tableData.pageCount,
  }));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const columns = useMemo(() => [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Tipo',
      accessor: 'type',
      Cell: ({ cell: { row: { original: { type } } } }) => type.toUpperCase()[0] + type.slice(1),
    },
    {
      Header: 'Cantidad',
      accessor: 'amount',
      Cell: ({ cell: { row: { original: { type, payload, amount } } } }) => {
        let color = null;

        if (type === 'pago verificado') {
          color = 'success.main';
        } else if (type === 'deuda pagada') {
          color = 'error.main';
        } else if (type === 'transferencia de saldo') {
          !payload.extra_data.sender && (color = 'success.main');
          payload.extra_data.sender && (color = 'error.main');
        } else if (type === 'manual') {
          (amount > 0) && (color = 'success.main');
          (amount <= 0) && (color = 'error.main');
        }

        return (
          <Box component='span' color={color}>
            {parseFloatToMoneyString(amount)}
          </Box>
        )
      },
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
          <Tooltip title='Ver' arrow>
            <IconButton
              onClick={() => {
                navigate(`transacciones/ver/${original.id}`);
              }}
            >
              <VisibilityIcon />
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
      promise = dispatch(getMonedero());
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
      dispatch(resetTableConfig({ select: 'monedero' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'monedero'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'monedero' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'monedero' }));
  }

  return (
    <ReactTableBase
      title='Lista de transacciones'
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