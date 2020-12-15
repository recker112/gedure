import React from 'react';

import { 
	Grid,
	Typography,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogActions,
	DialogTitle,
	TextField,
	Button,
	FormControl,
	FormControlLabel,
	Switch,
	Select,
	MenuItem,
	InputLabel,
} from '@material-ui/core';

// Components
import SelectType from './components/SelectType';
import StepControls from './StepControls';

function StepType() {
	return (
		<Grid container justify='center' spacing={2}>
			<Grid item xs={12}>
				<Typography align='center' variant='h4' className='text__bold--big'>
					Tipo de cuenta
				</Typography>
			</Grid>
			<SelectType />
			<StepControls />
			<Dialog open={true}>
				<DialogTitle>Crear usuario</DialogTitle>
				<DialogContent>
					<DialogContentText>Datos del usuario</DialogContentText>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Switch color="primary" />}
								label="El usuario crea su contraseña"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl style={{minWidth: '150px'}}>
								<InputLabel id="createUser-type">Tipo de cuenta</InputLabel>
								<Select
									labelId="createUser-type"
									id="createUser-type-select"
								>
									<MenuItem value=''><em>Ninguno</em></MenuItem>
									<MenuItem value='V-'>Estudiante</MenuItem>
									<MenuItem value='A-'>Administrador</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField 
								label='Usuario o cédula'
								size='small'
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField 
								label='Nombre y apellido'
								size='small'
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField 
								label='Correo'
								size='small'
								fullWidth
							/>
						</Grid>
						<Grid container spacing={2} direction='column' item xs={12}>
							<Grid item>
								<TextField 
									label='Contraseña'
									size='small'
									fullWidth
								/>
							</Grid>
							<Grid item>
								<FormControlLabel
									control={<Switch color="primary" name="checkedA" />}
									label="Generar contraseña"
								/>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<FormControl fullWidth>
								<InputLabel id="createUser-curso">Curso</InputLabel>
								<Select
									labelId="createUser-curso"
									id="createUser-curso-select"
								>
									<MenuItem value=''><em>Ninguno</em></MenuItem>
									<MenuItem value='V-'>Estudiante</MenuItem>
									<MenuItem value='A-'>Administrador</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<FormControl fullWidth>
								<InputLabel id="createUser-seccion">Sección</InputLabel>
								<Select
									labelId="createUser-seccion"
									id="createUser-seccion-select"
								>
									<MenuItem value=''><em>Ninguno</em></MenuItem>
									<MenuItem value='V-'>Estudiante</MenuItem>
									<MenuItem value='A-'>Administrador</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button>
						Crear
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
}

export default StepType;