/**
 * React
 */
import { useState } from "react";

/**
 * RHF
 */
import { FormProvider, useForm, useWatch } from "react-hook-form";

/**
 * MUI
 */
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

/**
 * Components
 */
import { InputHook } from "../../components/form/inputs/InputHook";
import { REQUIRED } from "../../components/form/rules";
import { useSessionUser } from "../../hooks/auth/useSessionUser";
import { MAX_MESSAGE } from "../contact/ContactForm";
import { SUPPORT_REASONS } from "./mockData";

const DEFAULTS = { motivo: "", asunto: "", mensaje: "" };

/**
 * Soporte con sesión: la versión de «Contáctanos» para quien ya entró. No
 * pide nombre, correo ni teléfono (salen de la sesión; solo se muestran).
 * MAQUETA: no hay endpoint todavía; al enviar valida y avisa de que estará
 * disponible próximamente.
 */
export default function SupportForm() {
  const { name, username, email } = useSessionUser();
  const methods = useForm({ defaultValues: DEFAULTS, mode: "onTouched" });
  const [sent, setSent] = useState(false);
  const mensaje = useWatch({ control: methods.control, name: "mensaje" }) ?? "";
  const sender = [name || username, email].filter(Boolean).join(" · ");

  const onSubmit = () => setSent(true);

  return (
    <FormProvider {...methods}>
      <Stack component="form" noValidate aria-label="Formulario de soporte" spacing={2.5} onSubmit={methods.handleSubmit(onSubmit)}>
        <Typography variant="body2" color="textSecondary">
          Se enviará como: <strong>{sender}</strong>
        </Typography>
        <InputHook name="motivo" label="Motivo" select fullWidth rules={{ required: REQUIRED }}>
          {SUPPORT_REASONS.map((r) => (
            <MenuItem key={r.value} value={r.value}>
              {r.label}
            </MenuItem>
          ))}
        </InputHook>
        <InputHook name="asunto" label="Asunto (opcional)" fullWidth rules={{ maxLength: { value: 60, message: "Máximo 60 caracteres" } }} slotProps={{ htmlInput: { maxLength: 60 } }} />
        <InputHook
          name="mensaje"
          label="Mensaje"
          fullWidth
          multiline
          minRows={5}
          helperText={`${mensaje.length}/${MAX_MESSAGE} caracteres`}
          rules={{
            required: REQUIRED,
            minLength: { value: 10, message: "Cuéntanos un poco más (mínimo 10 caracteres)" },
            maxLength: { value: MAX_MESSAGE, message: `Máximo ${MAX_MESSAGE} caracteres` },
          }}
          slotProps={{ htmlInput: { maxLength: MAX_MESSAGE } }}
        />
        {sent && (
          <Alert severity="info" role="status">
            El envío de solicitudes de soporte estará disponible próximamente. Mientras tanto, escríbenos a la dirección del colegio.
          </Alert>
        )}
        <Button type="submit" variant="contained" size="large" endIcon={<SendOutlinedIcon />} sx={{ alignSelf: { sm: "flex-start" } }}>
          Enviar
        </Button>
      </Stack>
    </FormProvider>
  );
}
