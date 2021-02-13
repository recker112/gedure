import React, { useEffect } from 'react';

import {
	Grid,
	DialogContentText,
} from '@material-ui/core';

import { useWatch } from "react-hook-form";

// Components
import { RenderSwitchFormHook } from '../../../components/RendersGlobals';

function UserPermissions(props) {
	const { control, disabled, setValue, defaultData=null } = props;
	const users_index = useWatch({
		control,
    name: 'permissions.users_index',
    defaultValue: defaultData?.users_index || false,
  });
	
	useEffect(() => {
		if (!users_index) {
			setValue('permissions.users_create', false);
			setValue('permissions.users_upload_matricula', false);
			setValue('permissions.users_edit', false);
			setValue('permissions.users_edit_admins', false);
			setValue('permissions.users_delete', false);
		}
		// eslint-disable-next-line
	},[users_index]);
	
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
					defaultValue={defaultData?.users_edit_admins || false}
					name='permissions.users_edit_admins'
					label='Editar administradores'
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

function PostPermissions(props) {
	const { control, disabled, setValue, defaultData=null } = props;
	const posts_index = useWatch({
		control,
    name: 'permissions.posts_index',
    defaultValue: defaultData?.posts_index || false
  });
	
	useEffect(() => {
		if (!posts_index) {
			setValue('permissions.posts_create', false);
			setValue('permissions.posts_edit', false);
			setValue('permissions.posts_destroy', false);
			setValue('permissions.posts_others', false);
		}
		// eslint-disable-next-line
	},[posts_index]);
	
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

function BoletaPermissions(props) {
	const { control, disabled, setValue, defaultData=null } = props;
	const boletas_index = useWatch({
		control,
    name: 'permissions.boletas_index',
    defaultValue: defaultData?.boletas_index || false
  });
	
	useEffect(() => {
		if (!boletas_index) {
			setValue('permissions.boletas_upload', false);
			setValue('permissions.boletas_edit', false);
			setValue('permissions.boletas_destroy', false);
		}
		// eslint-disable-next-line
	},[boletas_index]);
	
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

function CursoGedurePermissions(props) {
	const { control, disabled, setValue, defaultData=null } = props;
	const cursos_index = useWatch({
		control,
    name: 'permissions.cursos_index',
    defaultValue: defaultData?.cursos_index || false
  });
	
	useEffect(() => {
		if (!cursos_index) {
			setValue('permissions.cursos_create', false);
			setValue('permissions.cursos_destroy', false);
		}
		// eslint-disable-next-line
	},[cursos_index]);
	
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

function UsersDisabledGedurePermissions(props) {
	const { control, disabled, setValue, defaultData=null } = props;
	const users_disabled_index = useWatch({
		control,
    name: 'permissions.users_disabled_index',
    defaultValue: defaultData?.users_disabled_index || false
  });
	
	useEffect(() => {
		if (!users_disabled_index) {
			setValue('permissions.users_disabled_restore', false);
			setValue('permissions.users_disabled_destroy', false);
		}
		// eslint-disable-next-line
	},[users_disabled_index]);
	
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

function PermissionsNoSuper(props) {
	const { control, disabled, setValue, defaultData=null } = props;
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
					setValue={setValue}
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
					setValue={setValue}
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
					setValue={setValue}
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
					setValue={setValue}
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
					setValue={setValue}
				/>
			</React.Fragment>
		);
	}
	
	return null;
}

export default function PermissionsSection(props) {
	const { control, disabled, setValue, defaultData=null } = props;
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
						defaultValue={defaultData?.boleta_download || false}
						name='permissions.boleta_download'
						label='Descargar boletas'
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<RenderSwitchFormHook 
						control={control}
						defaultValue={defaultData?.change_avatar || false}
						name='permissions.change_avatar'
						label='Cambiar avatar'
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
						Al activar este permiso el usuario tendrรก poder absoluto del sistema, podrรก usar todo lo actual y lo futuro. Use esta opciรณn con cautela.
					</DialogContentText>
				</Grid>
				<PermissionsNoSuper 
					control={control} 
					disabled={disabled} 
					defaultData={defaultData} 
					setValue={setValue}
				/>
			</React.Fragment>
		);
	}
	
	return null;
}