import React, { useEffect, useMemo } from "react";

// Router
import { useNavigate } from "react-router-dom";

// MUI
import {
  Avatar,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import ClassIcon from '@mui/icons-material/Class';

// Components
import ReactTableBase from "../../../components/ReactTableBase";
import Filtrador from "./Filtrador";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../store/slices/tables/async_trunk/users/getUsers";
import { refresh, resetTableConfig, setConfigTable, setSearch } from "../../../store/slices/tables";
import { setRequestStatus } from "../../../store/slices/requestStatus";

export default function Table() {
  let navigate = useNavigate();

  const { dataR, loading, pageSize, pageCount, type, permissions, idU, curso, seccion } = useSelector((state) => ({
    dataR: state.tables.users.tableData.data,
    loading: state.tables.users.tableData.loading,
    pageSize: state.tables.users.tableData.pageSize,
    pageCount: state.tables.users.tableData.pageCount,
    type: state.tables.users.filters.type,
    curso: state.tables.users.filters.curso,
    seccion: state.tables.users.filters.seccion,
    permissions: state.auth.permissions,
    idU: state.auth.user.id,
  }));
  const { users_edit, users_delete } = permissions.administrar;
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
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Estado",
        accessor: "actived_at",
        Cell: ({ value }) => (
          <Chip 
            color={value ? 'primary':'default'}
            label={value ? 'Activo':'Inactivo'}
            variant='outlined'
            data-tour="gdUser__status"
          />
        ),
      },
      {
        id: "options",
        Header: "Opciones",
        accessor: "options",
        Cell: ({
          cell: {
            row: { original: { id, username, privilegio } },
          },
        }) => (
          <>
            <Tooltip title="Ver" arrow>
              <IconButton
                onClick={() => {
                  idU === id ? navigate('/gedure/cuenta') : navigate(`ver/${id}`);
                }}
                component='span'
                disabled={!users_edit}
                data-tour="gdUser__show"
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Desactivar" arrow>
              <IconButton
                onClick={() => {
                  dispatch(setRequestStatus({open: true, data: { id, username: privilegio+username }, select: 'disableUser'}));
                }}
                component='span'
                disabled={!users_delete}
                data-tour="gdUser__delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    // eslint-disable-next-line
    [curso,seccion]
  );

  const data = useMemo(() => dataR, [dataR]);

  // NOTA(RECKER): Core request
  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(getUsers());
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
      dispatch(resetTableConfig({ select: 'users' }));
    };
    // eslint-disable-next-line
  }, []);

  const handleGlobalFilter = (value) => {
    dispatch(setSearch({search: value || "", select: 'users'}));
  };

  const handleChange = (value) => {
    dispatch(setConfigTable({ ...value, select: 'users' }));
  };

  const handleRefresh = () => {
    dispatch(refresh({ select: 'users' }));
  }

  return (
    <ReactTableBase
      title="Lista de usuarios"
      data={data}
      columns={columns}
      pageCountData={pageCount}
      pageSizeData={pageSize}
      loading={loading}
      handleGlobalFilter={handleGlobalFilter}
      handleChange={handleChange}
      refresh={handleRefresh}
      filter={gotoPage => <Filtrador gotoPage={gotoPage} />}
      massiveOptions={dataMassive => (
        <>
          {(type === 'V-' || type === 'V-NA') && (
            <Tooltip title="Cambiar de curso" arrow>
              <IconButton
                onClick={() => {
                  let i = 0;
                  let idsArray = [];
                  for(let value of dataMassive){
                    idsArray[i] = value.id;
                    i++;
                  }
                  
                  dispatch(setRequestStatus({open: true, data: idsArray, select: 'updateSeccion'}))
                }}
                disabled={!users_edit}
              >
                <ClassIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Desactivar" arrow>
            <IconButton
              onClick={() => {
                let i = 0;
								let idsArray = [];
								for(let value of dataMassive){
									idsArray[i] = value.id;
									i++;
								}

                dispatch(setRequestStatus({select: 'disableUserMassive', open: true, data: idsArray}))
              }}
              disabled={!users_delete}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    />
  )
}