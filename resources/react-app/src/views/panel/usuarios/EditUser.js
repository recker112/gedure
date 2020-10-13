import React, { useState } from 'react';

import { Dialog, DialogContent, Button, AppBar, Toolbar, Container, Divider, Grid, Avatar, Typography, DialogContentText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { useForm } from 'react-hook-form';

import DateFnsUtils from '@date-io/date-fns';


import AnimationDialog from './../../../components/AnimationDialog';
import LoadingComponent from './../../../components/LoadingComponent';
import { RenderInput } from './../../../components/RendersGlobals';
import { SectionMom, SectionDad, SectionRepresentante, SectionUbicacionRepre } from './SectionPersonal';

import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from './../../../actions/updateDialogs';

const useStyles = makeStyles((theme) => ({
	appBar: {
		alignItems: 'flex-end',
		position: 'relative'
	},
	avatarLarge: {
		width: theme.spacing(16),
		height: theme.spacing(16),
  },
	paddingTopDialog: {
		paddingTop: theme.spacing(3)
	}
}));

function EditUser({ action, callback }){
	const { open, loading, data } = useSelector(state => ({
		open: state.dialogs.editUser.open,
		loading: state.dialogs.editUser.loading,
		data: state.dialogs.editUser.data,
	}));
	const dispatch = useDispatch();
	
	const handleClose = () => {
		dispatch(updateDialogs('editUser', false, false, 'clear'));
	}
	
	const classes = useStyles();
	
	const { register, handleSubmit, errors, control, watch, setValue } = useForm();
	
	const onSubmit = (data)=>{
		dispatch(updateDialogs('editUser', true, true, data));
		callback();
	}
	
	return (
		<Dialog
			open={open}
			TransitionComponent={AnimationDialog}
			fullScreen
			onClose={handleClose}
			aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
		>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Button disabled={loading} onClick={handleClose}>Cancelar</Button>
					<LoadingComponent loading={loading} color='inherit'>
						<label htmlFor='id-submit-editUser'>
							<Button 
								variant='contained' 
								component="span"
								endIcon={<SaveIcon />}
							>Guardar</Button>
						</label>
					</LoadingComponent>
				</Toolbar>
			</AppBar>
			<DialogContent className={classes.paddingTopDialog}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={5}>
						<Grid container item xs={12}>
							<Grid item xs={12}>
								<Typography className='box__title box__title--opacity box__title--marginBottom'>
									Datos de usuario
								</Typography>
							</Grid>
							<Grid item xs>
								<Container maxWidth='md'>
									<SectionUser 
										form={{register, errors}}
										classes={classes}
										data={data} 
										loading={loading}
									/>
								</Container>
							</Grid>
						</Grid>

						<Grid item xs={12}>
							<Divider />
						</Grid>

						{data.privilegio === 'V-' && <React.Fragment>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid container item xs={12}>
									<Grid item xs={12}>
										<Typography className='box__title box__title--opacity box__title--marginBottom'>
											Datos personales
										</Typography>
									</Grid>
									<Grid item xs>
										<Container maxWidth='md'>
											<SectionPersonalEstudiante
												form={{register, errors, control, watch, setValue}}
												classes={classes} 
												data={data} 
												loading={loading}
											/>
										</Container>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Divider />
								</Grid>
							</MuiPickersUtilsProvider>
						</React.Fragment>}
						
						<Grid container item xs={12}>
							<Grid item xs={12}>
								<Typography className='box__title box__title--opacity box__title--marginBottom'>
									Correo
								</Typography>
							</Grid>
							<Grid item xs>
								<Container maxWidth='md'>
									<SectionCorreo 
										form={{register, errors}}
										classes={classes}
										data={data} 
										loading={loading}
									/>
								</Container>
							</Grid>
						</Grid>
						
						<Grid item xs={12}>
							<Divider />
						</Grid>
						
						<Grid container item xs={12}>
							<Grid item xs={12}>
								<Typography className='box__title box__title--opacity box__title--marginBottom'>
									Contraseña
								</Typography>
							</Grid>
							<Grid item xs>
								<Container maxWidth='md'>
									<SectionPassword 
										form={{register, errors, watch}}
										classes={classes} 
										data={data} 
										loading={loading}
									/>
								</Container>
							</Grid>
						</Grid>
						
						<Grid item xs={12}>
							<Divider />
						</Grid>
					</Grid>
					<input type="submit" style={{display: 'none'}} id="id-submit-editUser" />
				</form>
			</DialogContent>
		</Dialog>
	);
}

function SectionUser({ form, classes, data, loading }) {
	const { register, errors } = form;
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={2}>
				<Avatar className={classes.avatarLarge} src={data.avatar}>
					{data?.name && data.name.substring(0, 1).toUpperCase()}
				</Avatar>
			</Grid>
			<Grid container alignItems='center' item xs>
				<Grid item xs={12}>
					<RenderInput
						name="name"
						label="Usuario"
						defaultValue={data.name}
						errors={errors.name}
						registerInput={register({
							required: { value: true, message: 'Campo requerido.' },
							minLength: { value: 3, message: 'Campo no válido.' },
						})}
						disabledOnLoading={loading}
						focus
						size='small'
						maxWidth='300px'
					/>
				</Grid>
				<Grid item xs>
					<Button disabled={loading}>Cambiar Avatar</Button>
					<Button disabled={loading}>Quitar Avatar</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

function SectionPersonalEstudiante(props) {
	return (
		<Grid container alignItems='center' spacing={2}>
			<Grid item xs={12}>
				<Typography className='box__subtitle box__title--opacity box_title--margin'>
					Información de la madre
				</Typography>
			</Grid>
			
			<SectionMom {...props} />
			
			<Grid item xs={12}>
				<Typography className='box__subtitle box__title--opacity box_title--margin'>
					Información del padre
				</Typography>
			</Grid>
			
			<SectionDad {...props} />
			
			<Grid item xs={12}>
				<Typography className='box__subtitle box__title--opacity box_title--margin'>
					Información del representante legal
				</Typography>
			</Grid>
			
			<SectionRepresentante {...props} />
			
			<Grid item xs={12}>
				<Typography className='box__subtitle box__title--opacity box_title--margin'>
					Datos de ubicación del representante
				</Typography>
			</Grid>
			
			<SectionUbicacionRepre {...props} />
		</Grid>
	);
}

function SectionCorreo({ form, classes, data, loading }) {
	const { register, errors } = form;
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<RenderInput
					name="correo"
					label="Correo electrónico"
					defaultValue={data.correo}
					errors={errors.correo}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 5, message: 'Campo no válido.' },
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Correo no válido"
						}
					})}
					disabledOnLoading={loading}
					size='small'
					maxWidth='300px'
				/>
			</Grid>
			<Grid item xs={12}>
				<DialogContentText>
					Tenga en cuenta que al cambiar el correo del usuario puede que ya no pueda realizar algunas acciones correctamente, antes de cambiarlo verifique bien el correo.
				</DialogContentText>
			</Grid>
		</Grid>
	);
}

