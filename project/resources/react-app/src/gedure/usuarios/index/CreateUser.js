import React from 'react';

import {
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	FormControlLabel,
	Switch,
	MenuItem,
	TextField,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Component
import AnimationDialog from '../../../components/AnimationDialog';
import { RenderSelectFormHook } from '../../../components/RendersGlobals';
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
	
	const { register, handleSubmit, control, errors, setError, setValue } = useForm({
		mode: 'onTouched',
	});
	const { fetchData } = useFetch(setError);
	
	const handleClose = () => {
		dispatch(updateDialogs('crearUser', false, false));
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
							<FormControlLabel
								control={<Switch disabled={loading} name='invitation_mode' inputRef={register} color="primary" />}
								label="El usuario genera su contraseña"
							/>
						</Grid>
						<Grid item xs={12}>
							<RenderSelectFormHook
								id='user-privilegio'
								name='privilegio'
								nameLabel='Tipo de cuenta'
								control={control}
								defaultValue=''
								errors={errors?.privilegio}
								helperText='* Campo requerido'
								customWidth={150}
								disabled={loading}
							>
								<MenuItem value=''><em>Ninguno</em></MenuItem>
								<MenuItem value='V-'>Estudiante</MenuItem>
								<MenuItem value='A-'>Administrador</MenuItem>
							</RenderSelectFormHook>
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
								helperText={errors?.username?.message ? errors.username.message : '* Campo requerido'}
								label='Usuario o cédula'
								size='small'
								fullWidth
								disabled={loading}
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
								helperText={errors?.name?.message ? errors.name.message : '* Campo requerido'}
								label='Nombre y apellido'
								size='small'
								fullWidth
								disabled={loading}
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
								helperText={errors?.email?.message ? errors.email.message : '* Campo requerido'}
								label='Correo'
								size='small'
								fullWidth
								disabled={loading}
							/>
						</Grid>
						<PasswordSection 
							register={register} 
							errors={errors} 
							control={control} 
							disabled={loading}
							setValue={setValue}
						/>
						<StudiendSection
							errors={errors} 
							control={control}
							disabled={loading}
						/>
						<PermissionsSection control={control} disabled={loading} />
					</Grid>
				</form>
			</DialogContent>
			<DialogActions>
				<FormControlLabel
					control={<Switch color="primary" name='create_more' inputRef={register} />}
					label="Crear más de uno"
					labelPlacement="start"
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