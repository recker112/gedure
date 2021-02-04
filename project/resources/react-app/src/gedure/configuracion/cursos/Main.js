import React from 'react';

import { 
	Grid,
	Typography,
	Paper,
	Box,
	Button,
	MenuItem
} from '@material-ui/core';

import { useForm } from "react-hook-form";

// Components
import { RenderSelectFormHook } from '../../../../components/RendersGlobals';
import { CursosList, SeccionList } from '../../../../components/funciones/CursosList';

export default function Main() {
	const { control, errors, handleSubmit } = useForm({
		mode: 'onTouched'
	});
	
	const MenuItemList = CursosList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	const MenuItemList2 = SeccionList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	return (
		<Grid container>
			<Grid item xs={12}>
				<Paper className='paper--padding'>
					<Typography variant='h6' className='text__bold--semi'>
						Añadir curso
					</Typography>
					<Grid container>
						<Grid item xs={12} sm={6} md={4}>
							<RenderSelectFormHook
								name='curso'
								nameLabel='Curso'
								control={control}
								defaultValue='' 
								errors={errors.curso}
								disabled={loading}
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								{MenuItemList}
							</RenderSelectFormHook>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<RenderSelectFormHook
								name='seccion'
								nameLabel='Sección'
								control={control}
								defaultValue='' 
								errors={errors.seccion}
								disabled={loading}
							>
								<MenuItem value=''>
									<em>Ninguno</em>
								</MenuItem>
								{MenuItemList2}
							</RenderSelectFormHook>
						</Grid>
					</Grid>
					<Typography className='text__opacity--semi'>
						Añada cursos al sistema para agrupar a sus estudiantes. Al borrar un curso las boletas también serán borradas.
					</Typography>
					<Box align='right'>
						<Button variant='contained' color='primary' disableElevation>
							Agregar
						</Button>
					</Box>
				</Paper>
			</Grid>
		</Grid>
	);
}