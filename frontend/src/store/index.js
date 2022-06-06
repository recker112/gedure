import { configureStore } from "@reduxjs/toolkit";

// Reducers
import configs from './slices/configs';
import auth from "./slices/auth";
import news from "./slices/news";
import newsShow from "./slices/news/show";
import notistack from "./slices/notistack";
import contacts from "./slices/contacts";
import login from "./slices/login";
import gdHome from "./slices/gedure/home";
import gdRegistros from "./slices/gedure/registros";
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

export default configureStore({
  reducer: {
    configs,
    auth,
    news,
    newsShow,
    notistack,
    contacts,
    login,
    gdHome,
    gdRegistros,
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
  },
});