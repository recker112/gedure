import React, { useEffect, useState, useCallback } from 'react';

import {
	Grid,
	Avatar,
	Button,
	TextField,
	Divider,
	Box,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		height: theme.spacing(10),
		width: theme.spacing(10),
	}
}));

function ChangeAvatar({ id }) {
	const [progress, setProgress] = useState(0);
	const { dataUser, loading, data, user } = useSelector((state) => ({
		dataUser: state.forms.showUser.data.user,
		loading: state.forms.updateAvatar.loading,
		data: state.forms.updateAvatar.data,
		user: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	const onUploadProgress = useCallback((progressEvent) => {
		let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

		setProgress(percentCompleted);
		// eslint-disable-next-line
	}, []);
	
	useEffect(()=>{
		const changeAvatar = async () => {
			dispatch(updateForms('updateAvatar', true));
			
			// FormData
			const formData = new FormData();
			if (data.avatar === 'delete') {
				formData.append('delete_avatar', true);
			}else {
				formData.append('avatar', data.avatar);
			}
			formData.append('_method', 'PUT');
			
			const prepare = {
				url: `v1/user/${id}`,
				type: 'post',
				data: formData,
				otherData: {
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					onUploadProgress: onUploadProgress,
				},
				successText: 'Avatar actualizado',
			};

			const response = await fetchData(prepare);

			if (response) {
			
				dispatch(updateForms('showUser', false, response));
				
				if (response.user.id === user.id) {
					dispatch(updateDataUser({
						user: response.user
					}));
				}
			}
			
			dispatch(updateForms('updateAvatar', false, {}));
			setProgress(0);
		}
		
		if (data.avatar) {
			changeAvatar();
		}
		// eslint-disable-next-line
	},[data.avatar]);
	
	const handleChange = (e) => {
		dispatch(updateForms('updateAvatar', false, {
			[e.target.name]: e.target.files[0]
		}));
	}
	
	return (
		<Grid container alignItems='center' spacing={2} item xs={12}>
			<Grid item>
				<Avatar 
					alt='Avatar User' 
					src={dataUser.avatar} 
					className={classes.avatar}
				>
					{dataUser.name.substring(0, 1).toUpperCase()}
				</Avatar>
			</Grid>
			<Grid item>
				<input 
					id='update_avatar_user' 
					type='file' 
					style={{display: 'none'}}
					accept="image/*"
					name='avatar' 
					onChange={handleChange}
					value=''
				/>
				<label htmlFor='update_avatar_user'>
					<LoadingComponent 
						loading={loading} 
						progressLoading 
						progress={progress}
					>
						<Button variant='contained' color='primary' component='span' disableElevation>
							Cambiar avatar
						</Button>
					</LoadingComponent>
				</label>
			</Grid>
			<Grid item>
				<Button 
					onClick={()=>handleChange({target:{name:'avatar',files:['delete']}})} 
					variant='outlined'
					disabled={loading}
				>
					Quitar avatar
				</Button>
			</Grid>
		</Grid>
	);
}

export default function Perfil({ id }) {
	const { dataUser, loading, user } = useSelector((state) => ({
		dataUser: state.forms.showUser.data.user,
		loading: state.forms.updatePerfil.loading,
		user: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { register, handleSubmit, errors, setError } = useForm({
		mode: 'onTouched',
	});
	const { fetchData } = useFetch(setError);
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePerfil', true));
		let data = {};
		
		// setear datos si son diferentes
		if (submitData.username !== dataUser.username) {
			data.username = submitData.username
		}
		if (submitData.email !== dataUser.email) {
			data.email = submitData.email;
		}
		data.name = submitData.name;
		data._method = 'PUT';
		
		const prepare = {
			url: `v1/user/${id}`,
			type: 'post',
			data,
			successText: 'Datos actualizados',
		};

		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateForms('showUser', false, response));
			
			if (response.user?.id === user.id) {
				dispatch(updateDataUser({
					user: response.user
				}));
			}
		}
		
		dispatch(updateForms('updatePerfil', false));
	}
	
	return (
		<React.Fragment>
			<Box mb={4}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h6' component='span' className='text__bold--semi'>
							Avatar del usuario
						</Typography>
						<Box mt={1}>
							<Divider />
						</Box>
					</Grid>
					<ChangeAvatar id={id} />
				</Grid>
			</Box>
			<Box>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h6' component='span' className='text__bold--semi'>
							Perfil del usuario
						</Typography>
						<Box mt={1}>
							<Divider />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<TextField 
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
								minLength: { value: 3, message: 'Error: Demaciado corto' },
								maxLength: { value: 30, message: 'Error: Demaciado largo' },
							})}
							name='username'
							error={Boolean(errors?.username)}
							helperText={errors?.username?.message ? errors.username.message : 'El usuario identificará a esta cuenta dentro del sistema'}
							label='Usuario o cédula'
							defaultValue={dataUser.username} 
							variant='outlined'
							size='small'
							disabled={loading}
							fullWidth 
						/>
					</Grid>
					
					<Grid item xs={12}>
						<TextField 
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
								minLength: { value: 3, message: 'Error: Demaciado corto' },
								maxLength: { value: 90, message: 'Error: Demaciado largo' },
							})}
							name='name'
							error={Boolean(errors?.name)}
							helperText={errors?.name?.message ? errors.name.message : 'El nombre puede ser visto por otros usuarios, tenga discreción con lo que coloque aquí'}
							label='Nombre de la cuenta'
							defaultValue={dataUser.name} 
							variant='outlined' 
							size='small' 
							disabled={loading}
							fullWidth
						/>
					</Grid>
					
					<Grid item xs={12}>
						<TextField 
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Error: Correo no válido',
								},
							})}
							name='email'
							error={Boolean(errors?.email)}
							helperText={errors?.email?.message ? errors.email.message : 'Este correo será usado en distintas partes de la App para una comunicación directa con el usuario'}
							label='Correo electónico'
							defaultValue={dataUser.email} 
							variant='outlined' 
							size='small' 
							disabled={loading}
							fullWidth
						/>
					</Grid>
					
					<Grid container justify='flex-end' item xs={12}>
						<LoadingComponent loading={loading}>
							<Button 
								onClick={handleSubmit(onSubmit)}
								variant='contained' 
								color='primary' 
								disableElevation
							>
								Actualizar
							</Button>
						</LoadingComponent>
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	);
}