import React from 'react';

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { uploadAvatar } from '../../../../../store/slices/gedure/usuarios/ver/requests/gdUPA';

const classes = {
  avatar: tema => ({
		backgroundColor: tema.palette.secondary.main,
		color: tema.palette.secondary.contrastText,
		height: tema.spacing(10),
		width: tema.spacing(10),
	})
}

export function PAvatarForm({ user, loadingUpload, loadingDelete, progress, handleSubmit, register }) {
  const { onChange, onBlur, name, ref } = register('avatar'); 

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6' component='span' className='text__bold--semi'>
					Avatar del usuario
				</Typography>
				<Box mt={1}>
					<Divider />
				</Box>
      </Grid>
      <Grid container alignItems='center' spacing={2} item xs={12}>
        <Grid item>
          <Avatar
						alt='Avatar User' 
						src={user.avatar} 
						sx={classes.avatar}
					>
						{user.name.substring(0, 1).toUpperCase()}
					</Avatar>
        </Grid>
        <Grid item>
					<input 
						id='update_avatar_user' 
						type='file' 
						style={{display: 'none'}}
						accept="image/*"
            disabled={loadingDelete}
            onChange={e => {
              onChange(e);
              handleSubmit();
            }}
            onBlur={onBlur}
            name={name}
            ref={ref}
					/>
					<label htmlFor='update_avatar_user'>
            <LoadingButton 
              variant='contained' 
              loading={loadingUpload}
              disabled={loadingDelete}
              loadingIndicator={loadingUpload && progress < 99 ? `${progress}%` : null} 
              color='primary'
              component='span' 
              disableElevation
            >
              Cambiar avatar
            </LoadingButton>
					</label>
				</Grid>
        <Grid item>
          <LoadingButton 
            variant='outlined' 
            loading={loadingDelete}
            disabled={loadingUpload}
            color='inherit'
            onClick={() => {
              onChange({target:{name:'avatar',value:'delete'}});
              handleSubmit();
            }}
          >
            Quitar avatar
          </LoadingButton>
				</Grid>
      </Grid>
    </Grid>
  )
}

export default function PAvatar() {
  const { id } = useParams();
  const { userSelected, loadingUpload, loadingDelete, progress } = useSelector(state => ({
    userSelected: state.requestStatus.userShow.userSelected,
    loadingUpload: state.gdUPA.loadingUpload,
    loadingDelete: state.gdUPA.loadingDelete,
    progress: state.gdUPA.progress,
  }));
  const dispatch = useDispatch();

  const { handleSubmit, register, resetField } = useForm();

  const onSubmit = async submitData => {
    const formData = new FormData();

    if (submitData.avatar === 'delete') {
      formData.append('delete_avatar', true);
    }else {
      formData.append('avatar', submitData.avatar[0]);
    }
    formData.append('_method', 'PUT');

    await dispatch(uploadAvatar({data: formData, id, type: submitData.avatar!=='delete' ? 1 : 2}));

    resetField('avatar');
  }

  return (
    <Box mb={4}>
      <PAvatarForm
        user={userSelected}
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        progress={progress}
        loadingUpload={loadingUpload}
        loadingDelete={loadingDelete}
      />
    </Box>
  )
}