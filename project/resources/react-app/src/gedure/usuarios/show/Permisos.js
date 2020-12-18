import React from 'react';

import {
	Grid,
	Button,
	Divider,
	Box,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

// Components
import { RenderSwitchFormHook } from '../../../components/RendersGlobals';

export default function Password() {
	const { control } = useForm();
	
	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box mb={1} fontSize='h6.fontSize' className='text__bold--semi'>Permisos de la cuenta</Box>
					<Divider />
				</Grid>
				<Grid item xs={6} md={4} >
					<RenderSwitchFormHook 
						control={control}
						defaultValue={true}
						name='boletas'
						label='Boletas'
						color='primary'
					/>
				</Grid>
				<Grid item xs={6} md={4}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={true}
						name='horario'
						label='Horario'
						color='primary'
					/>
				</Grid>
				<Grid item xs={6} md={4}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={true}
						name='soporte'
						label='Soporte'
						color='primary'
					/>
				</Grid>
				<Grid item xs={6} md={4}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={true}
						name='account_exonerada'
						label='Cuenta exonerada'
						color='primary'
					/>
				</Grid>
				<Grid container justify='flex-end' item xs={12}>
					<Button variant='contained' color='primary' disableElevation>Actualizar permisos</Button>
				</Grid>
			</Grid>
		</Box>
	);
}