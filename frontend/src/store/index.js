import { configureStore } from "@reduxjs/toolkit";

// Reducers
import configs from './slices/configs';
import auth from "./slices/auth";
import notistack from "./slices/notistack";
import contacts from "./slices/contacts";
import requestStatus from "./slices/requestStatus";
import tables from "./slices/tables";

export default configureStore({
  reducer: {
    configs,
    auth,
    notistack,
    contacts,
    requestStatus,
    tables,
  },
});