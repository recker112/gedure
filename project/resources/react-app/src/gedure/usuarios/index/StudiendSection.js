import React, { useCallback } from 'react';

import {
	Grid,
	MenuItem,
} from '@material-ui/core';

import { useWatch } from "react-hook-form";

// Components
import { RenderSelectFormHook } from '../../../components/RendersGlobals';
import { CursosList, SeccionList } from '../../../components/funciones/CursosList';

export default function StudiendSection({ register, errors, control }) {
  const privilegio = useWatch({
		control,
    name: 'privilegio',
    defaultValue: ''
  });
	
	const MenuItemList = CursosList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	const MenuItemList2 = SeccionList.map(useCallback((data, i) => (
		<MenuItem key={i} value={data.value}>{data.name}</MenuItem>
	),[]));
	
	if (privilegio === 'V-') {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={6}>
					<RenderSelectFormHook
						id='user-curso'
						name='curso'
						nameLabel='Curso'
						control={control}
						defaultValue=''
						errors={errors?.curso}
						helperText='* Campo requerido'
					>
						<MenuItem value=''><em>Ninguno</em></MenuItem>
						{MenuItemList}
					</RenderSelectFormHook>
				</Grid>
				<Grid item xs={12}  sm={6}>
					<RenderSelectFormHook
						id='user-curso'
						name='seccion'
						nameLabel='Secciรณn'
						control={control}
						defaultValue=''
						errors={errors?.seccion}
						helperText='* Campo requerido'
					>
						<MenuItem value=''><em>Ninguno</em></MenuItem>
						{MenuItemList2}
					</RenderSelectFormHook>
				</Grid>
			</React.Fragment>
		);
	}
	
	return null;
}