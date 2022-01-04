import { configureStore } from "@reduxjs/toolkit";

// Reducers
import configs from './slices/configs';
import auth from "./slices/auth";
import news from "./slices/news";

export default configureStore({
  reducer: {
    configs,
    auth,
    news,
  },
});