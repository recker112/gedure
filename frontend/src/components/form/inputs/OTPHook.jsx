/**
 * MUI
 */
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { MuiOtpInput } from "mui-one-time-password-input";

/**
 * RHF
 */
import { useController, useFormContext } from "react-hook-form";

/** Solo letras y números; el backend usa ABCDEFGHJKMNPQRSTUVWXYZ23456789. */
const validateChar = (char) => /^[a-z0-9]$/i.test(char);

/**
 * Código de un solo uso en casillas (mui-one-time-password-input). Normaliza a
 * mayúsculas: el código se envía en mayúsculas aunque se escriba o pegue en
 * minúsculas. Cada casilla lleva su etiqueta accesible y la lib pone
 * `autoComplete="one-time-code"`.
 */
export function OTPHook({ name, rules = null, defaultValue = "", helperText = "", length = 6, label = "Código", ...rest }) {
  const { control } = useFormContext();

  const {
    field: { ref, onChange, ...inputProps },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

  const helperId = `${name}-helper`;

  return (
    <Box role="group" aria-label={label}>
      <MuiOtpInput
        {...inputProps}
        {...rest}
        ref={ref}
        length={length}
        validateChar={validateChar}
        onChange={(value) => onChange(String(value ?? "").toUpperCase())}
        TextFieldsProps={(index) => ({
          error: Boolean(error),
          placeholder: "·",
          slotProps: {
            htmlInput: {
              "aria-label": `${label}: carácter ${index + 1} de ${length}`,
              "aria-describedby": helperId,
              autoCapitalize: "characters",
              spellCheck: false,
            },
          },
        })}
      />
      <FormHelperText id={helperId} sx={{ mt: 1 }} error={Boolean(error)}>
        {error ? error.message : helperText}
      </FormHelperText>
    </Box>
  );
}
