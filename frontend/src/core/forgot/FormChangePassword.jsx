/**
 * React Router
 */
import { useNavigate } from "react-router-dom";

/**
 * MUI
 */
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

/**
 * RHF
 */
import { FormProvider, useForm } from "react-hook-form";
import { InputPasswordHook } from "../../components/form/inputs";
import { OTPHook } from "../../components/form/inputs/OTPHook";
import { REQUIRED, isOtpExhausted, newPasswordRules, otpRules } from "../../components/form/rules";

/**
 * Components
 */
import ResendCode from "./ResendCode";

/**
 * Redux
 */
import { useChangePasswordMutation, useResendCodeMutation } from "../../store/services/auth/AuthApi";

/**
 * Paso 2: código + contraseña nueva. Al cambiarla el backend cierra todas las
 * sesiones de la cuenta; se vuelve al login.
 */
export default function FormChangePassword({ login, onBack }) {
  const methods = useForm({ defaultValues: { otp: "", new_password: "", new_password_confirmation: "" } });
  const navigate = useNavigate();

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [resendCodeRTK, { isLoading: isResending }] = useResendCodeMutation();

  const exhausted = isOtpExhausted(methods.formState.errors.otp?.message);

  const handleResendCode = async () => {
    const result = await resendCodeRTK({ body: { login } });
    if (!result.error) {
      methods.setValue("otp", "");
      methods.clearErrors("otp");
    }
    return result;
  };

  const onSubmit = (data) => {
    changePassword({
      body: { ...data, otp: data.otp.toUpperCase(), login },
      callback: () => navigate("/auth", { replace: true }),
      setError: methods.setError,
    });
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        aria-label="Restablecer contraseña"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        spacing={2.5}
        sx={{ mt: 3 }}
      >
        {/* Para que el gestor de contraseñas asocie la nueva a esta cuenta. */}
        <input type="text" name="username" autoComplete="username" value={login} readOnly hidden />
        <OTPHook name="otp" label="Código de seguridad" rules={otpRules} disabled={isLoading} autoFocus />
        {exhausted && (
          <Alert
            severity="warning"
            action={
              <Button color="inherit" size="small" onClick={handleResendCode} loading={isResending}>
                Pedir código nuevo
              </Button>
            }
          >
            Has superado el número de intentos con este código. Pide uno nuevo.
          </Alert>
        )}
        <ResendCode resendCode={handleResendCode} />
        <Divider />
        <InputPasswordHook
          name="new_password"
          label="Contraseña nueva"
          rules={newPasswordRules}
          autoComplete="new-password"
          helperText="Mínimo 8 caracteres"
          disabled={isLoading}
          fullWidth
        />
        <InputPasswordHook
          name="new_password_confirmation"
          label="Repite la contraseña nueva"
          rules={{
            required: REQUIRED,
            validate: (value, { new_password }) => value === new_password || "Las contraseñas no coinciden",
          }}
          autoComplete="new-password"
          disabled={isLoading}
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" loading={isLoading} fullWidth>
          Cambiar contraseña
        </Button>
        <Link
          component="button"
          type="button"
          variant="body2"
          onClick={onBack}
          disabled={isLoading}
          sx={{ alignSelf: "center" }}
        >
          Volver al paso anterior
        </Link>
      </Stack>
    </FormProvider>
  );
}
