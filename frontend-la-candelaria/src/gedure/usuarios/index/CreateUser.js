import React from 'react';

import {
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button,
	MenuItem,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Component
import {
	InputHook,
	SwitchHook,
	SelectHook,
} from '@form-inputs';
import AnimationDialog from '../../../components/AnimationDialog';
import PasswordSection from './PasswordSection';
import StudiendSection from './StudiendSection';
import PermissionsSection from './PermissionsSection';
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function CreateUser({ tableRef }) {
	const { open, loading } = useSelector((state) => ({
		open: state.dialogs.crearUser.open,
		loading: state.dialogs.crearUser.loading,
	}));
	const dispatch = useDispatch();
	
	const { handleSubmit, control, setError, setValue } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const { fetchData } = useFetch(setError);
	
	const handleClose = () => {
		if (!loading) {
			dispatch(updateDialogs('crearUser', false, false));	
		}
	}
	
	const onSubmit = async (submitData) => {
		dispatch(updateDialogs('crearUser', true, true));
		
		let url;
		if (submitData.invitation_mode) {
			url = 'v1/invitation/users';
		}else {
			url = 'v1/user';
		}
		delete submitData.invitation_mode;
		
		if (submitData.curso_id) {
			submitData.curso_id = submitData.curso_id.id;
		}
		
		const prepare = {
			url,
			type: 'post',
			data: submitData,
			message404Server: true,
		};

		const response = await fetchData(prepare);
		
		if (response) {
			tableRef.current && tableRef.current.onQueryChange();
			if (!submitData.create_more) {
				handleClose();
			}else {
				dispatch(updateDialogs('crearUser', true, false));
			}
		}else {
			dispatch(updateDialogs('crearUser', true, false));
		}
	}
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Crear usuario</DialogTitle>
			<DialogContent>
				<form autoComplete='off'>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<SwitchHook
								control={control}
								label="El usuario genera su contraseña"
								name='invitation_mode'
								color="primary"
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={12}>
							<SelectHook
								name='privilegio'
								label='Tipo de cuenta'
								control={control}
								disabled={loading}
								fullWidth
							>
								<MenuItem value=''><em>Ninguno</em></MenuItem>
								<MenuItem value='V-'>Estudiante</MenuItem>
								<MenuItem value='A-'>Administrador</MenuItem>
							</SelectHook>
						</Grid>
						<Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 3, message: 'Error: Demaciado corto' },
									maxLength: { value: 30, message: 'Error: Demaciado largo' },
								}}
								name='username'
								label='Usuario o cédula'
								size='small'
								fullWidth
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									minLength: { value: 3, message: 'Error: Demaciado corto' },
									maxLength: { value: 90, message: 'Error: Demaciado largo' },
								}}
								name='name'
								label='Nombre y apellido'
								size='small'
								fullWidth
								disabled={loading}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputHook
								control={control}
								rules={{
									required: '* Campo requerido',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Error: Correo no válido',
									},
								}}
								name='email'
								label='Correo'
								size='small'
								fullWidth
								disabled={loading}
							/>
						</Grid>
						<PasswordSection
							control={control} 
							disabled={loading}
							setValue={setValue}
						/>
						<StudiendSection
							control={control}
							disabled={loading}
						/>
						<Grid item xs={12}>
							<DialogContentText>Permisos</DialogContentText>
						</Grid>
						<PermissionsSection 
							control={control} 
							disabled={loading}
							setValue={setValue}
						/>
					</Grid>
				</form>
			</DialogContent>
			<DialogActions>
				<SwitchHook
					control={control}
					name='create_more'
					label="Crear más de uno"
					labelPlacement="start"
					color="primary"
					disabled={loading}
				/>
				<Button disabled={loading} onClick={handleClose}>
					Cancelar
				</Button>
				<LoadingComponent 
					loading={loading}
					color="inherit"
				>
					<Button onClick={handleSubmit(onSubmit)}>
						Crear
					</Button>
				</LoadingComponent>
			</DialogActions>
		</Dialog>
	);
}