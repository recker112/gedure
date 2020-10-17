import React, { useState, useEffect } from 'react';

import {
	Dialog,
	DialogContent,
	Button,
	AppBar,
	Toolbar,
	Container,
	Grid,
	Avatar,
	Typography,
	FormControlLabel,
	Switch,
	Step,
	StepLabel,
	Stepper,
	MenuItem,
	DialogContentText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useForm, FormProvider, useFormContext } from 'react-hook-form';

import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import AnimationDialog from './../../../components/AnimationDialog';
import LoadingComponent from './../../../components/LoadingComponent';
import { RenderInput, RenderSelectFormHook } from './../../../components/RendersGlobals';
import { generatePassword } from './../../../components/GlobalGenerate';
import { SectionPersonalEstudiante, SectionPersonalDocente } from './EditUser'

import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from './../../../actions/updateDialogs';

const useStyles = makeStyles((theme) => ({
	appBar: {
		alignItems: 'flex-end',
		position: 'relative',
	},
	avatarLarge: {
		width: theme.spacing(16),
		height: theme.spacing(16),
	},
	paddingTopDialog: {
		paddingTop: theme.spacing(3),
	},
	marginAbajo: {
		marginBottom: theme.spacing(2),
	},
	dataUserSection: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
		},
	},
	button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Crear usuario', 'Añadir datos personales'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <StepCreateUser />;
    case 1:
      return <StepCreateDataPersonal />;
    default:
      return 'Error';
  }
}

