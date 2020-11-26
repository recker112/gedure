import React, { useState } from 'react';

import {
	Typography,
	Grid,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormHelperText,
	Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import DataAccount from './components/DataAccount';
import PasswordAccount from './components/PasswordAccount';
import PermissionsAccount from './components/PermissionsAccount';

const useStyles = makeStyles((theme) => ({
  card: {
		transition: '.5s',
  	'&:hover': {
			transform: 'scale(1.05)',
		},
  },
	formControlSelect: {
    minWidth: '100%',
  },
}));

function StepRegisterUser() {
	const [typeRegister, setTypeRegister] = useState('manual');
	const classes = useStyles();
	
	const handleChange = (event) => {
		setTypeRegister(event.target.value);
	}
	
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
							<FormControl className={classes.formControlSelect}>
								<InputLabel id="register-user-type-label">Tipo de registro</InputLabel>
								<Select
									labelId="register-user-type-label"
									id="register-user-type"
									value={typeRegister}
									onChange={handleChange}
								>
									<MenuItem value='manual'>Manual</MenuItem>
									<MenuItem value='invitacion'>invitación</MenuItem>
								</Select>
								<FormHelperText>Seleccione el modo que deséa usar</FormHelperText>
							</FormControl>
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
			{typeRegister === 'manual' && (
				<React.Fragment>
					<DataAccount classes={classes} />
					<PasswordAccount />
					<PermissionsAccount />
				</React.Fragment>
			)}
		</Grid>
	);
}

export default StepRegisterUser;