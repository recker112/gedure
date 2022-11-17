import React, { useEffect, useMemo } from 'react';

// MUI
import { IconButton, Tooltip } from '@mui/material';
import { CurrencyUsd as CurrencyUsdIcon } from 'mdi-material-ui';

// Components
import ReactTableBase from '../../../components/ReactTableBase';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { parseFloatToMoneyString } from '../../../components/Utils/ParseString';
import { getWallets } from '../../../store/slices/tablesWallet/async_trunk/wallets/TableWallets';
import { refresh, resetTableConfig, setConfigTable, setSearch } from '../../../store/slices/tablesWallet';

export default function Table() {
  const { dataR, loading, pageSize, pageCount, permissions } = useSelector((state) => ({
    dataR: state.tablesWallet.wallets.tableData.data,
    loading: state.tablesWallet.wallets.tableData.loading,
    pageSize: state.tablesWallet.wallets.tableData.pageSize,
    pageCount: state.tablesWallet.wallets.tableData.pageCount,
    permissions: state.auth.permissions,
  }));
  const { wallet_edit } = permissions.administrar_transac;
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: "Usuario",
        accessor: "user",
        Cell: ({
          cell: {
            row: {
              original: { privilegio, username },
            },
          },
        }) => privilegio + username,
      },
      {
        Header: "Saldo disponible",
        accessor: "wallet.balance",
        Cell: ({ value }) => (parseFloatToMoneyString(value)),
      },
      {
        Header: "Última actualización",
        accessor: "wallet.updated_at",
      },
      {
        id: "options",
        Header: "Opciones",
        accessor: "options",
        Cell: ({
          cell: {
            row: { original: { id, slug, title } },
          },
        }) => (
          <>
            <Tooltip title='Administrar' arrow>
              <IconButton
                onClick={() => {
                  //dispatch(setRequestStatus({open: true, data: original, select: 'payDebts'}));
                }}
                disabled={!wallet_edit}
              >
                <CurrencyUsdIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    // eslint-disable-next-line
    []
  );

  const data = useMemo(() => dataR, [dataR]);

  // NOTA(RECKER): Core request
  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(getWallets());
    }

    return () => {
      if (loading) {
        promise.abort();
      }
    };
    // eslint-disable-next-line
  }, [loading]);

  // NOTA(RECKER): Reinicar config al desmontar
  useEffect(() => {
    return () => {
      dispatch(resetTableConfig({ select: 'wallets' }));
    };
    // eslint-disable-next-line
  }, []);

  const handleGlobalFilter = (value) => {
    dispatch(setSearch({search: value || "", select: 'wallets'}));
  };

  const handleChange = (value) => {
    dispatch(setConfigTable({ ...value, select: 'wallets' }));
  };

  const handleRefresh = () => {
    dispatch(refresh({ select: 'wallets' }));
  }

  return (
    <ReactTableBase
      title="Lista de noticias"
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
