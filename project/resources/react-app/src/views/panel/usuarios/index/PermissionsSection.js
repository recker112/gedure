import React from 'react';

import {
	Grid,
	DialogContentText,
	FormControlLabel,
	Switch,
} from '@material-ui/core';

import { useWatch } from "react-hook-form";

function UserPermissions({ control, register }) {
	const users_index = useWatch({
		control,
    name: 'users_index',
    defaultValue: false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='users_create' disabled={!users_index} inputRef={register} color="primary" />}
					label="Crear usuarios"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='users_create_massive' disabled={!users_index} inputRef={register} color="primary" />}
					label="Cargar estudiantes"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='users_edit' disabled={!users_index} inputRef={register} color="primary" />}
					label="Editar usuarios"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='users_delete' disabled={!users_index} inputRef={register} color="primary" />}
					label="Eliminar usuarios"
				/>
			</Grid>
		</React.Fragment>
	);
}

function PostPermissions({ control, register }) {
	const posts_index = useWatch({
		control,
    name: 'posts_index',
    defaultValue: false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='posts_create' disabled={!posts_index} inputRef={register} color="primary" />}
					label="Crear noticia"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='posts_edit' disabled={!posts_index} inputRef={register} color="primary" />}
					label="Editar noticia"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='posts_destroy' disabled={!posts_index} inputRef={register} color="primary" />}
					label="Eliminar noticia"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='posts_others' disabled={!posts_index} inputRef={register} color="primary" />}
					label="Poder editar las noticias de otros usuarios"
				/>
			</Grid>
		</React.Fragment>
	);
}

function BoletaPermissions({ control, register }) {
	const boletas_index = useWatch({
		control,
    name: 'boletas_index',
    defaultValue: false
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='boletas_upload' disabled={!boletas_index} inputRef={register} color="primary" />}
					label="Cargar boleta"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='boletas_edit' disabled={!boletas_index} inputRef={register} color="primary" />}
					label="Editar boleta"
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<FormControlLabel
					control={<Switch name='boletas_destroy' disabled={!boletas_index} inputRef={register} color="primary" />}
					label="Eliminar boleta"
				/>
			</Grid>
		</React.Fragment>
	);
}

function PermissionsNoSuper({ control, register }) {
	const super_admin = useWatch({
		control,
    name: 'super_admin',
    defaultValue: false
  });
	
	if (!super_admin) {
		return (
			<React.Fragment>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Switch name='registros_index' inputRef={register} color="primary" />}
						label="Ver registros del sistema"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={<Switch name='users_index' inputRef={register} color="primary" />}
						label="Ver lista de usuarios"
					/>
				</Grid>
				<UserPermissions control={control} register={register} />
				<Grid item xs={12}>
					<FormControlLabel
						control={<Switch name='posts_index' inputRef={register} color="primary" />}
						label="Ver noticias publicadas"
					/>
				</Grid>
				<PostPermissions control={control} register={register} />
				<Grid item xs={12}>
					<FormControlLabel
						control={<Switch name='boletas_index' inputRef={register} color="primary" />}
						label="Ver boletas cargadas"
					/>
				</Grid>
				<BoletaPermissions control={control} register={register} />
			</React.Fragment>
		);
	}
	
	return null;
}

export default function PermissionsSection({ register, errors, control }) {
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
					<FormControlLabel
						control={<Switch name='permissions.boletas' inputRef={register} color="primary" />}
						label="Boletas"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControlLabel
						control={<Switch name='permissions.horario' inputRef={register} color="primary" />}
						label="Horario"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControlLabel
						control={<Switch name='permissions.soporte' inputRef={register} color="primary" />}
						label="Soporte"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControlLabel
						control={<Switch name='permissions.account_exonerada' inputRef={register} color="primary" />}
						label="Cuenta exonerada"
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
					<FormControlLabel
						control={<Switch name='super_admin' inputRef={register} color="primary" />}
						label="Super admin"
					/>
				</Grid>
				<Grid item xs={12}>
					<DialogContentText>
						Al activar este permiso el usuario tendráก poder absoluto del sistema, podrá usar todo lo actual y lo futuro. Use esta opción con cautela.
					</DialogContentText>
				</Grid>
				<PermissionsNoSuper control={control} register={register} />
			</React.Fragment>
		);
	}
	
	return null;
}