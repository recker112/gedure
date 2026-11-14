/**
 * React
 */
import { useState } from "react";

/**
 * MUI
 */
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

/**
 * RHF
 */
import { useController, useFormContext } from "react-hook-form";

/**
 * Contraseña con botón de mostrar/ocultar. Pasa `autoComplete`
 * ("current-password" en el login, "new-password" al cambiarla) para que el
 * gestor de contraseñas del navegador la guarde o la proponga.
 */
export function InputPasswordHook({ name, rules = null, defaultValue = "", helperText = "", ...rest }) {
  const { control } = useFormContext();
  const [visible, setVisible] = useState(false);

  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
  } = useController({ name, control, rules, defaultValue });

  const label = visible ? "Ocultar contraseña" : "Mostrar contraseña";

  return (
    <TextField
      inputRef={ref}
      {...inputProps}
      {...rest}
      error={invalid}
      helperText={error ? error.message : helperText}
      type={visible ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={label}
                aria-pressed={visible}
                onClick={() => setVisible((v) => !v)}
                edge="end"
                size={rest?.size}
              >
                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
