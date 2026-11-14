import { createSlice } from "@reduxjs/toolkit";
import { readLocal, writeLocal } from "../../../components/utils/storage";

/**
 * Preferencia del sistema operativo: solo decide el tema inicial cuando el
 * usuario todavía no ha elegido uno (igual que el script de index.html).
 */
function systemTheme() {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

const initialState = {
  theme: readLocal("userConfig.theme", null) ?? systemTheme(),
};

export const userConfigSlice = createSlice({
  name: "userConfig",
  initialState,
  reducers: {
    /**
     * Genérico, como en BluLabel: `notSave` evita reescribir el storage
     * cuando el cambio viene de otra pestaña (evento `storage`).
     */
    updateUserConfig: (state, action) => {
      const { key, value, notSave } = action.payload;
      state[key] = value;
      if (!notSave) writeLocal(`userConfig.${key}`, value);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      writeLocal("userConfig.theme", state.theme);
    },
  },
});

export const { updateUserConfig, toggleTheme } = userConfigSlice.actions;

export default userConfigSlice.reducer;
