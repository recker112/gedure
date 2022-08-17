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
import DialogConfirmation from "../../../components/DialogConfirmation";
import UpdateSeccion from "./UpdateSeccion";
import TourUser from "./TourUser";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setRequestStatus } from "../../../store/slices/requestStatus";
import { disableUser } from "../../../store/slices/requestStatus/async_trunk/users/disableUser";
import { disableUserMassive } from "../../../store/slices/requestStatus/async_trunk/users/disableUserMassive";

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Usuarios() {
  useNotifier();
  
  const { permissions: { users_upload_matricula, users_create }, count_notify } = useSelector(state => ({
    permissions: state.auth.permissions.administrar,
    count_notify: state.auth.notify.count,
  }))
  const dispatch = useDispatch();
  
  // NOTA(RECKER): Title
  document.title = count_notify > 0 ? `(${count_notify}) Usuarios - La Candelaria` : 'Usuarios - La Candelaria';

  const handleOpenCreate = () => {
    dispatch(setRequestStatus({select: 'createUser', open: true}));
  }

  const handleOpenUpload = () => {
    dispatch(setRequestStatus({select: 'uploadMatricula', open: true}));
  }

  return (
    <Box component="main" sx={classes.container}>
      <Container>
        <Box fontSize="h4.fontSize" mb={3} className="text__bold--big">
          Usuarios
        </Box>
        <Grid container spacing={2}>
          <Grid container spacing={1} justifyContent="flex-end" item xs={12}>
            <Grid item>
              <Button 
                disabled={!users_upload_matricula} 
                variant="contained" 
                data-tour="gdUser__upload"
                onClick={handleOpenUpload}
              >
                Cargar estudiantes
              </Button>
            </Grid>
            <Grid item>
              <Button 
                disabled={!users_create} 
                variant="contained" 
                data-tour="gdUser__create" 
                onClick={handleOpenCreate}
              >
                Crear usuario
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
        <CreateUser />
        <UploadStudiends />
        <DialogConfirmation 
          rdx1='requestStatus' 
          rdx2='disableUser'
          close={
            setRequestStatus({open: false, data: {}, select: 'disableUser'})
          }
          request={
            data => disableUser(data.id)
          }
        >
          {(data) => (<span>Está a punto de <strong>desactivar la cuenta {data.username}</strong>. Si llega a desactivar una cuenta por accidente puede reactivarla.</span>)}
        </DialogConfirmation>
        <DialogConfirmation 
          rdx1='requestStatus' 
          rdx2='disableUserMassive'
          close={
            setRequestStatus({open: false, data: {}, select: 'disableUserMassive'})
          }
          request={
            data => disableUserMassive(data)
          }
        >
          {(data) => (<span>Está a punto de <strong>desactivar {data?.length} cuenta(s)</strong>. Si llega a desactivar una cuenta por accidente puede reactivarla.</span>)}
        </DialogConfirmation>
        <UpdateSeccion />
      </Container>
      <TourUser />
    </Box>
  );
}
