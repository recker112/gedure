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

export default function Table() {
  let navigate = useNavigate();

  const { dataR, loading, pageSize, pageCount, type } = useSelector((state) => ({
    dataR: state.gdUTable.tableData.data,
    loading: state.gdUTable.tableData.loading,
    pageSize: state.gdUTable.tableData.pageSize,
    pageCount: state.gdUTable.tableData.pageCount,
    type: state.gdUTable.filters.type
  }));
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
              original: { privilegio, username },
            },
          },
        }) => `${privilegio}${username}`,
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
            data-tour='status'
          />
        ),
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
            <Tooltip title="Ver" arrow>
              <IconButton
                onClick={() => {
                  navigate(`ver/${id}`);
                }}
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar" arrow>
              <IconButton
                onClick={() => {
                  //
                }}
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
          {type === 'V-' && (
            <Tooltip title="Cambiar de curso" arrow>
              <IconButton
                onClick={() => {
                  console.dir(dataMassive)
                }}
              >
                <ClassIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Eliminar" arrow>
            <IconButton
              onClick={() => {
                console.dir(dataMassive)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    />
  )
}