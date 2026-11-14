/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

/**
 * RHF
 */
import { FormProvider, useForm } from "react-hook-form";
import { InputHook } from "../../components/form/inputs";
import { loginRules } from "../../components/form/rules";

/**
 * Redux
 */
import { useForgotMutation } from "../../store/services/auth/AuthApi";

/** Paso 1: pide el código. La respuesta es siempre neutra (no revela si la cuenta existe). */
export default function FormForgotPassword({ onSent }) {
  const methods = useForm({ defaultValues: { login: "" } });
  const [forgot, { isLoading }] = useForgotMutation();

  const onSubmit = ({ login }) => {
    const value = login.trim();
    forgot({
      body: { login: value },
      callback: (msg) => onSent({ login: value, msg }),
      setError: methods.setError,
    });
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        aria-label="Recuperar contraseña"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        spacing={2}
        sx={{ mt: 4 }}
      >
        <InputHook
          name="login"
          label="Usuario, cédula o correo"
          rules={loginRules}
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          disabled={isLoading}
          autoFocus
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" loading={isLoading} fullWidth>
          Enviar código
        </Button>
        <Link component={RouterLink} to="/auth" variant="body2" sx={{ alignSelf: "center", pt: 1 }}>
          Volver al inicio de sesión
        </Link>
      </Stack>
    </FormProvider>
  );
}
