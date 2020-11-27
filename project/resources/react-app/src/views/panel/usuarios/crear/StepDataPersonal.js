import React from 'react';

import {
	Typography,
	Grid,
	MenuItem,
	Paper,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import { RenderSelectFormHook } from '../../../../components/RendersGlobals';
import DataAccount from './components/DataAccount';
import PasswordAccount from './components/PasswordAccount';
import Curso from './components/Curso';
import PermissionsAccountStudiend from './components/PermissionsAccountStudiend';
import PermissionsAccountAdmin from './components/PermissionsAccountAdmin';

// Redux
import { useSelector } from 'react-redux';

function StepRegisterUser() {
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	const { watch, control, errors } = useFormContext();
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Paper className='paper--padding' elevation={0}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h5' className='text__bold--big'>
								Tipo de registro
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<RenderSelectFormHook
								id='type-register'
								name='type_register'
								nameLabel='Tipo de registro'
								control={control}
								defaultValue='manual'
								errors={errors.type_register}
								helperText='Seleccione el modo que desea usar'
								disabled={loading}
								>
								<MenuItem value='manual'>Manual</MenuItem>
								<MenuItem value='invitacion'>invitación</MenuItem>
							</RenderSelectFormHook>
						</Grid>
						<Grid item xs={12}>
							<Typography>
								Modo Manual: En el modo manual usted registrará a un usuario rellenando todos sus campos.
							</Typography>
							<Typography>
								Modo invitación: En el modo invitación se enviará un enlace por correo al usuario para que él registre sus datos.
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			{watch('type_register') === 'manual' && (
				<React.Fragment>
					<DataAccount />
					<PasswordAccount />
					{watch('privilegio', '') === 'V-' && (
						<Curso />
					)}
					
					{watch('privilegio', '') === 'V-' && (
						<PermissionsAccountStudiend />
					)}
					
					{watch('privilegio', '') === 'A-' && (
						<PermissionsAccountAdmin />
					)}
				</React.Fragment>
			)}
		</Grid>
	);
}

export default StepRegisterUser;