import React, { useMemo, useEffect } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Components
import ReactTableBase from '../../../components/ReactTableBase';
import { parseFloatToMoneyString } from '../../../components/Utils/ParseString';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../store/slices/tablesWallet';
import { setRequestStatus } from '../../../store/slices/requestStatusWallet';
import { getLotesDeudas } from '../../../store/slices/tablesWallet/async_trunk/lotes_deudas/TableLotesDeudas';

export default function Table() {
  const { dataR, loading, pageSize, pageCount } = useSelector(state => ({
    dataR: state.tablesWallet.lotes_deudas.tableData.data,
    loading: state.tablesWallet.lotes_deudas.tableData.loading,
    pageSize: state.tablesWallet.lotes_deudas.tableData.pageSize,
    pageCount: state.tablesWallet.lotes_deudas.tableData.pageCount,
  }));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const columns = useMemo(() => [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Motivo',
      accessor: 'reason',
    },
    {
      Header: 'Monto a pagar',
      accessor: 'amount_to_pay',
      Cell: ({ cell: { row: { original: { amount_to_pay } } } }) => parseFloatToMoneyString(amount_to_pay),
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
          <Tooltip title='Editar' arrow>
            <IconButton
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: original, select: 'editLoteDeuda'}));
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar' arrow>
            <IconButton
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: original, select: 'verSoliContacto'}));
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
      promise = dispatch(getLotesDeudas());
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
      dispatch(resetTableConfig({ select: 'lotes_deudas' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'lotes_deudas'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'lotes_deudas' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'lotes_deudas' }));
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