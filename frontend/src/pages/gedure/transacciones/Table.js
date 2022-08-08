import React, { useMemo, useEffect } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Components
import ReactTableBase from '../../../components/ReactTableBase';
import { parseFloatToMoneyString } from '../../../components/Utils/ParseString';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../store/slices/tablesWallet';
import { getTransactions } from '../../../store/slices/tablesWallet/async_trunk/transacciones/TableTransactions';

export default function Table() {
  const { dataR, loading, pageSize, pageCount } = useSelector(state => ({
    dataR: state.tablesWallet.transacciones.tableData.data,
    loading: state.tablesWallet.transacciones.tableData.loading,
    pageSize: state.tablesWallet.transacciones.tableData.pageSize,
    pageCount: state.tablesWallet.transacciones.tableData.pageCount,
  }));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const columns = useMemo(() => [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Dueño',
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
      Header: 'Tipo',
      accessor: 'type',
      Cell: ({ cell: { row: { original: { type } } } }) => type.toUpperCase()[0] + type.slice(1),
    },
    {
      Header: 'Cantidad',
      accessor: 'amount',
      Cell: ({ cell: { row: { original: { amount } } } }) => parseFloatToMoneyString(amount),
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
                navigate(`ver/${original.id}`);
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
      promise = dispatch(getTransactions());
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
      dispatch(resetTableConfig({ select: 'transacciones' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'transacciones'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'transacciones' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'transacciones' }));
  }

  return (
    <ReactTableBase
      title='Lista de transacciones'
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