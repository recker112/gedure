import React, { useCallback } from 'react';

import { 
	Grid,
	Typography,
	MenuItem,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Components
import { RenderSelectFormHook } from '../../../components/RendersGlobals';
import { CursosList } from '../../../components/funciones/CursosList';

// Redux
import { useSelector } from 'react-redux';

function CupoSolicitar() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { errors, control } = useFormContext();
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Cupo a solicitar
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={12} sm={6} md={4}>
					<RenderSelectFormHook
						id='cupo-solicitar'
						name='cupo_solicitar'
						nameLabel='Curso *'
						control={control}
						defaultValue={dataStorage.cupo_solicitar || ''}
						errors={errors?.cupo_solicitar}
						helperText='Seleccione un curso'
					>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						{CursosList.map(useCallback((data, i) => (
							<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
						),[]))}
					</RenderSelectFormHook>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default CupoSolicitar;