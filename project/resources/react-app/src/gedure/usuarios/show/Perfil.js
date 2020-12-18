import React from 'react';

import {
	Grid,
	Avatar,
	Button,
	TextField,
	Divider,
	Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		height: theme.spacing(10),
		width: theme.spacing(10),
	}
}));

export default function Perfil() {
	const classes = useStyles();
	
	return (
		<Grid container spacing={2} item xs={9}>
			<Grid container alignItems='center' spacing={2} item xs={12}>
				<Grid item xs={12}>
					<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>Perfil del usuario</Box>
					<Divider />
				</Grid>
				<Grid item>
					<Avatar className={classes.avatar}>R</Avatar>
				</Grid>
				<Grid item>
					<Button variant='contained' color='primary' disableElevation>Cambiar avatar</Button>
				</Grid>
				<Grid item>
					<Button variant='outlined'>Quitar avatar</Button>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<TextField label='Usuario' variant='outlined' helperText='El usuario identificará a esta cuenta dentro del sistema' size='small' fullWidth />
			</Grid>
			<Grid item xs={12}>
				<TextField label='Nombre de la cuenta' variant='outlined' helperText='El nombre puede ser visto por otros usuarios, tenga discreción con lo que coloque aquí' size='small' fullWidth />
			</Grid>
			<Grid item xs={12}>
				<TextField label='Correo electrónico' variant='outlined' helperText='Este correo será usado en distintas partes de la App para una comunicación directa con el usuario' size='small' fullWidth />
			</Grid>
			<Grid container justify='flex-end' item xs={12}>
				<Button variant='contained' color='secondary' disableElevation>Guardar</Button>
			</Grid>
		</Grid>
	);
}