import { configureStore } from "@reduxjs/toolkit";

// Reducers
import configs from './slices/configs';
import auth from "./slices/auth";
import notistack from "./slices/notistack";
import contacts from "./slices/contacts";
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
    gdGCDUTable,
    gdGCDUConfirm,
    requestStatus,
    tables,
  },
});