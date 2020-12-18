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

// Component
import AnimationDialog from '../../../components/AnimationDialog';
import { RenderSelectFormHook } from '../../../components/RendersGlobals';
import PasswordSection from './PasswordSection';
import StudiendSection from './StudiendSection';
import PermissionsSection from './PermissionsSection';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from '../../../actions/updateDialogs';

export default function CreateUser() {
	const { open } = useSelector((state) => ({
		open: state.dialogs.crearUser.open,
	}));
	const dispatch = useDispatch();
	
	const { register, handleSubmit, control, errors, } = useForm({
		mode: 'onTouched',
	});
	
	const handleClose = () => {
		dispatch(updateDialogs('crearUser', false, false));
	}
	
	const onSubmit = (submitData) => {
		console.log(submitData);
	}
	
	return (
		<Dialog open={open} onClose={handleClose} TransitionComponent={AnimationDialog}>
			<DialogTitle>Crear usuario</DialogTitle>
			<DialogContent>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Switch name='password_registred' inputRef={register} color="primary" />}
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
						/>
					</Grid>
					<PasswordSection register={register} errors={errors} control={control} />
					<StudiendSection register={register} errors={errors} control={control} />
					<PermissionsSection register={register} control={control} />
				</Grid>
			</DialogContent>
			<DialogActions>
				<FormControlLabel
					control={<Switch color="primary" />}
					label="Crear más de uno"
					labelPlacement="start"
				/>
				<Button onClick={handleClose}>
					Cancelar
				</Button>
				<Button onClick={handleSubmit(onSubmit)}>
					Crear
				</Button>
			</DialogActions>
		</Dialog>
	);
}