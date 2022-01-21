import { configureStore } from "@reduxjs/toolkit";

// Reducers
import configs from './slices/configs';
import auth from "./slices/auth";
import news from "./slices/news";
import newsShow from "./slices/news/show";
import notistack from "./slices/notistack";
import contacts from "./slices/contacts";

export default configureStore({
  reducer: {
    configs,
    auth,
    news,
    newsShow,
    notistack,
    contacts,
  },
});