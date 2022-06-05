import React, { useEffect, useMemo } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { Avatar, IconButton, Tooltip } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Components
import ReactTableBase from '../../../components/ReactTableBase';
import Filtrador from './Filtrador';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getDataBT, refreshBT, resetTableConfigBT, setConfigTableBT, setSearchBT } from '../../../store/slices/gedure/boletas_admin/table';
import { setConfgsBC } from '../../../store/slices/gedure/boletas_admin/confirmDialogs';

export default function Table() {
  let navigate = useNavigate();

  const { dataR, loading, pageSize, pageCount, filters, permissions } = useSelector((state) => ({
    dataR: state.gdBTable.tableData.data,
    loading: state.gdBTable.tableData.loading,
    pageSize: state.gdBTable.tableData.pageSize,
    pageCount: state.gdBTable.tableData.pageCount,
    filters: state.gdBTable.filters,
    permissions: state.auth.permissions,
  }));
  const { curso, seccion } = filters;
  const { boletas_destroy } = permissions.administrar;
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "avatar",
        Cell: ({
          cell: {
            row: {
              original: { avatar, name },
            },
          },
        }) => (
          <Avatar
            sx={{
              backgroundColor: "secondary.main",
              color: "secondary.contrastText",
            }}
            src={avatar}
            alt={`Avatar User de ${name}`}
          >
            {name.substring(0, 1).toUpperCase()}
          </Avatar>
        ),
      },
      {
        Header: "Usuario",
        accessor: "username",
        Cell: ({
          cell: {
            row: {
              original: { privilegio, username, n_lista },
            },
          },
        }) => {
          if (curso && seccion) {
            return (
              <React.Fragment>
                <div>{privilegio+username}</div>
                <div>N° lista {n_lista}</div>
              </React.Fragment>
            )
          }else {
            return `${privilegio}${username}`
          }
        },
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Boletas cargadas",
        accessor: "boletas_count",
      },
      {
        id: "options",
        Header: "Opciones",
        accessor: "options",
        Cell: ({
          cell: {
            row: { original: { id } },
          },
        }) => (
          <>
            <Tooltip title="Ver boletas" arrow>
              <IconButton
                onClick={() => {
                  navigate(`ver/${id}`);
                }}
              >
                <ClassIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    // eslint-disable-next-line
    [curso, seccion]
  );

  const data = useMemo(() => dataR, [dataR]);

  // NOTA(RECKER): Core request
  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(getDataBT());
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
      dispatch(resetTableConfigBT());
    };
    // eslint-disable-next-line
  }, []);

  const handleGlobalFilter = (value) => {
    dispatch(setSearchBT(value || ""));
  };

  const handleChange = (value) => {
    dispatch(setConfigTableBT(value));
  };

  const handleRefresh = () => {
    dispatch(refreshBT());
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
      filter={<Filtrador />}
      massiveOptions={dataMassive => (
        <Tooltip title="Eliminar boletas" arrow>
          <IconButton
            onClick={() => {
              let i = 0;
              let idsArray = [];
              for(let value of dataMassive){
                idsArray[i] = value.id;
                i++;
              }

              dispatch(setConfgsBC({open: true, data: idsArray, confirm: 'deleteBoletaMassive'}))
            }}
            disabled={!boletas_destroy}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      )}
    />
  )
}
