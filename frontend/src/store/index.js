import { configureStore } from "@reduxjs/toolkit";

// Reducers
import configs from './slices/configs';

export default configureStore({
  reducer: {
    configs,
  },
})