import React from 'react';

import {
	Typography,
	Grid,
	Paper,
	FormControlLabel,
	Switch,
} from '@material-ui/core';

import { useFormContext } from "react-hook-form";

// Redux
import { useSelector } from 'react-redux';

function SwitchsUsuario() {
	const { register } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={3}>
				<FormControlLabel control={
						<Switch
							name="users_show"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Ver usuario" 
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<FormControlLabel control={
						<Switch
							name="users_create"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Crear usuario" 
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<FormControlLabel control={
						<Switch
							name="users_edit"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Editar usuario" 
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<FormControlLabel control={
						<Switch
							name="users_delete"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Eliminar usuario" 
				/>
			</Grid>
		</React.Fragment>
	);
}

function SwitchsPosts() {
	const { register } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={3}>
				<FormControlLabel control={
						<Switch
							name="posts_create"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Crear noticia" 
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<FormControlLabel control={
						<Switch
							name="posts_edit"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Editar noticia" 
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<FormControlLabel control={
						<Switch
							name="posts_destroy"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Eliminar noticia" 
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<FormControlLabel control={
						<Switch
							name="posts_others"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Poder editar las noticias de otros usuarios" 
				/>
			</Grid>
		</React.Fragment>
	);
}

function NoSuperUser() {
	const { register, watch } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--semi'>
					Registros
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<FormControlLabel control={
						<Switch
							name="registros_index"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Ver registros del sistema" 
				/>
			</Grid>
			<Grid item xs={12}>
				<Typography className='text__bold--semi'>
					Usuarios
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<FormControlLabel control={
						<Switch
							name="users_index"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Ver tabla de usuarios" 
				/>
			</Grid>
			{watch('users_index', false) && (
				<SwitchsUsuario />
			)}
			<Grid item xs={12}>
				<Typography className='text__bold--semi'>
					Noticias
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={3}>
				<FormControlLabel control={
						<Switch
							name="posts_index"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Ver noticias publicadas" 
				/>
			</Grid>
			{watch('posts_index', false) && (
				<SwitchsPosts />
			)}
			<Grid item xs={12}>
				<Typography className='text__bold--semi'>
					Solicitudes de contacto
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<FormControlLabel control={
						<Switch
							name="soliContact_index"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Ver solicitudes de contacto" 
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={5}>
				<FormControlLabel control={
						<Switch
							name="soliContact_destroy"
							inputRef={register}
							disabled={loading}
						/>
					} 
					label="Eliminar solicitudes de contacto" 
				/>
			</Grid>
		</React.Fragment>
	)
}

function PermissionsAccountAdmin() {
	const { register, watch } = useFormContext();
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.registerUser.loading,
	}));
	
	return (
		<Grid item xs={12}>
			<Paper className='paper--padding' elevation={0}>
				<Grid container alignItems='center' spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' className='text__bold--big'>
							Permisos
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography className='text__bold--semi'>
							Super usuario
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel control={
								<Switch
									name="super_admin"
									inputRef={register}
									disabled={loading}
								/>
							} 
							label="Super usuario" 
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography>
							Al activar este permiso el usuario tendráก poder absoluto del sistema, podrá usar todo lo actual y lo futuro. Use esta opción con cautela.
						</Typography>
					</Grid>
					{!watch('super_admin', false) && (
						<NoSuperUser />
					)}
				</Grid>
			</Paper>
		</Grid>
	);
}

export default PermissionsAccountAdmin;