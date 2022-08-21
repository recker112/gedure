import React from 'react';

// MUI
import { Button, Grid, Paper, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useFormContext } from "react-hook-form";
import { InputHook } from '../../../../components/form/inputs';
import { Box } from '@mui/system';
import { SwitchHook } from '../../../../components/form/switch';

// Components
import MarkDown from './MarkDown';
import DropAreaGalery from './DropAreaGalery';

// Redux
import { useSelector } from 'react-redux';

export default function MakePost() {
  const { control, register, watch } = useFormContext();

  const { loading, progress } = useSelector(state => state.requestStatus.createPost);

  return (
    <Paper className='paper--padding' elevation={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
					<Typography variant='h6' align='center'>Crear publicación</Typography>
				</Grid>
        <Grid item xs={12}>
          <InputHook
            data-tour="gdPub__title"
            control={control}
            rules={{
              required: '* Campo requerido',
              minLength: { value: 6, message: 'Error: Demaciado corto' },
              maxLength: { value: 100, message: 'Error: Demaciado largo' },
            }}
            name='title'
            label='Título'
            helperText='Ingrese un título para su publicación'
            size='small'
            variant='outlined'
            fullWidth
            defaultValue={''}
            disabled={loading}
          />
        </Grid>
        <Grid container item xs={12}>
          <MarkDown
            defaultValue={''}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' className="text__bold--big text__opacity--semi">
            Opcionales
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <input
            {...register('portada')}
            accept="image/*"
            style={{display: 'none'}}
            id="button-file-portada"
            disabled={loading}
            type="file"
          />
          <label htmlFor="button-file-portada">
            <Button color='primary' disabled={loading} variant='contained' component='span' disableElevation>
              Cargar portada
            </Button>
          </label>
          {watch('portada',[])?.length ? (
            <Box ml={2} fontSize='body1.fontSize' component='span'>Portada cargada</Box>	
          ) : null}
        </Grid>
        <Grid item xs={12}>
					<SwitchHook
						control={control}
						disabled={loading}
						defaultValue={false}
						name='only_users'
						label='Disponible solo para usuarios'
					/>
				</Grid>
        <Grid item xs={12}>
          <DropAreaGalery label='Galería de imágenes, arrastre o de click para cargar imágenes' defaultValue={[]} />
        </Grid>
        <Grid container justifyContent='flex-end' item xs={12}>
          <LoadingButton 
            variant='contained'
            type='submit'
            loading={loading}
            loadingIndicator={loading && progress < 99 ? `${progress}%` : null} 
            color='primary'
            disableElevation
          >
            Crear
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  )
}
