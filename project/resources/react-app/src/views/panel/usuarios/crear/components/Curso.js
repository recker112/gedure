import React, { useCallback } from 'react';

import {
	Typography,
	Grid,
	MenuItem,
	Paper,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import { RenderSelectFormHook } from '../../../../../components/RendersGlobals';
import { CursosList, SeccionList } from '../../../../../components/funciones/CursosList';

// Redux
import { useSelector } from 'react-redux';

function Curso() {
	const { errors, control } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Curso
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<RenderSelectFormHook
							id='register-curso'
							name='curso'
							nameLabel='Curso *'
							control={control}
							defaultValue=''
							errors={errors.curso}
							helperText='Seleccione un curso'
							disabled={loading}
							>
							{CursosList.map(useCallback((data, i) => (
								<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
							),[]))}
						</RenderSelectFormHook>
					</Grid>
					<Grid item xs={3}>
						<RenderSelectFormHook
							id='register-seccion'
							name='seccion'
							nameLabel='Sección *'
							control={control}
							defaultValue=''
							errors={errors.seccion}
							helperText='Seleccione una sección'
							disabled={loading}
							>
							{SeccionList.map(useCallback((data, i) => (
								<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
							),[]))}
						</RenderSelectFormHook>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

export default Curso;