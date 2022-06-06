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
import {
  getData,
  refresh,
  resetTableConfig,
  setConfigTable,
  setSearch,
} from "../../../store/slices/gedure/usuarios/table";
import { setConfirmConfgs } from "../../../store/slices/gedure/usuarios/confirmDialogs";
import { setConfgs } from "../../../store/slices/gedure/usuarios/updateSeccion";

export default function Table() {
  let navigate = useNavigate();

  const { dataR, loading, pageSize, pageCount, type, permissions, idU, curso, seccion } = useSelector((state) => ({
    dataR: state.gdUTable.tableData.data,
    loading: state.gdUTable.tableData.loading,
    pageSize: state.gdUTable.tableData.pageSize,
    pageCount: state.gdUTable.tableData.pageCount,
    type: state.gdUTable.filters.type,
    curso: state.gdUTable.filters.curso,
    seccion: state.gdUTable.filters.seccion,
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
        Cell: ({
          cell: {
            row: {
              original: { actived_at },
            },
          },
        }) => (
          <Chip 
            color={actived_at ? 'primary':'default'}
            label={actived_at ? 'Activo':'Inactivo'}
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
                disabled={!users_edit}
                data-tour="gdUser__show"
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Desactivar" arrow>
              <IconButton
                onClick={() => {
                  dispatch(setConfirmConfgs({confirm: 'disabledAccount', open: true, data: { id, username: privilegio+username }}))
                }}
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
    []
  );

  const data = useMemo(() => dataR, [dataR]);

  // NOTA(RECKER): Core request
  useEffect(() => {
    let promise = null;

    if (loading) {
      promise = dispatch(getData());
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
      dispatch(resetTableConfig());
    };
    // eslint-disable-next-line
  }, []);

  const handleGlobalFilter = (value) => {
    dispatch(setSearch(value || ""));
  };

  const handleChange = (value) => {
    dispatch(setConfigTable(value));
  };

  const handleRefresh = () => {
    dispatch(refresh());
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
      filter={<Filtrador />}
      refresh={handleRefresh}
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
                  
                  dispatch(setConfgs({open: true, data: idsArray}))
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

                dispatch(setConfirmConfgs({confirm: 'disabledAccountMassive', open: true, data: idsArray}))
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