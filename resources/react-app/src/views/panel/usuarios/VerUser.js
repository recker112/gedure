import React, { useState } from 'react';

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
	Tabs,
	Tab,
	Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable from 'material-table';

import { tableIcons, tableLocation } from './../../../components/TableConfig';
import AnimationDialog from './../../../components/AnimationDialog';

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
			{value === index && <Box className={classes.paddingTabs}>{children}</Box>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `editMenu-tab-${index}`,
		'aria-controls': `editMenu-tabpanel-${index}`,
	};
}

function VerUser() {
	const [tabsVer, setTabsVer] = useState(0);
	const { open, privilegio, data } = useSelector((state) => ({
		open: state.dialogs.verUser.open,
		data: state.dialogs.verUser.data,
		privilegio: state.userData.user.privilegio,
	}));
	const dispatch = useDispatch();

	const classes = useStyles();

	const handleClose = () => {
		dispatch(updateDialogs('verUser', false, false));
	};

	const handleChangeTab = (event, tab) => {
		setTabsVer(tab);
	};

	return (
		<Dialog open={open} TransitionComponent={AnimationDialog} fullScreen>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Button variant="contained" onClick={handleClose}>
						Cerrar
					</Button>
				</Toolbar>
			</AppBar>
			<DialogContent className={classes.paddingTopDialog}>
				<Tabs
					value={tabsVer}
					onChange={handleChangeTab}
					aria-label="Tabs editMenu"
					variant="scrollable"
					scrollButtons="on"
				>
					<Tab label="Datos del usuario" {...a11yProps(0)} />
					<Tab label="Datos personales" {...a11yProps(1)} />
					{privilegio === 'A-' && <Tab label="Actividad" {...a11yProps(2)} />}
				</Tabs>
				<Divider />
				<TabPanel value={tabsVer} index={0}>
					<Grid container>
						<Grid item xs={12}>
							<Typography className="box__title box__title--opacity box__title--marginBottom">
								Datos de usuario
							</Typography>
						</Grid>

						<Grid container item xs={12}>
							<Container maxWidth="md">
								<SectionUser classes={classes} data={data} />
							</Container>
						</Grid>
					</Grid>
				</TabPanel>

				<TabPanel value={tabsVer} index={1}>
					{data.user?.privilegio === 'V-' && (
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography className="box__title box__title--opacity box__title--marginBottom">
									Datos personales
								</Typography>
							</Grid>

							<Grid container item xs={12}>
								<Container maxWidth="md">
									<SectionMom data={data?.dataPersonal?.madre} />
								</Container>
							</Grid>

							<Grid container item xs={12}>
								<Container maxWidth="md">
									<SectionDad data={data?.dataPersonal?.padre} />
								</Container>
							</Grid>

							<Grid container item xs={12}>
								<Container maxWidth="md">
									<SectionRepresentante data={data?.dataPersonal?.representante} />
								</Container>
							</Grid>

							<Grid container item xs={12}>
								<Container maxWidth="md">
									<SectionUbiRepresentante data={data?.dataPersonal?.representante} />
								</Container>
							</Grid>

							<Grid container item xs={12}>
								<Container maxWidth="md">
									<SectionEstudiante data={data?.dataPersonal?.estudiante} />
								</Container>
							</Grid>

							<Grid container item xs={12}>
								<Container maxWidth="md">
									<SectionUbiEstudiante data={data?.dataPersonal?.estudiante?.viviendaDetalles} />
								</Container>
							</Grid>

							<Grid container item xs={12}>
								<Container maxWidth="md">
									<SectionOtrosEstudiante data={data?.dataPersonal?.estudiante} />
								</Container>
							</Grid>
						</Grid>
					)}
				</TabPanel>
				
				{privilegio === 'A-' && (
					<TabPanel value={tabsVer} index={2}>
						<Grid container>
							<Grid container item xs={12}>
								<Container maxWidth="md">
									<MaterialTable
										title="Actividad del usuario"
										icons={tableIcons}
										columns={[
											{ title: 'Fecha', field: 'fecha'},
											{ title: 'Acción', field: 'action'}
										]}
										data={[
											{fecha: '20/20/2020', action: 'descargar juegos'},
											{fecha: '20/20/2020', action: 'Iniciar sesión'},
											{fecha: '20/20/2020', action: 'Subir tarea'},
											{fecha: '20/20/2020', action: 'Crear un ticket'}
										]}
										localization={tableLocation}
									/>
								</Container>
							</Grid>
						</Grid>
					</TabPanel>
				)}
			</DialogContent>
		</Dialog>
	);
}

