import React from "react";

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
} from "@mui/material";

// Components
import useNotifier from "../../../hooks/useNotifier";
import Table from "./Table";
import CreateUser from "./CreateUser";
import UploadStudiends from "./UploadStudiends";

// Redux
import { useDispatch } from "react-redux";
import { setOpen } from "../../../store/slices/gedure/usuarios/forms";

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Usuarios() {
  document.title = 'Usuarios - La Candelaria';
  useNotifier();

  const dispatch = useDispatch();

  const handleOpenCreate = () => {
    dispatch(setOpen({select: 'create', open: true}));
  }

  const handleOpenUpload = () => {
    dispatch(setOpen({select: 'upload', open: true}));
  }

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Usuarios
        </Box>
        <Grid container spacing={2}>
          <Grid container justifyContent="flex-end" item xs={12}>
            <Button variant="contained" onClick={handleOpenUpload} sx={{ mr: 1 }}>
              Cargar estudiantes
            </Button>
            <Button variant="contained" onClick={handleOpenCreate}>Crear usuario</Button>
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
        <CreateUser />
        <UploadStudiends />
      </Container>
    </Box>
  );
}
