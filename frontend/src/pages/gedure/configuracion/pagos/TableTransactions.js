import React, { useEffect, useMemo } from 'react'

// MUI
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Components
import ReactTableBase from '../../../../components/ReactTableBase';
import { parseFloatToMoneyString } from '../../../../components/Utils/ParseString';
import { BankListSearch } from '../../../../components/Utils/BankList';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../../store/slices/tables';
import { setRequestStatus } from '../../../../store/slices/requestStatus';
import { getBankTransactions } from '../../../../store/slices/tables/async_trunk/configuracion/TableBankTransactions';

export default function TableTransactions() {
  const { dataR, loading, pageSize, pageCount, gedure: { bank_account_edit, bank_account_destroy } } = useSelector(state => ({
    dataR: state.tables.bankTransactions.tableData.data,
    loading: state.tables.bankTransactions.tableData.loading,
    pageSize: state.tables.bankTransactions.tableData.pageSize,
    pageCount: state.tables.bankTransactions.tableData.pageCount,
    gedure: state.auth.permissions.gedure,
  }));
  const dispatch = useDispatch();

  const columns = useMemo(() => [
    {
      Header: 'Id',
      accessor: 'id'
    },
    {
      Header: 'Referencia',
      accessor: 'reference',
    },
    {
      Header: 'Concepto', 
      accessor: 'concepto'
    },
    {
      Header: 'Fecha de transferencia', 
      accessor: 'date'
    },
    {
      Header: 'Monto', 
      accessor: 'amount',
      Cell: ({ cell: { row: { original: { amount } } } }) => parseFloatToMoneyString(amount),
    },
    {
      Header: 'Banco', 
      accessor: 'code',
      Cell: ({ cell: { row: { original: { code } } } }) => BankListSearch[code] || 'No especificado',
    },
    {
      Header: 'Reclamado por', 
      accessor: 'taked_by',
      Cell: ({ cell: { row: { original: { user } } } }) => user?.privilegio+user?.username || 'No reclamado',
    },
    {
      id: 'options',
      Header: 'Opciones',
      accessor: 'options',
      Cell: ({ cell: { row: { original: { id, amount } } } }) => (
        <>
          <Tooltip title='Asignar' arrow>
            <IconButton
              component='span'
              disabled={!bank_account_edit}
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: { id, amount }, select: 'assignTransaction'}));
              }}
            >
              <AssignmentIcon /> 
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar' arrow>
            <IconButton
              component='span'
              disabled={!bank_account_destroy}
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: { id }, select: 'deleteTransaction'}));
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
      promise = dispatch(getBankTransactions());
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
      dispatch(resetTableConfig({ select: 'bankTransactions' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'bankTransactions'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'bankTransactions' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'bankTransactions' }));
  }

  return (
    <ReactTableBase
      title='Cuentas bancarias'
      data-tour="bank-transaction"
      dataTourMassive='tableT-massive'
      dataTourGlobal='tableT-global'
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
          <Tooltip title="Eliminar" arrow>
            <IconButton
              component='span'
              disabled={!bank_account_destroy}
              onClick={() => {
                let i = 0;
								let idsArray = [];
								for(let value of dataMassive){
									idsArray[i] = value.id;
									i++;
								}

                dispatch(setRequestStatus({select: 'deleteMassiveBankTransaction', open: true, data: idsArray}))
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