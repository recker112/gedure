import React from 'react';

import {
	Grid,
	DialogContentText,
} from '@material-ui/core';

import { useWatch } from "react-hook-form";

// Components
import { RenderSwitchFormHook } from '../../../components/RendersGlobals';

function UserPermissions({ control, disabled }) {
	const users_index = useWatch({
		control,
    name: 'permissions.users_index',
    defaultValue: false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissions.users_create'
					label='Crear usuarios'
					color='primary'
					disabled={!users_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissions.users_create_massive'
					label='Cargar estudiantes'
					color='primary'
					disabled={!users_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissions.users_edit'
					label='Editar usuarios'
					color='primary'
					disabled={!users_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissions.users_delete'
					label='Eliminar usuarios'
					color='primary'
					disabled={!users_index || disabled}
				/>
			</Grid>
		</React.Fragment>
	);
}

function PostPermissions({ control, disabled }) {
	const posts_index = useWatch({
		control,
    name: 'permissions.posts_index',
    defaultValue: false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissions.posts_create'
					label='Crear noticia'
					color='primary'
					disabled={!posts_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissions.posts_edit'
					label='Editar noticia'
					color='primary'
					disabled={!posts_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissionsposts_destroy'
					label='Eliminar noticia'
					color='primary'
					disabled={!posts_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissions.posts_others'
					label='Poder editar las noticias de otros usuarios'
					color='primary'
					disabled={!posts_index || disabled}
				/>
			</Grid>
		</React.Fragment>
	);
}

function BoletaPermissions({ control, disabled }) {
	const boletas_index = useWatch({
		control,
    name: 'permissions.boletas_index',
    defaultValue: false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissions.boletas_upload'
					label='Cargar boleta'
					color='primary'
					disabled={!boletas_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissions.boletas_edit'
					label='Editar boleta'
					color='primary'
					disabled={!boletas_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={false}
					name='permissions.boletas_destroy'
					label='Eliminar boleta'
					color='primary'
					disabled={!boletas_index || disabled}
				/>
			</Grid>
		</React.Fragment>
	);
}

function PermissionsNoSuper({ control, disabled }) {
	const super_admin = useWatch({
		control,
    name: 'super_admin',
    defaultValue: false
  });
	
	if (!super_admin) {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.registros_index'
						label='Ver registros del sistema'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.users_index'
						label='Ver lista de usuarios'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<UserPermissions control={control} disabled={disabled} />
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.posts_index'
						label='Ver noticias publicadas'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<PostPermissions control={control} disabled={disabled} />
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.boletas_index'
						label='Ver boletas cargadas'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<BoletaPermissions control={control} disabled={disabled} />
			</React.Fragment>
		);
	}
	
	return null;
}

export default function PermissionsSection({ control, disabled }) {
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
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.horarios'
						label='Horario'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.soporte'
						label='Soporte'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={false}
						name='permissions.account_exonerada'
						label="Cuenta exonerada"
						color='primary'
						disabled={disabled}
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
						name='super_admin'
						label="Super admin"
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12}>
					<DialogContentText>
						Al activar este permiso el usuario tendráก poder absoluto del sistema, podrá usar todo lo actual y lo futuro. Use esta opción con cautela.
					</DialogContentText>
				</Grid>
				<PermissionsNoSuper control={control} disabled={disabled} />
			</React.Fragment>
		);
	}
	
	return null;
}