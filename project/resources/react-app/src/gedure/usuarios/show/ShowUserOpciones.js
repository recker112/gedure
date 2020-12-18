import React from 'react';

import {
	Grid,
	Button,
	Box,
	Divider,
} from '@material-ui/core';

export default function ShowUserOpciones() {
	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>
						Opciones de la cuenta
					</Box>
					<Divider />
				</Grid>
				<Grid item xs={12} sm={8}>
					<Box fontSize='h5.fontSize' className='text__bold--semi'>
						Exportar datos del usuario
					</Box>
					<Box fontSize='body1.fontSize' color='text.secondary'>
						Descargar/Imprimir hoja con los datos del estudiante
					</Box>
				</Grid>
				<Grid container justify='flex-end' alignItems='center' item xs={12} sm={4}>
					<Button variant='contained' color='primary' disableElevation>
						Exportar datos
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}