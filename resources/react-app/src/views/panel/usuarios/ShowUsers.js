import React, { useRef } from 'react';

import { Container, Grid, Button, MenuItem, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import MaterialTable from 'material-table';

import { useSelector, useDispatch } from 'react-redux';
import updateDialogs from './../../../actions/updateDialogs';

import { useForm } from 'react-hook-form';

import { tableIcons, tableLocation } from './../../../components/TableConfig';
import { RenderSelectFormHook } from './../../../components/RendersGlobals';
import LocationShow from './../../../components/LocationShow';
import ConfirmAction from './ConfirmAction';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import VerUser from './VerUser';

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(3),
	},
	marginFinish: {
		marginBottom: theme.spacing(3),
	}
}));

function ShowUsers() {
	const tableRef = useRef(null);

	const dispatch = useDispatch();

	const { control, errors } = useForm();

	const classes = useStyles();
	
	const handleCreate = () => {
		dispatch(updateDialogs('createUser', true, false));
	}

	return (
		<Container maxWidth="md" className={classes.marginFinish}>
			<Grid container className={classes.margin} spacing={2}>
				<Grid item xs={12}>
					<LocationShow />
				</Grid>
				<Grid container justify="space-between" spacing={2} item xs={12} sm={9} md={6}>
					<Grid item xs={6}>
						<RenderSelectFormHook
							id="selectListUser"
							name="selectListUser"
							nameLabel="Tipo de usuarios"
							defaultValue="all"
							control={control}
							errors={errors.selectListUser}
						>
							<MenuItem value="all">Todos</MenuItem>
							<MenuItem value="estudi">Estudiantes</MenuItem>
							<MenuItem value="profe">Profesores</MenuItem>
							<MenuItem value="admin">Administradores</MenuItem>
						</RenderSelectFormHook>
					</Grid>
					<Grid item xs={6}>
						<RenderSelectFormHook
							id="viewCurso"
							name="viewCurso"
							nameLabel="Ver estudiantes en curso"
							defaultValue=""
							control={control}
							errors={errors.viewCurso}
						>
							<MenuItem value="estudi">Estudiantes</MenuItem>
							<MenuItem value="profe">Profesores</MenuItem>
							<MenuItem value="admin">Administradores</MenuItem>
						</RenderSelectFormHook>
					</Grid>
				</Grid>
				<Grid container item justify="flex-end" alignItems="center" xs={12} sm={3} md={6}>
					<Button 
						onClick={handleCreate} 
						variant="contained" 
						color="primary" 
						startIcon={<AddIcon />}
					>
						Añadir
					</Button>
				</Grid>
			</Grid>
			<MaterialTable
				tableRef={tableRef}
				title="Usuarios registrados"
				icons={tableIcons}
				columns={[
					{
						title: 'Usuario',
						field: 'name',
						render: (rowData) => (
							<Grid container alignItems="center" spacing={2}>
								<Grid item>
									<Avatar src={rowData.user.avatar} alt="Avatar User">
										{rowData.user.name.substring(0, 1).toUpperCase()}
									</Avatar>
								</Grid>
								<Grid item>{rowData.user.name}</Grid>
							</Grid>
						),
					},
					{
						title: 'Cédula', 
						field: 'cedula',
						render: (rowData) => rowData.user.privilegio + rowData.user.cedula,
					},
				]}
				data={[
					{
						user: {
							id: 1,
							cedula: '1234567890',
							name: 'Recker',
							avatar: 'test',
							privilegio: 'A-',
							correo: 'recker@testing.es',
						},
						dataPersonal: {
							nacimiento: '10/08/2001',
							docente: 'No',
							telefono: '04268574630',
							sexo: 'Masculino',
							direccion: 'Turmero, cagua',
						}
					},
					{
						user: {
							id: 2,
							cedula: '020432842',
							name: 'Docente',
							avatar: 'test',
							privilegio: 'P-',
							correo: 'docente@testing.es',
						},
						dataPersonal: {
							nacimiento: '10/08/1989',
							telefono: '04268574630',
							sexo: 'Masculino',
							direccion: 'Turmero, cagua',
							docente: 'Si',
							titulo: 'Magister en petro',
							ingresoMPPE: '07/22/2000',
							ingresoInstituto: '10/30/2000',
						}
					},
					{
						user: {
							id: 3,
							cedula: '987654321',
							name: 'José Antonio Ortiz Garcia',
							avatar: 'test',
							privilegio: 'V-',
							correo: 'jose@testing.es',
						},
						dataPersonal: {
							madre: {
								nombre: 'Rhadys Garcia',
								nacionalidad: 'V',
								cedula: '19385748',
								telefono: '483769548143',
								direccion: 'Turmero, Cagua'
							},
							padre: {
								nombre: 'Rafaél Ortiz',
								nacionalidad: 'E',
								cedula: '19385748',
								telefono: '483769548143',
								direccion: 'Turmero, Cagua'
							},
							representante: {
								nombre: 'Rhadys Garcia',
								nacionalidad: 'V',
								cedula: '19385748',
								telefono: '483769548143',
								direccion: 'Turmero, Cagua',
								sexo: 'Femenino',
								tipoFamiliar: 'Madre',
								estadoCivil: 'Casado',
								nacimiento: '10/08/2001',
								correo: 'rhadys@gmail.com',
								empleo: 'Si',
								ubicacion: {
									estado: 'Aragua',
									municipio: 'Santiago Mariño',
									parroquia: 'Parroquia Turmero',
									via: 'Calle',
								},
								empleoData: {
									profesion: 'Profesor',
									lugar: 'Turmero, cagua',
								}
							},
							estudiante: {
								sexo: 'Masculino',
								estadoCivil: 'Soltero',
								lateralidad: 'Derecho',
								nacionalidad: 'V',
								estadoNacimiento: 'Aragua',
								lugarNacimiento: 'Maracay, al lado de chavez',
								nacimiento: '10/08/2001',
								canaima: 'Si',
								beca: 'No',
								alojado: 'Si',
								viviendaDetalles: {
									tipo: 'Apto',
									ubicacion: 'Urbanización',
									zona: 'Urbana',
									condiInfra: 4,
									condiVivienda: 'Propia pagandose'
								}
							}
						}
					},
				]}
				localization={tableLocation}
				actions={[
					{
						icon: () => <PersonIcon />,
						tooltip: 'Ver',
						onClick: (event, rowData) => {
							dispatch(updateDialogs('verUser', true, false, rowData));
						},
					},
					{
						icon: () => <Edit />,
						tooltip: 'Editar',
						onClick: (event, rowData) => {
							dispatch(updateDialogs('editUser', true, false, rowData));
						},
					},
					{
						iconProps: { style: { color: 'green' } },
						icon: () => <Delete />,
						tooltip: 'Eliminar',
						onClick: (event, rowData) => {
							dispatch(updateDialogs('confirmAction', true, false, rowData));
						},
					},
				]}
				options={{
					actionsColumnIndex: -1,
				}}
			/>

			<DialogsComponentShow />
		</Container>
	);
}

function DialogsComponentShow() {
	const { data } = useSelector((state) => ({
		data: state.dialogs.confirmAction.data,
	}));
	const dispatch = useDispatch();

	const ConfirmDelete = async () => {
		await setTimeout(() => {
			dispatch(updateDialogs('confirmAction', false, true, {}));
		}, 4000);
	};

	return (
		<React.Fragment>
			<CreateUser />
			<ConfirmAction
				action={`Eliminar usuario: ${data.user?.privilegio + data.user?.cedula}`}
				callback={ConfirmDelete}
			/>
			<EditUser />
			<VerUser />
		</React.Fragment>
	);
}

export default ShowUsers;