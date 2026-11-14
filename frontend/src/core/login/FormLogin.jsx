/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * RHF
 */
import { FormProvider, useForm } from "react-hook-form";
import { InputHook, InputPasswordHook } from "../../components/form/inputs";
import { CheckBoxHook } from "../../components/form/checkbox";
import { loginRules, passwordRules } from "../../components/form/rules";

/**
 * MUI
 */
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import LoginIcon from "@mui/icons-material/Login";

/**
 * Redux
 */
import { useLoginMutation } from "../../store/services/auth/AuthApi";

/**
 * Login con usuario, cédula o correo. No navega: al guardar la sesión
 * temporal, el guard NoSeeAuth lleva a /auth/2fa.
 */
export default function FormLogin() {
  const methods = useForm({ defaultValues: { login: "", password: "", remember: false } });
  const [postLogin, { isLoading }] = useLoginMutation();

  const onSubmit = ({ login, password, remember }) => {
    postLogin({ body: { login: login.trim(), password, remember }, setError: methods.setError });
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        aria-label="Inicio de sesión"
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
        <InputPasswordHook
          name="password"
          label="Contraseña"
          rules={passwordRules}
          autoComplete="current-password"
          disabled={isLoading}
          fullWidth
        />
        <CheckBoxHook name="remember" label="Mantener sesión iniciada" disabled={isLoading} />
        <Button loading={isLoading} type="submit" variant="contained" size="large" endIcon={<LoginIcon />} fullWidth>
          Entrar
        </Button>
        <Link component={RouterLink} to="/auth/forgot-password" variant="body2" sx={{ alignSelf: "center", pt: 1 }}>
          ¿Olvidaste tu contraseña?
        </Link>
      </Stack>
    </FormProvider>
  );
}
