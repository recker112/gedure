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
  },
});