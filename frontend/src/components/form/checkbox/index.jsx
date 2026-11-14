/**
 * MUI
 */
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

/**
 * RHF
 */
import { useController, useFormContext } from "react-hook-form";

/** Checkbox con etiqueta conectado a react-hook-form (valor booleano). */
export function CheckBoxHook({ name, label, defaultValue = false, rules = null, ...rest }) {
  const { control } = useFormContext();

  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { invalid },
  } = useController({ name, control, defaultValue, rules });

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...inputProps}
          {...rest}
          name={name}
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          slotProps={{ input: { ref } }}
        />
      }
      label={label}
      sx={{ color: invalid ? "error.main" : "text.primary" }}
    />
  );
}
