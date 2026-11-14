/**
 * MUI
 */
import TextField from "@mui/material/TextField";

/**
 * RHF
 */
import { useController, useFormContext } from "react-hook-form";

/** TextField conectado a react-hook-form (el error del campo va en helperText). */
export function InputHook({ name, rules = null, defaultValue = "", helperText = "", type = "text", ...rest }) {
  const { control } = useFormContext();

  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
  } = useController({ name, control, rules, defaultValue });

  return (
    <TextField
      type={type}
      inputRef={ref}
      {...inputProps}
      {...rest}
      error={invalid}
      helperText={error ? error.message : helperText}
    />
  );
}
