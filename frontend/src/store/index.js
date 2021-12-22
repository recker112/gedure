import { configureStore } from "@reduxjs/toolkit";

// Reducers
import contadores from './slices/contadores';

export default configureStore({
  reducer: {
    contadores,
  },
})