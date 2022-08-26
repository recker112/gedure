import React, { useEffect, useMemo } from 'react'

// MUI
import { IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

// Components
import ReactTableBase from '../../../../components/ReactTableBase';
import { parseToAccountString } from '../../../../components/Utils/ParseString';
import { BankListSearch } from '../../../../components/Utils/BankList';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getBankAccounts } from '../../../../store/slices/tables/async_trunk/configuracion/TableBankAccounts';
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../../store/slices/tables';
import { setRequestStatus } from '../../../../store/slices/requestStatus';

export default function TableAccounts() {
  const { dataR, loading, pageSize, pageCount, gedure: { bank_transaction_assign, bank_transaction_delete } } = useSelector(state => ({
    dataR: state.tables.bankAccounts.tableData.data,
    loading: state.tables.bankAccounts.tableData.loading,
    pageSize: state.tables.bankAccounts.tableData.pageSize,
    pageCount: state.tables.bankAccounts.tableData.pageCount,
    gedure: state.auth.permissions.gedure,
  }));
  const dispatch = useDispatch();

  const columns = useMemo(() => [
    {
      Header: 'N° cuenta',
      accessor: 'n_account',
      Cell: ({ cell: { row: { original: { n_account } } } }) => parseToAccountString(n_account)
    },
    {
      Header: 'Nombre',
      accessor: 'name',
    },
    {
      Header: 'Correo', 
      accessor: 'email'
    },
    {
      Header: 'Tipo', 
      accessor: 'type'
    },
    {
      Header: 'Banco', 
      accessor: 'code',
      Cell: ({ cell: { row: { original: { code } } } }) => BankListSearch[code] || 'No especificado',
    },
    {
      id: 'options',
      Header: 'Opciones',
      accessor: 'options',
      Cell: ({ cell: { row: { original: { id, n_account, rif, name, email, type, code } } } }) => (
        <>
          <Tooltip title='Editar' arrow>
            <IconButton
              component='span'
              disabled={!bank_transaction_assign}
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: { id, n_account, rif, name, email, type, code }, select: 'editBankAccount'}));
              }}
            >
              <EditIcon /> 
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar' arrow>
            <IconButton
              component='span'
              disabled={!bank_transaction_delete}
              onClick={() => {
                dispatch(setRequestStatus({open: true, data: { id, n_account}, select: 'deleteBankAccount'}));
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
      promise = dispatch(getBankAccounts());
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
      dispatch(resetTableConfig({ select: 'bankAccounts' }));
    }
    // eslint-disable-next-line
  },[]);

  const handleGlobalFilter = value => {
    dispatch(setSearch({search: value || "", select: 'bankAccounts'}));
  }

  const handleChange = value => {
    dispatch(setConfigTable({ ...value, select: 'bankAccounts' }));
  }

  const handleRefresh = () => {
    dispatch(refresh({ select: 'bankAccounts' }));
  }

  return (
    <ReactTableBase
      title='Cuentas bancarias'
      data-tour="bank-account"
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
              disabled={!bank_transaction_delete}
              onClick={() => {
                let i = 0;
								let idsArray = [];
								for(let value of dataMassive){
									idsArray[i] = value.id;
									i++;
								}

                dispatch(setRequestStatus({select: 'deleteBankAccountMassive', open: true, data: idsArray}))
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