import React from 'react';

import {
	Grid,
	Button,
	TextField,
	Divider,
	Box,
	Typography,
} from '@material-ui/core';

export default function PersonalEstudiante() {
	return (
		<React.Fragment>
			<Box mb={4}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h6' component='span' className='text__bold--semi'>
							Datos del estudiante
						</Typography>
						<Box mt={1}>
							<Divider />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<TextField label='Usuario' variant='outlined' helperText='El usuario identificará a esta cuenta dentro del sistema' size='small' fullWidth />
					</Grid>
				</Grid>
			</Box>
			<Box mb={4}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h6' component='span' className='text__bold--semi'>
							Datos del hogar
						</Typography>
						<Box mt={1}>
							<Divider />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<TextField label='Usuario' variant='outlined' helperText='El usuario identificará a esta cuenta dentro del sistema' size='small' fullWidth />
					</Grid>
				</Grid>
			</Box>
			<Box>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h6' component='span' className='text__bold--semi'>
							Otros datos del estudiante
						</Typography>
						<Box mt={1}>
							<Divider />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<TextField label='Usuario' variant='outlined' helperText='El usuario identificará a esta cuenta dentro del sistema' size='small' fullWidth />
					</Grid>
					
					<Grid container justify='flex-end' item xs={12}>
						<Button variant='contained' color='primary' disableElevation>Guardar</Button>
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	);
}