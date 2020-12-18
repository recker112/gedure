import React from 'react';

import {
	Grid,
	DialogContentText,
} from '@material-ui/core';

import { useWatch } from "react-hook-form";

// Components
import { RenderSwitchFormHook } from '../../../components/RendersGlobals';

function UserPermissions({ control }) {
	const users_index = useWatch({
		control,
    name: 'users_index',
    defaultValue: false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='users_create'
					label='Crear usuarios'
					color='primary'
					disabled={!users_index}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='users_create_massive'
					label='Cargar estudiantes'
					color='primary'
					disabled={!users_index}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='users_edit'
					label='Editar usuarios'
					color='primary'
					disabled={!users_index}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='users_delete'
					label='Eliminar usuarios'
					color='primary'
					disabled={!users_index}
				/>
			</Grid>
		</React.Fragment>
	);
}

function PostPermissions({ control }) {
	const posts_index = useWatch({
		control,
    name: 'posts_index',
    defaultValue: false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='posts_create'
					label='Crear noticia'
					color='primary'
					disabled={!posts_index}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='posts_edit'
					label='Editar noticia'
					color='primary'
					disabled={!posts_index}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='posts_destroy'
					label='Eliminar noticia'
					color='primary'
					disabled={!posts_index}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='posts_others'
					label='Poder editar las noticias de otros usuarios'
					color='primary'
					disabled={!posts_index}
				/>
			</Grid>
		</React.Fragment>
	);
}

function BoletaPermissions({ control }) {
	const boletas_index = useWatch({
		control,
    name: 'boletas_index',
    defaultValue: false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='boletas_upload'
					label='Cargar boleta'
					color='primary'
					disabled={!boletas_index}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='boletas_edit'
					label='Editar boleta'
					color='primary'
					disabled={!boletas_index}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='boletas_destroy'
					label='Eliminar boleta'
					color='primary'
					disabled={!boletas_index}
				/>
			</Grid>
		</React.Fragment>
	);
}

function PermissionsNoSuper({ control }) {
	const super_admin = useWatch({
		control,
    name: 'permissions.super_admin',
    defaultValue: false
  });
	
	if (!super_admin) {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='registros_index'
						label='Ver registros del sistema'
						color='primary'
					/>
				</Grid>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='users_index'
						label='Ver lista de usuarios'
						color='primary'
					/>
				</Grid>
				<UserPermissions control={control} />
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='posts_index'
						label='Ver noticias publicadas'
						color='primary'
					/>
				</Grid>
				<PostPermissions control={control} />
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='boletas_index'
						label='Ver boletas cargadas'
						color='primary'
					/>
				</Grid>
				<BoletaPermissions control={control} />
			</React.Fragment>
		);
	}
	
	return null;
}

export default function PermissionsSection({ control }) {
  const privilegio = useWatch({
		control,
    name: 'privilegio',
    defaultValue: ''
  });
	
	if (privilegio === 'V-') {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<DialogContentText>Permisos</DialogContentText>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.boletas'
						label='Boletas'
						color='primary'
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.horario'
						label='Horario'
						color='primary'
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.soporte'
						label='Soporte'
						color='primary'
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.account_exonerada'
						label="Cuenta exonerada"
						color='primary'
					/>
				</Grid>
			</React.Fragment>
		);
	} else if (privilegio === 'A-') {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<DialogContentText>Permisos</DialogContentText>
				</Grid>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.super_admin'
						label="Super admin"
						color='primary'
					/>
				</Grid>
				<Grid item xs={12}>
					<DialogContentText>
						Al activar este permiso el usuario tendráก poder absoluto del sistema, podrá usar todo lo actual y lo futuro. Use esta opción con cautela.
					</DialogContentText>
				</Grid>
				<PermissionsNoSuper control={control} />
			</React.Fragment>
		);
	}
	
	return null;
}