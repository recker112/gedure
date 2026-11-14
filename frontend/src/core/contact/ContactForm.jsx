/**
 * React
 */
import { useState } from "react";

/**
 * MUI
 */
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

/** Mismo límite que el formulario de la web anterior. */
export const MAX_MESSAGE = 350;

const EMPTY = { nombre: "", email: "", telefono: "", asunto: "", mensaje: "" };

/**
 * Formulario de contacto. ESQUELETO: valida con el navegador y no envía nada;
 * se conectará a la API (solicitudes de contacto de Gedure) más adelante.
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setSent(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} aria-label="Formulario de contacto">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="Nombre y apellido" name="nombre" autoComplete="name" required fullWidth value={values.nombre} onChange={update("nombre")} slotProps={{ htmlInput: { minLength: 3, maxLength: 50 } }} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="Correo electrónico" name="email" type="email" autoComplete="email" required fullWidth value={values.email} onChange={update("email")} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="Teléfono" name="telefono" type="tel" autoComplete="tel" fullWidth value={values.telefono} onChange={update("telefono")} placeholder="+58 (412) 000-0000" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="Asunto" name="asunto" required fullWidth value={values.asunto} onChange={update("asunto")} slotProps={{ htmlInput: { minLength: 4, maxLength: 30 } }} />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Mensaje"
            name="mensaje"
            required
            fullWidth
            multiline
            minRows={6}
            value={values.mensaje}
            onChange={update("mensaje")}
            helperText={`${values.mensaje.length}/${MAX_MESSAGE} caracteres`}
            slotProps={{ htmlInput: { minLength: 10, maxLength: MAX_MESSAGE } }}
          />
        </Grid>
        {sent && (
          <Grid size={12}>
            <Alert severity="info" role="status">
              Gracias por escribirnos. El envío de mensajes estará disponible próximamente.
            </Alert>
          </Grid>
        )}
        <Grid size={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" size="large" endIcon={<SendOutlinedIcon />}>
            Enviar mensaje
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
