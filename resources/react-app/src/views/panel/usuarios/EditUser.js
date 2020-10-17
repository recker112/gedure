import React, { useState, useEffect } from 'react';

import {
	Dialog,
	DialogContent,
	Button,
	AppBar,
	Toolbar,
	Container,
	Divider,
	Grid,
	Avatar,
	Typography,
	DialogContentText,
	Tabs,
	Tab,
	Box,
	FormControlLabel,
	Switch,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { useForm } from 'react-hook-form';

import DateFnsUtils from '@date-io/date-fns';

import AnimationDialog from './../../../components/AnimationDialog';
import LoadingComponent from './../../../components/LoadingComponent';
import { RenderInput } from './../../../components/RendersGlobals';
import {
	SectionMom,
	SectionDad,
	SectionRepresentante,
	SectionUbicacionRepre,
	SectionEstudiante,
	SectionUbiEstudiante,
	SectionOtrosEstudiante,
	SectionDocente,
} from './SectionPersonal';
import { generatePassword } from './../../../components/GlobalGenerate';

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
	paddingTabs: {
		padding: `${theme.spacing(3)}px 0px`,
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

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	const classes = useStyles();

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`editMenu-tabpanel-${index}`}
			aria-labelledby={`editMenu-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box className={classes.paddingTabs}>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `editMenu-tab-${index}`,
		'aria-controls': `editMenu-tabpanel-${index}`,
	};
}

function EditUser() {
	const [tabsEdit, setTabsEdit] = useState(0);

	const { open, loading, data } = useSelector((state) => ({
		open: state.dialogs.editUser.open,
		loading: state.dialogs.editUser.loading,
		data: state.dialogs.editUser.data,
	}));
	const dispatch = useDispatch();

	const classes = useStyles();

	const { register, handleSubmit, errors, control, watch, setValue } = useForm();

	const handleClose = () => {
		dispatch(updateDialogs('editUser', false, false, 'clear'));
	};

	const handleChangeTab = (event, tab) => {
		setTabsEdit(tab);
	};

	const onSubmit = (submitData) => {
		//NOTE (RECKER): Añadir variables existentes en el store.
		if (tabsEdit === 1) {
			submitData.dataPersonal = { ...data.dataPersonal, ...submitData.dataPersonal }
			submitData.user = { ...data.user, ...submitData.user }
		}else {
			submitData.user = { ...data.user, ...submitData.user }
		}
		
		dispatch(updateDialogs('editUser', true, true, submitData));
	};
	
	useEffect(()=> {
		const consult = async () => {
			setTimeout(()=>{dispatch(updateDialogs('editUser', true, false,));}, 4000)
		}
		
		if (loading) {
			console.log(data);
			
			//Consulta
			consult();
		}
	}, [loading, data, dispatch]);

	return (
		<Dialog
			open={open}
			TransitionComponent={AnimationDialog}
			fullScreen
		>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Button disabled={loading} onClick={handleClose} className={classes.button}>
						Cerrar
					</Button>
					<LoadingComponent loading={loading} color="inherit">
						<label htmlFor="id-submit-editUser">
							<Button 
								variant="contained" 
								component="span" 
								endIcon={<SaveIcon />}
							>
								Guardar
							</Button>
						</label>
					</LoadingComponent>
				</Toolbar>
			</AppBar>
			<DialogContent className={classes.paddingTopDialog}>
				<Tabs
					value={tabsEdit}
					onChange={handleChangeTab}
					aria-label="Tabs editMenu"
					variant="scrollable"
					scrollButtons="on"
				>
					<Tab label="Datos usuario" {...a11yProps(0)} />
					<Tab label="Datos personales" {...a11yProps(1)} />
					<Tab label="Correo" {...a11yProps(2)} />
					<Tab label="Contraseña" {...a11yProps(3)} />
				</Tabs>
				<Divider />
				<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<TabPanel value={tabsEdit} index={0}>
						<Grid container>
							<Grid item xs={12}>
								<Typography className="box__title box__title--opacity box__title--marginBottom">
									Datos de usuario
								</Typography>
							</Grid>

							<Grid container item xs={12}>
								<Container maxWidth="md">
									<SectionUser
										form={{ register, errors }}
										classes={classes}
										data={data}
										loading={loading}
									/>
								</Container>
							</Grid>
						</Grid>
					</TabPanel>
					<TabPanel value={tabsEdit} index={1}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid container>
								<Grid item xs={12}>
									<Typography className="box__title box__title--opacity box__title--marginBottom">
										Datos personales
									</Typography>
								</Grid>

								<Grid container item xs={12}>
									<Container maxWidth="md">
										{data.user?.privilegio === 'V-' && (
											<SectionPersonalEstudiante
												form={{ register, errors, control, watch, setValue }}
												classes={classes}
												data={data}
												loading={loading}
											/>
										)}
										
										{data.user?.privilegio !== 'V-' && (
											<SectionPersonalDocente
												form={{ register, errors, control, watch, setValue }}
												classes={classes}
												data={data}
												loading={loading}
											/>
										)}
									</Container>
								</Grid>
							</Grid>
						</MuiPickersUtilsProvider>
					</TabPanel>
					<TabPanel value={tabsEdit} index={2}>
						<Grid container>
							<Grid item xs={12}>
								<Typography className="box__title box__title--opacity box__title--marginBottom">
									Correo
								</Typography>
							</Grid>

							<Grid container item xs={12}>
								<Container maxWidth="md">
									<SectionCorreo
										form={{ register, errors }}
										classes={classes}
										data={data}
										loading={loading}
									/>
								</Container>
							</Grid>
						</Grid>
					</TabPanel>
					<TabPanel value={tabsEdit} index={3}>
						<Grid container>
							<Grid item xs={12}>
								<Typography className="box__title box__title--opacity box__title--marginBottom">
									Contraseña
								</Typography>
							</Grid>

							<Grid container item xs={12}>
								<Container maxWidth="md">
									<SectionPassword
										form={{ register, errors, watch, setValue }}
										classes={classes}
										data={data}
										loading={loading}
									/>
								</Container>
							</Grid>
						</Grid>
					</TabPanel>
					<DialogContentText>
						AVISO: Tenga en cuenta que al guardar solo se cargarán los datos de la pestaña actual, las demás no se verán afectadas.
					</DialogContentText>
					<input type="hidden" ref={register} name='option' value={tabsEdit} />
					<input type="submit" style={{ display: 'none' }} id="id-submit-editUser" />
				</form>
			</DialogContent>
		</Dialog>
	);
}

function SectionUser({ form, classes, data, loading }) {
	const { register, errors } = form;

	return (
		<Grid container spacing={2}>
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
				xs
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
					<Button disabled={loading}>Cambiar Avatar</Button>
					<Button disabled={loading}>Quitar Avatar</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export function SectionPersonalEstudiante(props) {
	return (
		<Grid container alignItems="center" spacing={2}>
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Información de la madre
				</Typography>
			</Grid>

			<SectionMom {...props} />

			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Información del padre
				</Typography>
			</Grid>

			<SectionDad {...props} />

			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Información del representante legal
				</Typography>
			</Grid>

			<SectionRepresentante {...props} />

			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Datos de ubicación del representante
				</Typography>
			</Grid>

			<SectionUbicacionRepre {...props} />
			
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Datos del estudiante
				</Typography>
			</Grid>
			
			<SectionEstudiante {...props} />
			
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Datos de ubicación domicilio del estudiante
				</Typography>
			</Grid>
			
			<SectionUbiEstudiante {...props} />
			
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Otros datos del estudiante
				</Typography>
			</Grid>
			
			<SectionOtrosEstudiante {...props} />
		</Grid>
	);
}

export function SectionPersonalDocente(props) {
	return (
		<Grid container alignItems="center" spacing={2}>
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Información de la persona
				</Typography>
			</Grid>

			<SectionDocente {...props} />
		</Grid>
	);
}

function SectionCorreo({ form, classes, data, loading }) {
	const { register, errors } = form;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<RenderInput
					type='email'
					name="user.correo"
					label="Correo electrónico"
					defaultValue={data.user?.correo}
					errors={errors.user?.correo}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 5, message: 'Campo no válido.' },
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Correo no válido',
						},
					})}
					disabledOnLoading={loading}
					size="small"
					maxWidth="300px"
				/>
			</Grid>
			<Grid item xs={12}>
				<DialogContentText>
					Tenga en cuenta que al cambiar el correo del usuario puede que ya no pueda realizar
					algunas acciones correctamente, antes de cambiarlo verifique bien el correo.
				</DialogContentText>
			</Grid>
		</Grid>
	);
}

function SectionPassword({ form, classes, data, loading }) {
	const { register, errors, watch, setValue } = form;

	const [changePass, setChangePass] = useState(false);
	const [generatePass, setGeneratePass] = useState(false);
	
	const handleGenerate = () => {
		setGeneratePass(!generatePass);
	}

	const handleClick = () => {
		setChangePass(true);
	};
	
	useEffect(()=>{
		if (generatePass) {
			const simplePW = generatePassword(5);
			setValue('user.newPass', simplePW, {shouldDirty: true});
			setValue('user.confirmPass', simplePW, {shouldDirty: true});
		}else {
			setValue('user.newPass', '');
			setValue('user.confirmPass', '');
		}
	}, [generatePass, setValue, changePass])

	if (changePass) {
		return (
			<Grid container spacing={2}>
				<Grid container justify="center" item xs={12} sm={6}>
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
						focus
						size="small"
						maxWidth="300px"
						passwordMode
					/>
				</Grid>

				<Grid container justify="center" item xs={12} sm={6}>
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
						maxWidth="300px"
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
			</Grid>
		);
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<DialogContentText>
					Una vez cambiada la contraseña la antigua será reemplazada, ¿está seguro de realizar esta
					acción?
				</DialogContentText>
			</Grid>

			<Grid container justify="center" item xs={12}>
				<Button onClick={handleClick}>Deseo cambiar la contraseña</Button>
			</Grid>
		</Grid>
	);
}

export default EditUser;