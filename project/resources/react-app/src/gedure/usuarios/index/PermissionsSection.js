import React from 'react';

import {
	Grid,
	DialogContentText,
} from '@material-ui/core';

import { useWatch } from "react-hook-form";

// Components
import { RenderSwitchFormHook } from '../../../components/RendersGlobals';

function UserPermissions({ control, disabled, defaultData=null }) {
	const users_index = useWatch({
		control,
    name: 'permissions.users_index',
    defaultValue: defaultData?.users_index || false,
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.users_create || false}
					name='permissions.users_create'
					label='Crear usuarios'
					color='primary'
					disabled={!users_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.users_upload_matricula || false}
					name='permissions.users_upload_matricula'
					label='Cargar estudiantes'
					color='primary'
					disabled={!users_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.users_edit || false}
					name='permissions.users_edit'
					label='Editar usuarios'
					color='primary'
					disabled={!users_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.users_delete || false}
					name='permissions.users_delete'
					label='Desactivar usuarios'
					color='primary'
					disabled={!users_index || disabled}
				/>
			</Grid>
		</React.Fragment>
	);
}

function PostPermissions({ control, disabled, defaultData }) {
	const posts_index = useWatch({
		control,
    name: 'permissions.posts_index',
    defaultValue: defaultData?.posts_index || false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.posts_create || false}
					name='permissions.posts_create'
					label='Crear noticia'
					color='primary'
					disabled={!posts_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.posts_edit || false}
					name='permissions.posts_edit'
					label='Editar noticia'
					color='primary'
					disabled={!posts_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.posts_destroy || false}
					name='permissions.posts_destroy'
					label='Eliminar noticia'
					color='primary'
					disabled={!posts_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.posts_others || false}
					name='permissions.posts_others'
					label='Poder editar las noticias de otros usuarios'
					color='primary'
					disabled={!posts_index || disabled}
				/>
			</Grid>
		</React.Fragment>
	);
}

function BoletaPermissions({ control, disabled, defaultData=null }) {
	const boletas_index = useWatch({
		control,
    name: 'permissions.boletas_index',
    defaultValue: defaultData?.boletas_index || false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.boletas_upload || false}
					name='permissions.boletas_upload'
					label='Cargar boleta'
					color='primary'
					disabled={!boletas_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.boletas_edit || false}
					name='permissions.boletas_edit'
					label='Editar boleta'
					color='primary'
					disabled={!boletas_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.boletas_destroy || false}
					name='permissions.boletas_destroy'
					label='Eliminar boleta'
					color='primary'
					disabled={!boletas_index || disabled}
				/>
			</Grid>
		</React.Fragment>
	);
}

function CursoGedurePermissions({ control, disabled, defaultData=null }) {
	const cursos_index = useWatch({
		control,
    name: 'permissions.cursos_index',
    defaultValue: defaultData?.cursos_index || false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.cursos_create || false}
					name='permissions.cursos_create'
					label='Crear curso'
					color='primary'
					disabled={!cursos_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.cursos_destroy || false}
					name='permissions.cursos_destroy'
					label='Eliminar curso'
					color='primary'
					disabled={!cursos_index || disabled}
				/>
			</Grid>
		</React.Fragment>
	);
}

function UsersDisabledGedurePermissions({ control, disabled, defaultData=null }) {
	const users_disabled_index = useWatch({
		control,
    name: 'permissions.users_disabled_index',
    defaultValue: defaultData?.users_disabled_index || false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.users_disabled_restore || false}
					name='permissions.users_disabled_restore'
					label='Restaurar usuario'
					color='primary'
					disabled={!users_disabled_index || disabled}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<RenderSwitchFormHook 
					control={control}
					defaultValue={defaultData?.users_disabled_destroy || false}
					name='permissions.users_disabled_destroy'
					label='Eliminar usuario'
					color='primary'
					disabled={!users_disabled_index || disabled}
				/>
			</Grid>
		</React.Fragment>
	);
}

function PermissionsNoSuper({ control, disabled, defaultData=null }) {
	const super_admin = useWatch({
		control,
    name: 'super_admin',
    defaultValue: defaultData?.super_admin || false
  });
	
	if (!super_admin) {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.registros_index || false}
						name='permissions.registros_index'
						label='Ver registros del sistema'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.users_index || false}
						name='permissions.users_index'
						label='Ver lista de usuarios'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<UserPermissions 
					control={control} 
					disabled={disabled} 
					defaultData={defaultData}
				/>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.posts_index || false}
						name='permissions.posts_index'
						label='Ver noticias publicadas'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<PostPermissions 
					control={control} 
					disabled={disabled}
					defaultData={defaultData}
				/>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.boletas_index || false}
						name='permissions.boletas_index'
						label='Ver boletas cargadas'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<BoletaPermissions 
					control={control} 
					disabled={disabled}
					defaultData={defaultData}
				/>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.cursos_index || false}
						name='permissions.cursos_index'
						label='Ver cursos'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<CursoGedurePermissions 
					control={control} 
					disabled={disabled}
					defaultData={defaultData}
				/>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.users_disabled_index || false}
						name='permissions.users_disabled_index'
						label='Ver usuarios desactivados'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<UsersDisabledGedurePermissions 
					control={control} 
					disabled={disabled}
					defaultData={defaultData}
				/>
			</React.Fragment>
		);
	}
	
	return null;
}

export default function PermissionsSection({ control, disabled, defaultData=null }) {
  const privilegio = useWatch({
		control,
    name: 'privilegio',
    defaultValue: ''
  });
	
	if (privilegio === 'V-') {
		return (
			<React.Fragment>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.boletas || false}
						name='permissions.boletas'
						label='Boletas'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				{/*<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.horarios || false}
						name='permissions.horarios'
						label='Horario'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.soporte || false}
						name='permissions.soporte'
						label='Soporte'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.account_exonerada || false}
						name='permissions.account_exonerada'
						label="Cuenta exonerada"
						color='primary'
						disabled={disabled}
					/>
				</Grid>*/}
			</React.Fragment>
		);
	} else if (privilegio === 'A-') {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.super_admin || false}
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
				<PermissionsNoSuper 
					control={control} 
					disabled={disabled} 
					defaultData={defaultData} 
				/>
			</React.Fragment>
		);
	}
	
	return null;
}