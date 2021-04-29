import React, { useEffect } from 'react';

import {
	Grid,
	DialogContentText,
} from '@material-ui/core';

import { useWatch } from "react-hook-form";

// Components
import {
	SwitchHook,
} from '@form-inputs';

function RenderPermission(props) {
	const { name, label, defaultData, control, disabled, fullWidth } = props;
	
	return (
		<Grid item xs={12} sm={fullWidth ? 12 : 6}>
			<SwitchHook
				control={control}
				defaultValue={defaultData[name] || false}
				name={`permissions.${name}`}
				label={label}
				color='primary'
				disabled={disabled}
			/>
		</Grid>
	)
}

function RenderPermissionNested(props) {
	const { name, label, defaultData, control, disabled, need, setValue } = props;
	
	const need_permission = useWatch({
		control,
    name: `permissions.${need}`,
    defaultValue: defaultData[need] || false
  });
	
	useEffect(() => {
		if (!need_permission) {
			setValue(`permissions.${name}`, false);
		}
		// eslint-disable-next-line
	},[need_permission]);
	
	return (
		<Grid item xs={12} sm={6}>
			<SwitchHook
				control={control}
				defaultValue={defaultData[name] || false}
				name={`permissions.${name}`}
				label={label}
				color='primary'
				disabled={!need_permission || disabled}
			/>
		</Grid>
	)
}

function PermissionsNoSuper(props){
	const { control, disabled, setValue, defaultData } = props;
	const super_admin = useWatch({
		control,
    name: 'super_admin',
    defaultValue: defaultData.super_admin || false
  });
	
	const ListNoSuper = [
		{
			name: 'registros_index',
			label: 'Ver registros del sistema',
		},
		{
			name: 'users_index',
			label: 'Ver lista de usuarios',
			nested: [
				{
					name: 'users_create',
					label: 'Crear usuarios',
				},
				{
					name: 'users_upload_matricula',
					label: 'Cargar estudiantes',
				},
				{
					name: 'users_edit',
					label: 'Editar usuarios',
				},
				{
					name: 'users_edit_admins',
					label: 'Editar administradores',
				},
				{
					name: 'users_delete',
					label: 'Desactivar usuarios',
				},
			]
		},
		{
			name: 'posts_index',
			label: 'Ver noticias publicadas',
			nested: [
				{
					name: 'posts_create',
					label: 'Crear noticia',
				},
				{
					name: 'posts_edit',
					label: 'Editar noticia',
				},
				{
					name: 'posts_destroy',
					label: 'Eliminar noticia',
				},
				{
					name: 'posts_others',
					label: 'Poder editar las noticias de otros usuarios'
				}
			]
		},
		{
			name: 'boletas_index',
			label: 'Ver boletas cargadas',
			nested: [
				{
					name: 'boletas_upload',
					label: 'Cargar boleta',
				},
				{
					name: 'boletas_edit',
					label: 'Editar boleta',
				},
				{
					name: 'boletas_destroy',
					label: 'Eliminar boleta'
				}
			]
		},
		{
			name: 'contact_index',
			label: 'Ver solicitudes de contácto',
			nested: [
				{
					name: 'contact_destroy',
					label: 'Eliminar solicitudes de contácto',
				}
			]
		},
		{
			name: 'cursos_index',
			label: 'Ver cursos',
			nested: [
				{
					name: 'cursos_create',
					label: 'Crear curso',
				},
				{
					name: 'cursos_destroy',
					label: 'Eliminar curso',
				}
			]
		},
		{
			name: 'users_disabled_index',
			label: 'Ver usuarios desactivados',
			nested: [
				{
					name: 'users_disabled_restore',
					label: 'Restaurar usuario',
				},
				{
					name: 'users_disabled_destroy',
					label: 'Eliminar usuario',
				}
			]
		},
		{
			name: 'debt_lote_index',
			label: 'Ver lotes de deudas',
			nested: [
				{
					name: 'debt_lote_create',
					label: 'Crear lotes de deudas',
				},
				{
					name: 'debt_lote_edit',
					label: 'Editar lotes de deudas',
				},
				{
					name: 'debt_lote_delete',
					label: 'Eliminar lotes de deudas',
				},
				{
					name: 'debt_create',
					label: 'Asignar deuda individualmente',
				},
				{
					name: 'debt_delete',
					label: 'Eliminar deuda individualmente',
				},
				{
					name: 'debt_refund',
					label: 'Reembolsar deuda individualmente',
				}
			]
		},
		{
			name: 'bank_account_index',
			label: 'Ver cuentas bancarias',
			nested: [
				{
					name: 'bank_account_create',
					label: 'Crear cuenta bancaria'
				},
				{
					name: 'bank_account_edit',
					label: 'Editar cuenta bancaria'
				},
				{
					name: 'bank_account_destroy',
					label: 'Eliminar cuenta bancaria'
				},
			]
		},
	];
	
	if (!super_admin) {
		const RenderList = ListNoSuper.map((item, i) => (
			<React.Fragment>
				<RenderPermission
					key={i}
					control={control}
					disabled={disabled}
					defaultData={defaultData}
					fullWidth
					{...item}
				/>
				{(item.nested && item.nested.length > 0) && item.nested.map((itemNested, i) => (
					<RenderPermissionNested
						setValue={setValue}
						control={control}
						disabled={disabled}
						defaultData={defaultData}
						need={item.name}
						{...itemNested}
					/>
				))}
			</React.Fragment>
		))
		
		return RenderList;
	}
	
	return null;
}
	
export default function PermissionsSection(props) {
	const { control, disabled, setValue, defaultData = {} } = props;
  const privilegio = useWatch({
		control,
    name: 'privilegio',
    defaultValue: ''
  });
	
	const ListUserPermissions = [
		{
			name: 'boleta_download',
			label: 'Descargar boletas',
		},
		{
			name: 'change_avatar',
			label: 'Cambiar avatar',
		}
	];
	
	if (privilegio === 'V-') {
		const RenderPermissions = ListUserPermissions.map((item, i) => (
			<RenderPermission
				key={i}
				control={control}
				disabled={disabled}
				defaultData={defaultData}
				{...item}
			/>
		))
		return RenderPermissions;
	} else if (privilegio === 'A-') {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<SwitchHook
						control={control}
						defaultValue={defaultData.super_admin || false}
						name='super_admin'
						label="Super admin"
						color='primary'
						disabled={disabled}
					/>
				</Grid>
				<Grid item xs={12}>
					<DialogContentText>
						Al activar este permiso el usuario tendrá poder absoluto del sistema, podrá usar todo lo actual y lo futuro. Use esta opción con cautela.
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