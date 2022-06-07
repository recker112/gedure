import { configureStore } from "@reduxjs/toolkit";

// Reducers
import configs from './slices/configs';
import auth from "./slices/auth";
import notistack from "./slices/notistack";
import contacts from "./slices/contacts";
import gdUTable from "./slices/gedure/usuarios/table";
import gdUForms from "./slices/gedure/usuarios/forms";
import gdUConfirmDisabledAccount from "./slices/gedure/usuarios/confirmDialogs";
import gdUUpdateSeccion from "./slices/gedure/usuarios/updateSeccion";
import gdUSelected from "./slices/gedure/usuarios/ver";
import gdUPA from "./slices/gedure/usuarios/ver/requests/gdUPA";
import gdUPD from "./slices/gedure/usuarios/ver/requests/gdUPD";
import gdUPREN from "./slices/gedure/usuarios/ver/requests/gdUPREN";
import gdPTable from "./slices/gedure/publicaciones/table";
import gdPUBC from "./slices/gedure/publicaciones/crear";
import gdPUBConfirm from "./slices/gedure/publicaciones/confirmDialogs";
import gdPUBE from "./slices/gedure/publicaciones/editar";
import gdBTable from "./slices/gedure/boletas_admin/table";
import gdBConfirm from "./slices/gedure/boletas_admin/confirmDialogs";
import gdBForm from "./slices/gedure/boletas_admin/forms";
import gdBVerForm from "./slices/gedure/boletas_admin/ver";
import gdSCTable from "./slices/gedure/soli_contacto";
import gdCO from "./slices/gedure/cuenta";
import gdUserBForm from "./slices/gedure/boletas";
import gdConfigCForm from "./slices/gedure/configuracion/cursos/form";
import gdCConfigTable from "./slices/gedure/configuracion/cursos/table";
import gdGCConfirm from "./slices/gedure/configuracion/cursos/confirm";
import gdGCDUTable from "./slices/gedure/configuracion/user_disabled/table";
import gdGCDUConfirm from "./slices/gedure/configuracion/user_disabled/confirm";
import requestStatus from "./slices/requestStatus";
import tables from "./slices/tables";

export default configureStore({
  reducer: {
    configs,
    auth,
    notistack,
    contacts,
    gdUTable,
    gdUForms,
    gdUConfirmDisabledAccount,
    gdUUpdateSeccion,
    gdUSelected,
    gdUPA,
    gdUPD,
    gdUPREN,
    gdPTable,
    gdPUBC,
    gdPUBConfirm,
    gdPUBE,
    gdBTable,
    gdBConfirm,
    gdBForm,
    gdBVerForm,
    gdSCTable,
    gdCO,
    gdUserBForm,
    gdConfigCForm,
    gdCConfigTable,
    gdGCConfirm,
    gdGCDUTable,
    gdGCDUConfirm,
    requestStatus,
    tables,
  },
});