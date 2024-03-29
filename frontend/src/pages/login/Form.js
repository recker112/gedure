import React from "react";

// MUI
import { Container, Grid, Typography, Link } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// FormHook
import { useForm } from "react-hook-form";

// Router
import { Link as RouterLink } from 'react-router-dom';

// Components
import { InputHook, InputPasswordHook } from "../../components/form/inputs";
import { CheckboxHook } from "../../components/form/checkbox";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/requestStatus/async_trunk/login";

const classes = {
  button: {
    width: 160,
  }
}

export default function Form() {
  const loading = useSelector(state => state.requestStatus.login.loading);
  const dispatch = useDispatch();

  // NOTA(RECKER): FormHook
  const { handleSubmit, control } = useForm({
		mode: 'onTouched',
	});

  const onSubmit = (data) => {
		dispatch(login(data));
  }
  return (
    <Container maxWidth="sm" className="container--margin">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className="text__bold--semi" sx={{typography: {xs: 'h4', sm: 'h3'}}}>
              Ingrese sus datos
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <InputHook
              variant="filled"
              control={control}
              rules={{
                required: '* Campo requerido',
                minLength: { value: 3, message: 'Error: No válido' },
                maxLength: { value: 30, message: 'Error: No válida' }
              }}
              name='username'
              label='Usuario o cédula'
              helperText='* Campo requerido'
              fullWidth
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <InputPasswordHook
              variant="filled"
              control={control}
              rules={{
                required: '* Campo requerido',
                minLength: { value: 4, message: 'Error: No válido' },
                maxLength: { value: 25, message: 'Error: No válida' }
              }}
              name='password'
              label='Contraseña'
              helperText='* Campo requerido'
              fullWidth
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <CheckboxHook
              control={control}
              name='checkbox'
              label='Mantener abierto'
              color='primary'
              disabled={loading}
            />
          </Grid>

          <Grid container item xs={12}>
            <Link component={RouterLink} to='/recuperar' underline="hover">
              <Typography>Recuperar contraseña</Typography>
            </Link>
          </Grid>

          <Grid container justifyContent='center' item xs={12}>
            <LoadingButton
              type="submit"
              color='primary'
              variant='contained'
              sx={classes.button}
              loading={loading}
            >
              Entrar
            </LoadingButton>
          </Grid>

          <Grid container justifyContent='center' item xs={12}>
            <Link color="inherit" component={RouterLink} to='/' underline="hover">
              <Typography className='text__bold--semi'>Volver al incio</Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
