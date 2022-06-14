import { configureStore } from "@reduxjs/toolkit";

// Reducers
import configs from './slices/configs';
import auth from "./slices/auth";
import notistack from "./slices/notistack";
import contacts from "./slices/contacts";
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