function CreateUser() {
	const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
	
	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.createUser.open,
		loading: state.dialogs.createUser.loading,
		data: state.dialogs.createUser.data,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const methods = useForm();
	
	const handleClose = () => {
		dispatch(updateDialogs('createUser', false, false, 'clear'));
		setActiveStep(0);
	};
	
	const isStepOptional = (step) => {
		return step === 1;
  };
	
	const isStepSkipped = (step) => {
		return skipped.has(step);
  };
	
	const handleNext = (submitData) => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}
		
		if (activeStep === 1) {
			submitData.dataPersonal = { ...data.dataPersonal, ...submitData.dataPersonal }
			submitData.user = { ...data.user, ...submitData.user }
		}else {
			submitData.user = { ...data.user, ...submitData.user }
		}
		
		dispatch(updateDialogs('createUser', true, true, submitData));
		setSkipped(newSkipped);
	};
	
	const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
	
	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			throw new Error("No puedes omitir este paso porque no es omitible.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};
	
	const handleReset = () => {
		dispatch(updateDialogs('createUser', true, false, 'clear'));
		setActiveStep(0);
  };
	
	useEffect(()=>{
		const consult = async () => {
			await new Promise(resolve => {
				setTimeout(() => {
					resolve('resolved');
				}, 2000);
			});
			
			// AJAX CONSULT
			console.log(data);
			
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
			dispatch(updateDialogs('createUser', true, false));
		}
		
		if (loading) {
			consult();
		}
		
		// eslint-disable-next-line
	}, [loading])
	
	return (
		<Dialog
			open={open}
			TransitionComponent={AnimationDialog}
			fullScreen
		>
			<AppBar className={classes.appBar}>
				<Toolbar>
					{activeStep === steps.length ? (
						<React.Fragment>
							<Button onClick={handleClose} className={classes.button}>
								Cerrar
							</Button>
							<Button 
								variant="contained" 
								onClick={handleReset} 
								className={classes.button}
							>
								Crear otro
							</Button>
						</React.Fragment>
					)
					:
					(
						<React.Fragment>
							{activeStep === 0 && (
								<Button 
									disabled={loading} 
									onClick={handleClose}
									className={classes.button}
								>
									Cancelar
								</Button>
							)}
							
							{false && (<Button 
								disabled={activeStep === 0 || loading} 
								onClick={handleBack} 
								className={classes.button}
							>
								Atras
							</Button>)
							//NOTA (RECKER): Boton "Back" desactivado
							/* Esta opcion está desactivada ya que una vez creado el usuario no se pueden deshacer los cambios, pero si se cambia la manera de envio de datos podría reactivarse, por ese motivo se deja el botón aquí. :u */
							}
							
							{isStepOptional(activeStep) && (
								<Button
									variant="contained"
									color="secondary"
									onClick={handleSkip}
									disabled={loading}
									className={classes.button}
								>
									Omitir
								</Button>
							)}
							
							<LoadingComponent loading={loading} color="inherit">
								<label htmlFor="id-submit-createUser">
									<Button 
										variant="contained"
										component="span"
										className={classes.button}
									>
										{activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
									</Button>
								</label>
							</LoadingComponent>
						</React.Fragment>
					)}
				</Toolbar>
			</AppBar>
			<DialogContent className={classes.paddingTopDialog}>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						if (isStepOptional(index)) {
							labelProps.optional = <Typography variant="caption">Opcional</Typography>;
						}
						if (isStepSkipped(index)) {
							stepProps.completed = false;
						}
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<div>
					{activeStep === steps.length ? (
						<div>
							<Typography>
								Usuario creado correctamente, puede buscar al usuario y editarlo si se equivocó en algún dato.
							</Typography>
						</div>
					) : (
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit(handleNext)}>
								{getStepContent(activeStep)}

								<input 
									type="submit" 
									style={{ display: 'none' }} 
									id="id-submit-createUser"
								/>
							</form>
						</FormProvider>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

function StepCreateUser() {
	const { register, errors, control, watch, setValue } = useFormContext();
	const { loading, data } = useSelector((state) => ({
		loading: state.dialogs.createUser.loading,
		data: state.dialogs.createUser.data,
	}));
	
	const classes = useStyles();
	
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography className="box__title box__title--opacity box__title--marginBottom">
					Datos básicos del usuario
				</Typography>
			</Grid>
			
			<Grid container item xs={12}>
				<Container maxWidth='md'>
					<SectionUser
						form={{ register, errors, setValue, watch, control }}
						classes={classes}
						data={data}
						loading={loading}
					/>
				</Container>
			</Grid>
		</Grid>
	);
}

function StepCreateDataPersonal() {
	const { register, errors, control, watch, setValue } = useFormContext();
	const { loading, data } = useSelector((state) => ({
		loading: state.dialogs.createUser.loading,
		data: state.dialogs.createUser.data,
	}));
	
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography className="box__title box__title--opacity box__title--marginBottom">
					Datos personales del usuario
				</Typography>
				
				<Container maxWidth="md">
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DialogContentText>
							Al omitir estos datos el usuario deberá llenarlos.
						</DialogContentText>

						{data.user.privilegio === 'V-' ? (
							<SectionPersonalEstudiante 
								form={{ register, errors, control, watch, setValue }} 
								data={data} 
								loading={loading} 
							/>
						)
						:
						(
							<SectionPersonalDocente 
								form={{ register, errors, control, watch, setValue }} 
								data={data} 
								loading={loading} 
							/>
						)}
					</MuiPickersUtilsProvider>
				</Container>
			</Grid>
		</Grid>
	);
}

function SectionUser({ form, classes, data, loading }) {
	const [generatePass, setGeneratePass] = useState(false);
	const { register, errors, setValue, control, watch } = form;
	
	const handleGenerate = () => {
		setGeneratePass(!generatePass);
	}
	
	useEffect(()=>{
		if (generatePass) {
			const simplePW = generatePassword(5);
			setValue('user.newPass', simplePW, {shouldDirty: true});
			setValue('user.confirmPass', simplePW, {shouldDirty: true});
		}else {
			setValue('user.newPass', '');
			setValue('user.confirmPass', '');
		}
	}, [generatePass, setValue])

	return (
		<Grid container spacing={2} className={classes.marginAbajo}>
			<Grid container justify="center" item xs={12} sm={3}>
				<Avatar className={classes.avatarLarge} src={data.user?.avatar}>
					{data.user?.name && data.user.name.substring(0, 1).toUpperCase()}
				</Avatar>
			</Grid>
			<Grid
				container
				alignItems="center"
				justify="flex-start"
				spacing={2}
				item
				xs={12}
				sm={9}
			>
				<Grid container className={classes.dataUserSection} item xs={12}>
					<RenderInput
						name="user.name"
						label="Usuario"
						defaultValue={data.user?.name}
						errors={errors.user?.name}
						registerInput={register({
							required: { value: true, message: 'Campo requerido.' },
							minLength: { value: 3, message: 'Campo no válido.' },
						})}
						disabledOnLoading={loading}
						focus
						size="small"
						maxWidth="300px"
					/>
				</Grid>
				
				<Grid container className={classes.dataUserSection} item xs={12}>
					<RenderInput
						name="user.cedula"
						label="Cédula"
						defaultValue={data.user?.cedula}
						errors={errors.user?.cedula}
						registerInput={register({
							required: { value: true, message: 'Campo requerido.' },
							minLength: { value: 3, message: 'Campo no válido.' },
						})}
						disabledOnLoading={loading}
						size="small"
						maxWidth="300px"
					/>
				</Grid>
				
				<Grid container className={classes.dataUserSection} item xs>
					<Button disabled={loading}>Agregar avatar</Button>
				</Grid>
			</Grid>
			
			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="tipoUsuario-createUser"
					name="user.tipo"
					nameLabel="Tipo de cuenta"
					defaultValue={data.user?.tipo || ''}
					control={control}
					errors={errors.user?.tipo}
					disabled={loading}
				>
					<MenuItem value="V-">Estudiante</MenuItem>
					<MenuItem value="P-">Docente</MenuItem>
					<MenuItem value="A-">Administrador</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					type='email'
					name="user.correo"
					label="Correo (Opcional)"
					defaultValue={data.user?.correo}
					errors={errors.user?.correo}
					registerInput={register}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="user.newPass"
					label="Nueva contraseña"
					defaultValue={data.user?.newPass}
					errors={errors.user?.newPass}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 5, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
					passwordMode
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="user.confirmPass"
					label="Confirmar contraseña"
					defaultValue={data.user?.confirmPass}
					errors={errors.user?.confirmPass}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 5, message: 'Campo no válido.' },
						validate: {
							verifyPass: (value) => value === watch('user.newPass'),
						},
					})}
					disabledOnLoading={loading}
					size="small"
					passwordMode
				/>
			</Grid>
			
			<Grid container justify='center' item xs={12}>
				<FormControlLabel
					control={
						<Switch
							checked={generatePass}
							onChange={handleGenerate}
							name="generatePass"
							color="secondary"
						/>
					}
					label="Generar contraseña simple"
				/>
			</Grid>
			
			{watch('user.tipo') === "A-" && (
				<React.Fragment>
					<Grid item xs={12}>
						<Typography className="box__subtitle box__title--opacity box_title--margin">
							Permisos de administrador
						</Typography>
					</Grid>
					
					<Grid item xs={12} sm={6} md={3}>
						<FormControlLabel
							control={
								<Switch
									name='user.adminPermissions.registros_ver'
									inputRef={register}
									color="secondary"
								/>
							}
							label="Ver registros"
						/>
					</Grid>
					
					<Grid item xs={12} sm={6} md={3}>
						<FormControlLabel
							control={
								<Switch
									name='user.adminPermissions.user_ver'
									inputRef={register}
									color="secondary"
								/>
							}
							label="Ver usuarios"
						/>
					</Grid>
					
					<Grid item xs={12} sm={6} md={3}>
						<FormControlLabel
							control={
								<Switch
									name='user.adminPermissions.user_modify'
									inputRef={register}
									color="secondary"
								/>
							}
							label="Modificar usuarios"
						/>
					</Grid>
				</React.Fragment>
			)}
		</Grid>
	);
}

export default CreateUser;