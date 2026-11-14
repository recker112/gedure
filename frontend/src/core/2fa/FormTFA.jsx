/**
 * React Router
 */
import { Link as RouterLink } from "react-router-dom";

/**
 * MUI
 */
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * RHF
 */
import { FormProvider, useForm } from "react-hook-form";
import { OTPHook } from "../../components/form/inputs/OTPHook";
import { isOtpExhausted, otpRules } from "../../components/form/rules";

/**
 * Components
 */
import ResendCode from "../forgot/ResendCode";

/**
 * Redux
 */
import { useResendCode2FAMutation, useTfaMutation } from "../../store/services/auth/AuthApi";

/**
 * Código del 2FA. No navega: al guardar el token definitivo, el guard
 * AuthProtect lleva al panel. Con el código agotado (5 fallos) ofrece pedir
 * uno nuevo o volver al login (cerrar la sesión temporal).
 */
export default function FormTFA() {
  const methods = useForm({ defaultValues: { otp: "" } });
  const [tfa, { isLoading }] = useTfaMutation();
  const [resendCodeRTK, { isLoading: isResending }] = useResendCode2FAMutation();

  const otpError = methods.formState.errors.otp?.message;
  const exhausted = isOtpExhausted(otpError);

  const onSubmit = ({ otp }) => {
    tfa({ body: { otp: otp.toUpperCase() }, setError: methods.setError });
  };

  const submit = methods.handleSubmit(onSubmit);

  // El backend saca al usuario del token temporal: no hace falta el correo.
  const handleResendCode = async () => {
    const result = await resendCodeRTK();
    if (!result.error) methods.reset({ otp: "" });
    return result;
  };

  return (
    <FormProvider {...methods}>
      <Stack component="form" aria-label="Verificación en dos pasos" noValidate onSubmit={submit} spacing={2.5} sx={{ mt: 4 }}>
        <OTPHook
          name="otp"
          label="Código de verificación"
          rules={otpRules}
          disabled={isLoading}
          autoFocus
          onComplete={() => !exhausted && submit()}
        />
        {exhausted && (
          <Alert
            severity="warning"
            action={
              <Button color="inherit" size="small" onClick={handleResendCode} loading={isResending}>
                Pedir código nuevo
              </Button>
            }
          >
            <AlertTitle>Código bloqueado</AlertTitle>
            Pide un código nuevo o{" "}
            <Link component={RouterLink} to="/auth/logout" color="inherit" underline="always">
              vuelve al inicio de sesión
            </Link>
            .
          </Alert>
        )}
        <ResendCode resendCode={handleResendCode} />
        <Button type="submit" variant="contained" size="large" loading={isLoading} disabled={exhausted} fullWidth>
          Verificar
        </Button>
        <Typography variant="body2" color="textSecondary">
          Si no completas este paso no podrás acceder a tu cuenta. Para cancelar,{" "}
          <Link component={RouterLink} to="/auth/logout">
            cierra la sesión
          </Link>{" "}
          o espera a que expire (15 minutos).
        </Typography>
      </Stack>
    </FormProvider>
  );
}
