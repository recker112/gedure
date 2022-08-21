import React, { useEffect } from 'react'

// MUI
import { DialogContentText, Grid, Typography } from '@mui/material';

// Components
import { SwitchHook } from '../../../../components/form/switch';

// Forms
import { useWatch } from 'react-hook-form';

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
			head: 'Registros',
			name: 'registros_index',
			label: 'Ver',
		},
		{
			head: 'Usuarios',
			name: 'users_index',
			label: 'Ver',
			nested: [
				{
					name: 'users_create',
					label: 'Crear',
				},
				{
					name: 'users_upload_matricula',
					label: 'Cargar estudiantes',
				},
				{
					name: 'users_edit',
					label: 'Editar',
				},
				{
					name: 'users_edit_admins',
					label: 'Editar administradores',
				},
				{
					name: 'users_delete',
					label: 'Desactivar',
				},
			]
		},
		{
			head: 'Usuarios desactivados',
			name: 'users_disabled_index',
			label: 'Ver',
			nested: [
				{
					name: 'users_disabled_restore',
					label: 'Restaurar',
				},
				{
					name: 'users_disabled_destroy',
					label: 'Eliminar',
				}
			]
		},
		{
			head: 'Noticias',
			name: 'posts_index',
			label: 'Ver',
			nested: [
				{
					name: 'posts_create',
					label: 'Crear',
				},
				{
					name: 'posts_edit',
					label: 'Editar',
				},
				{
					name: 'posts_destroy',
					label: 'Eliminar',
				},
				{
					name: 'posts_others',
					label: 'Editar noticias de otros usuarios'
				}
			]
		},
		{
			head: 'Boletas',
			name: 'boletas_index',
			label: 'Ver',
			nested: [
				{
					name: 'boletas_upload',
					label: 'Cargar',
				},
				{
					name: 'boletas_edit',
					label: 'Editar',
				},
				{
					name: 'boletas_destroy',
					label: 'Eliminar'
				}
			]
		},
		{
			head: 'Solicitudes de contacto',
			name: 'contact_index',
			label: 'Ver',
			nested: [
				{
					name: 'contact_destroy',
					label: 'Eliminar',
				}
			]
		},
		{
			head: 'Cursos',
			name: 'cursos_index',
			label: 'Ver',
			nested: [
				{
					name: 'cursos_create',
					label: 'Crear',
				},
				{
					name: 'cursos_destroy',
					label: 'Eliminar',
				}
			]
		},
		// {
		// 	head: 'Monederos',
		// 	name: 'wallet_index',
		// 	label: 'Ver',
		// 	nested: [
		// 		{
		// 			name: 'wallet_administration',
		// 			label: 'Administrar',
		// 		},
		// 	]
		// },
		{
			head: 'Cuentas bancaras',
			name: 'bank_account_index',
			label: 'Ver',
			nested: [
				{
					name: 'bank_account_create',
					label: 'Crear'
				},
				{
					name: 'bank_account_edit',
					label: 'Editar'
				},
				{
					name: 'bank_account_destroy',
					label: 'Eliminar'
				},
			]
		},
		{
			head: 'Transacciones bancarias',
			name: 'bank_transaction_index',
			label: 'Ver',
			nested: [
				{
					name: 'bank_transaction_upload',
					label: 'Cargar'
				},
				{
					name: 'bank_transaction_assign',
					label: 'Asignar'
				},
				{
					name: 'bank_transaction_delete',
					label: 'Eliminar'
				},
			]
		},
		{
			head: 'Lotes de deudas',
			name: 'debt_lote_index',
			label: 'Ver',
			nested: [
				{
					name: 'debt_lote_create',
					label: 'Crear',
				},
				{
					name: 'debt_lote_edit',
					label: 'Editar',
				},
				{
					name: 'debt_lote_delete',
					label: 'Eliminar',
				},
				{
					name: 'debt_create',
					label: 'Asignar deuda individualmente',
				},
				{
					name: 'debt_delete',
					label: 'Eliminar deuda individualmente',
				},
			]
		},
		{
			head: 'Transacciones',
			name: 'transaction_index',
			label: 'Ver',
		},
	];
	
	if (!super_admin) {
		const RenderList = ListNoSuper.map((item, i) => (
			<React.Fragment key={i}>
				<Grid sx={{mt: 4}} item xs={12}>
					<Typography color='text.secondary'>{item.head}</Typography>
				</Grid>
				<RenderPermission
					control={control}
					disabled={disabled}
					defaultData={defaultData}
					fullWidth
					{...item}
				/>
				{(item.nested && item.nested.length > 0) && item.nested.map((itemNested, i) => (
					<RenderPermissionNested
            key={i}
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

export default function Permisos({ control, disabled, setValue, defaultData = {} }) {
  let PermissionsUsers;

  const privilegio = useWatch({
		control,
    name: 'privilegio',
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
    PermissionsUsers = ListUserPermissions.map((item, i) => (
			<RenderPermission
				key={i}
				control={control}
				disabled={disabled}
				defaultData={defaultData}
				{...item}
			/>
		))
  }

  return (
    <>
      {privilegio === 'V-' && (PermissionsUsers)}
      {privilegio === 'A-' && (
        <>
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
        </>
      )}
    </>
  )
}