function SectionPassword({ form, classes, data, loading }) {
	const { register, errors, watch } = form;
	
	const [changePass, setChangePass] = useState(false);
	
	const handleClick = ()=>{
		setChangePass(true);
	}
	
	if (changePass) {
		return (
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<RenderInput
						name="newPass"
						label="Nueva contraseña"
						defaultValue={data.newPass}
						errors={errors.newPass}
						registerInput={register({
							required: { value: true, message: 'Campo requerido.' },
							minLength: { value: 5, message: 'Campo no válido.' }
						})}
						disabledOnLoading={loading}
						focus
						size='small'
						maxWidth='300px'
						passwordMode
					/>
				</Grid>
				
				<Grid item xs={12} sm={6}>
					<RenderInput
						name="confirmPass"
						label="Confirmar contraseña"
						defaultValue={data.confirmPass}
						errors={errors.confirmPass}
						registerInput={register({
							required: { value: true, message: 'Campo requerido.' },
							minLength: { value: 5, message: 'Campo no válido.' },
							validate: { 
								verifyPass: value => value === watch('newPass'),
							}
						})}
						disabledOnLoading={loading}
						size='small'
						maxWidth='300px'
						passwordMode
					/>
				</Grid>
			</Grid>
		)
	}
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<DialogContentText>
					Una vez cambiada la contraseña la antigua será reemplazada, ¿está seguro de realizar esta acción?
				</DialogContentText>
			</Grid>
			
			<Grid container justify="center" item xs={12}>
				<Button onClick={handleClick}>Deseo cambiar la contraseña</Button>
			</Grid>
		</Grid>
	);
}

export default EditUser;