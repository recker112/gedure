import React, { useEffect, useMemo } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Components
import ReactTableBase from '../../../components/ReactTableBase';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getDataPT, refreshPT, resetTableConfigPT, setConfigTablePT, setSearchPT } from '../../../store/slices/gedure/publicaciones/table';

export default function Table() {
  let navigate = useNavigate();

  const { dataR, loading, pageSize, pageCount, permissions } = useSelector((state) => ({
    dataR: state.gdPTable.tableData.data,
    loading: state.gdPTable.tableData.loading,
    pageSize: state.gdPTable.tableData.pageSize,
    pageCount: state.gdPTable.tableData.pageCount,
    permissions: state.auth.permissions,
  }));
  const { posts_edit, posts_destroy } = permissions.administrar;
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: "Título",
        accessor: "title",
      },
      {
        Header: "Dueño",
        accessor: "user",
        Cell: ({
          cell: {
            row: {
              original: { user },
            },
          },
        }) => user?.privilegio + user?.username || 'Ninguno',
      },
      {
        Header: "Fecha de publicación",
        accessor: "created_at",
      },
      {
        id: "options",
        Header: "Opciones",
        accessor: "options",
        Cell: ({
          cell: {
            row: { original: { slug } },
          },
        }) => (
          <>
            <Tooltip title="Ver" arrow>
              <IconButton
                onClick={() => {
                  navigate(`/noticias/${slug}`);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar" arrow>
              <IconButton
                onClick={() => {
                  navigate(`editar/${slug}`);
                }}
                disabled={!posts_edit}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar" arrow>
              <IconButton
                onClick={() => {
                  //dispatch(setConfirmConfgs({confirm: 'disabledAccount', open: true, data: { id, username: privilegio+username }}))
                }}
                disabled={!posts_destroy}
              >
                <DeleteForeverIcon />
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
      promise = dispatch(getDataPT());
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
      dispatch(resetTableConfigPT());
    };
    // eslint-disable-next-line
  }, []);

  const handleGlobalFilter = (value) => {
    dispatch(setSearchPT(value || ""));
  };

  const handleChange = (value) => {
    dispatch(setConfigTablePT(value));
  };

  const handleRefresh = () => {
    dispatch(refreshPT());
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