function SectionUser({ data, classes }) {
	return (
		<Grid container spacing={2}>
			<Grid container justify="center" item xs={12} sm={3}>
				<Avatar className={classes.avatarLarge} src={data.user?.avatar}>
					{data.user?.name && data.user.name.substring(0, 1).toUpperCase()}
				</Avatar>
			</Grid>
			<Grid container alignItems="center" justify="flex-start" spacing={2} item xs>
				<Grid container className={classes.dataUserSection} item xs={12}>
					<Typography>
						<b>Nombre:</b> {data.user?.name}
					</Typography>
				</Grid>

				<Grid container className={classes.dataUserSection} item xs={12}>
					<Typography>
						<b>Cédula:</b> {data.user?.privilegio + data.user?.cedula}
					</Typography>
				</Grid>

				<Grid container className={classes.dataUserSection} item xs={12}>
					<Typography>
						<b>Correo:</b> {data.user?.correo}
					</Typography>
				</Grid>

				<Grid container className={classes.dataUserSection} item xs={12}>
					<Typography>
						<b>Sexo:</b> {data.dataPersonal?.estudiante?.sexo}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}

function SectionMom({ data }) {
	const { nombre, nacionalidad, cedula, telefono, direccion } = data;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Información de la madre
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Nombre:</b> {nombre}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Nacionalidad:</b> {nacionalidad}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Cédula:</b> {cedula}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Teléfono:</b> {telefono}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Dirección:</b> {direccion}
				</Typography>
			</Grid>
		</Grid>
	);
}

function SectionDad({ data }) {
	const { nombre, nacionalidad, cedula, telefono, direccion } = data;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Información del padre
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Nombre:</b> {nombre}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Nacionalidad:</b> {nacionalidad}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Cédula:</b> {cedula}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Teléfono:</b> {telefono}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Dirección:</b> {direccion}
				</Typography>
			</Grid>
		</Grid>
	);
}

function SectionRepresentante({ data }) {
	const {
		nombre,
		nacionalidad,
		cedula,
		telefono,
		direccion,
		sexo,
		tipoFamiliar,
		estadoCivil,
		correo,
		nacimiento,
	} = data;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Información del representante legal
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Nombre:</b> {nombre}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Nacionalidad:</b> {nacionalidad}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Cédula:</b> {cedula}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Teléfono:</b> {telefono}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Dirección:</b> {direccion}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Sexo:</b> {sexo}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Tipo de familiar:</b> {tipoFamiliar}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Estado civil:</b> {estadoCivil}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Fecha de nacimiento:</b> {nacimiento}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Correo:</b> {correo}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Fecha de nacimiento:</b> {data.dataPersonal?.representante?.nacimiento}
				</Typography>
			</Grid>
		</Grid>
	);
}

function SectionUbiRepresentante({ data }) {
	const {
		empleo,
		empleoData,
		ubicacion,
	} = data;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Datos de ubicación del representante
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Estado:</b> {ubicacion.estado}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Municipio:</b> {ubicacion.municipio}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Parroquía:</b> {ubicacion.parroquia}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Tipo de via:</b> {ubicacion.via}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Empleo:</b> {empleo}
				</Typography>
			</Grid>
			
			{empleo === 'Si' && (
				<React.Fragment>
					<Grid item xs={12} sm={4} md={3}>
						<Typography>
							<b>Profesión:</b> {empleoData.profesion}
						</Typography>
					</Grid>

					<Grid item xs={12} sm={4} md={3}>
						<Typography>
							<b>Ubicación donde trabaja:</b> {empleoData.lugar}
						</Typography>
					</Grid>
				</React.Fragment>
			)}
		</Grid>
	);
}

function SectionEstudiante({ data }) {
	const {
		estadoCivil,
		lateralidad,
		nacionalidad,
		estadoNacimiento,
		lugarNacimiento,
	} = data;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Datos del estudiante
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Estado civil:</b> {estadoCivil}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Lateralidad:</b> {lateralidad}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Nacionalidad:</b> {nacionalidad}
				</Typography>
			</Grid>
			
			{nacionalidad === 'V' && (
				<Grid item xs={12} sm={4} md={3}>
					<Typography>
						<b>Estado de nacimiento:</b> {estadoNacimiento}
					</Typography>
				</Grid>
			)}

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Lugar de nacimiento:</b> {lugarNacimiento}
				</Typography>
			</Grid>
		</Grid>
	);
}

function SectionUbiEstudiante({ data }) {
	const {
		tipo,
		ubicacion,
		zona,
		condiInfra,
		condiVivienda,
	} = data;
	
	const labels = {
		1: 'Deplorable',
		2: 'Deteriorada',
		3: 'Regular',
		4: 'Buena',
		5: 'Excelente',
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Datos de ubicación domicilio del estudiante
				</Typography>
			</Grid>
			
			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Tipo de vivienda:</b> {tipo}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Ubicacion:</b> {ubicacion}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Zona:</b> {zona}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Cond. de infraestructura:</b> {labels[condiInfra]}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Cond. de vivienda:</b> {condiVivienda}
				</Typography>
			</Grid>
		</Grid>
	);
}

function SectionOtrosEstudiante({ data }) {
	const {
		canaima,
		beca,
		alojado,
		direccion,
	} = data;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography className="box__subtitle box__title--opacity box_title--margin">
					Otros datos del estudiante
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Canaima:</b> {canaima}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Beca:</b> {beca}
				</Typography>
			</Grid>

			<Grid item xs={12} sm={4} md={3}>
				<Typography>
					<b>Vive con sus padres:</b> {alojado}
				</Typography>
			</Grid>
			
			{alojado === 'No' && (
				<Grid item xs={12} sm={4} md={3}>
					<Typography>
						<b>Direccion:</b> {direccion}
					</Typography>
				</Grid>
			)}
		</Grid>
	);
}

export default VerUser;