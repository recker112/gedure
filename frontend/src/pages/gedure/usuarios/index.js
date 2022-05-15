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

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Usuarios() {
  useNotifier();

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Usuarios
        </Box>
        <Grid container spacing={2}>
          <Grid container justifyContent="flex-end" item xs={12}>
            <Button variant="contained" sx={{ mr: 1 }}>
              Cargar estudiantes
            </Button>
            <Button variant="contained">Crear usuario</Button>
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
