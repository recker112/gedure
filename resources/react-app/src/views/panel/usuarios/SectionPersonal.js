import React, { useEffect, useState } from 'react';

import { RenderInput, RenderSelectFormHook } from './../../../components/RendersGlobals';
import { estadosVE, buscarMunicipioVE, buscarParroquiaVE } from './../../../components/GlobalData';

import { Grid, MenuItem, TextField, Typography, Box } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Rating from '@material-ui/lab/Rating';

import { Controller } from 'react-hook-form';

export function SectionMom({ form, data, loading }) {
	const { register, errors, control } = form;

	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="dataPersonal.madre.nombre"
					label="Nombre de la madre"
					defaultValue={data.dataPersonal?.madre?.nombre}
					errors={errors.dataPersonal?.madre?.nombre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 3, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>

			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id="nacionalidadMadre-editUser"
					name="dataPersonal.madre.nacionalidad"
					nameLabel="Nacionalidad"
					defaultValue={data.dataPersonal?.madre?.nacionalidad}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="V">Venezolano</MenuItem>
					<MenuItem value="E">Extranjero</MenuItem>
				</RenderSelectFormHook>
			</Grid>

			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					type="number"
					name="dataPersonal.madre.cedula"
					label="Cédula"
					defaultValue={data.dataPersonal?.madre?.cedula}
					errors={errors.dataPersonal?.madre?.cedula}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 6, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6}>
				<RenderInput
					type="number"
					name="dataPersonal.madre.telefono"
					label="Número telefónico"
					defaultValue={data.dataPersonal?.madre?.telefono}
					errors={errors.dataPersonal?.madre?.telefono}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 10, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6}>
				<RenderInput
					name="dataPersonal.madre.direccion"
					label="Dirección de domicilio"
					defaultValue={data.dataPersonal?.madre?.direccion}
					errors={errors.dataPersonal?.madre?.direccion}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 10, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>
		</React.Fragment>
	);
}

export function SectionDad({ form, data, loading }) {
	const { register, errors, control } = form;

	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="dataPersonal.padre.nombre"
					label="Nombre del padre"
					defaultValue={data.dataPersonal?.padre?.nombre}
					errors={errors.dataPersonal?.padre?.nombre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 3, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>

			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id="nacionalidadPadre-editUser"
					name="dataPersonal.padre.nacionalidad"
					nameLabel="Nacionalidad"
					defaultValue={data.dataPersonal?.padre?.nacionalidad}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="V">Venezolano</MenuItem>
					<MenuItem value="E">Extranjero</MenuItem>
				</RenderSelectFormHook>
			</Grid>

			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					type="number"
					name="dataPersonal.padre.cedula"
					label="Cédula"
					defaultValue={data.dataPersonal?.padre?.cedula}
					errors={errors.dataPersonal?.padre?.cedula}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 6, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6}>
				<RenderInput
					type="number"
					name="dataPersonal.padre.telefono"
					label="Número telefónico"
					defaultValue={data.dataPersonal?.padre?.telefono}
					errors={errors.dataPersonal?.padre?.telefono}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 10, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={6}>
				<RenderInput
					name="dataPersonal.padre.direccion"
					label="Dirección de domicilio"
					defaultValue={data.dataPersonal?.padre?.direccion}
					errors={errors.dataPersonal?.padre?.direccion}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 10, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>
		</React.Fragment>
	);
}

export function SectionRepresentante({ form, data, loading }) {
	const { register, errors, control } = form;

	const LimitDate = new Date();
	LimitDate.setDate(LimitDate.getDate() - 368);

	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="dataPersonal.representante.nombre"
					label="Nombre del representante"
					defaultValue={data.dataPersonal?.representante?.nombre}
					errors={errors.dataPersonal?.representante?.nombre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 3, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>

			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id="nacionalidad-editUser"
					name="dataPersonal.representante.nacionalidad"
					nameLabel="Nacionalidad"
					defaultValue={data.dataPersonal?.representante?.nacionalidad}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="V">Venezolano</MenuItem>
					<MenuItem value="E">Extranjero</MenuItem>
				</RenderSelectFormHook>
			</Grid>

			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					type="number"
					name="dataPersonal.representante.cedula"
					label="Cédula"
					defaultValue={data.dataPersonal?.representante?.cedula}
					errors={errors.dataPersonal?.representante?.cedula}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 6, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					type="number"
					name="dataPersonal.representante.telefono"
					label="Número telefónico"
					defaultValue={data.dataPersonal?.representante?.telefono}
					errors={errors.dataPersonal?.representante?.telefono}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 10, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="dataPersonal.representante.direccion"
					label="Dirección de domicilio"
					defaultValue={data.dataPersonal?.representante?.direccion}
					errors={errors.dataPersonal?.representante?.direccion}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 10, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>

			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id="sexoR-editUser"
					name="dataPersonal.representante.sexo"
					nameLabel="Sexo"
					defaultValue={data.dataPersonal?.representante?.sexo}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Femenino">Femenino</MenuItem>
					<MenuItem value="Masculino">Masculino</MenuItem>
				</RenderSelectFormHook>
			</Grid>

			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id="tipoFamiliarR-editUser"
					name="dataPersonal.representante.tipoFamiliar"
					nameLabel="Tipo de familiar"
					defaultValue={data.dataPersonal?.representante?.tipoFamiliar}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Madre">Madre</MenuItem>
					<MenuItem value="Padre">Padre</MenuItem>
					<MenuItem value="Abuela(o)">Abuela(o)</MenuItem>
					<MenuItem value="Padrastro">Padrastro</MenuItem>
					<MenuItem value="Madastra">Madastra</MenuItem>
					<MenuItem value="Tia(o)">Tia(o)</MenuItem>
					<MenuItem value="Otro">Otro</MenuItem>
				</RenderSelectFormHook>
			</Grid>

			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id="estadoCivil-editUser"
					name="dataPersonal.representante.estadoCivil"
					nameLabel="Estado civil"
					defaultValue={data.dataPersonal?.representante?.estadoCivil}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Soltero">Soltero</MenuItem>
					<MenuItem value="Casado">Casado</MenuItem>
					<MenuItem value="Viudo">Viudo</MenuItem>
					<MenuItem value="Concubino">Concubino</MenuItem>
					<MenuItem value="Divorciado">Divorciado</MenuItem>
				</RenderSelectFormHook>
			</Grid>

			<Grid item xs={6} sm={6} md={3}>
				<Controller
					as={
						<KeyboardDatePicker
							disableFuture
							variant="inline"
							inputVariant="outlined"
							format="dd/MM/yyyy"
							openTo="year"
							views={['year', 'month', 'date']}
							id="fecha-representante"
							label="Nacimiento"
							maxDateMessage="Fecha no válida."
							maxDate={LimitDate}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					}
					name="dataPersonal.representante.nacimiento"
					control={control}
					defaultValue={data.dataPersonal?.representante?.nacimiento}
					rules={{ required: { value: true, message: 'Campo necesario.' } }}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					type="email"
					name="dataPersonal.representante.correo"
					label="Corrreo electrónico"
					defaultValue={data.dataPersonal?.representante?.correo}
					errors={errors.dataPersonal?.representante?.correo}
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
				/>
			</Grid>
		</React.Fragment>
	);
}

export function SectionUbicacionRepre({ form, data, loading }) {
	const { register, errors, watch, control, setValue } = form;

	useEffect(() => {
		register('dataPersonal.representante.ubicacion.estado', {
			required: { value: true, message: 'Campo requerido.' },
		});

		register('dataPersonal.representante.ubicacion.municipio', {
			required: { value: true, message: 'Campo requerido.' },
		});

		register('dataPersonal.representante.ubicacion.parroquia', {
			required: { value: true, message: 'Campo requerido.' },
		});

		//NOTE (RECKER): Fix data void
		/* Debido a problemas con los AutoComplete's es necesario actualizar el value manualmente para que no cree errores al insertarse el value en los inputs. */
		setValue(
			'dataPersonal.representante.ubicacion.estado',
			data.dataPersonal?.representante?.ubicacion?.estado,
			{ shouldValidate: true }
		);
		setValue(
			'dataPersonal.representante.ubicacion.municipio',
			data.dataPersonal?.representante?.ubicacion?.municipio,
			{ shouldValidate: true }
		);
		setValue(
			'dataPersonal.representante.ubicacion.parroquia',
			data.dataPersonal?.representante?.ubicacion?.parroquia,
			{ shouldValidate: true }
		);
		// eslint-disable-next-line
	}, []);

	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={4}>
				<Autocomplete
					id="estadoRep-editUser"
					options={estadosVE}
					getOptionLabel={(option) => option}
					defaultValue={data.dataPersonal?.representante?.ubicacion?.estado}
					onChange={(event, value) => {
						setValue('dataPersonal.representante.ubicacion.estado', value, {
							shouldValidate: true,
						});
						setValue('dataPersonal.representante.ubicacion.municipio', '', {
							shouldValidate: true,
						});
						setValue('dataPersonal.representante.ubicacion.parroquia', '', {
							shouldValidate: true,
						});
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Estado"
							variant="outlined"
							size="small"
							error={Boolean(errors.dataPersonal?.representante?.ubicacion?.estado)}
							helperText={errors.dataPersonal?.representante?.ubicacion?.estado?.message}
						/>
					)}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={4}>
				<Autocomplete
					id="municipioRep-editUser"
					options={
						watch('dataPersonal.representante.ubicacion.estado')
							? buscarMunicipioVE(watch('dataPersonal.representante.ubicacion.estado'))
							: []
					}
					getOptionLabel={(option) => option}
					defaultValue={data.dataPersonal?.representante?.ubicacion?.municipio}
					onChange={(event, value) => {
						setValue('dataPersonal.representante.ubicacion.municipio', value, {
							shouldValidate: true,
						});
						setValue('dataPersonal.representante.ubicacion.parroquia', '', {
							shouldValidate: true,
						});
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Municipio"
							variant="outlined"
							size="small"
							error={Boolean(errors.dataPersonal?.representante?.ubicacion?.municipio)}
							helperText={errors.dataPersonal?.representante?.ubicacion?.municipio?.message}
						/>
					)}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={4}>
				<Autocomplete
					id="ubiParroquiaRep-editUser"
					options={
						watch('dataPersonal.representante.ubicacion.estado') &&
						watch('dataPersonal.representante.ubicacion.municipio')
							? buscarParroquiaVE(
									watch('dataPersonal.representante.ubicacion.estado'),
									watch('dataPersonal.representante.ubicacion.municipio')
							  )
							: []
					}
					getOptionLabel={(option) => option}
					defaultValue={data.dataPersonal?.representante?.ubicacion?.parroquia}
					onChange={(event, value) => {
						setValue('dataPersonal.representante.ubicacion.parroquia', value, {
							shouldValidate: true,
						});
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Parroquia"
							variant="outlined"
							size="small"
							error={Boolean(errors.dataPersonal?.representante?.ubicacion?.parroquia)}
							helperText={errors.dataPersonal?.representante?.ubicacion?.parroquia?.message}
						/>
					)}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={3}>
				<RenderSelectFormHook
					id="viaRepresentante-editUser"
					name="dataPersonal.representante.ubicacion.via"
					nameLabel="Tipo de via"
					defaultValue={data.dataPersonal?.representante?.ubicacion?.via}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Aut">Aut</MenuItem>
					<MenuItem value="Av">Av</MenuItem>
					<MenuItem value="Blvr">Blvr</MenuItem>
					<MenuItem value="Calle">Calle</MenuItem>
					<MenuItem value="Callejón">Callejón</MenuItem>
					<MenuItem value="Carretera">Carretera</MenuItem>
					<MenuItem value="Manzana">Manzana</MenuItem>
					<MenuItem value="Prolongación">Prolongación</MenuItem>
					<MenuItem value="Transversal">Transversal</MenuItem>
					<MenuItem value="Vereda">Vereda</MenuItem>
				</RenderSelectFormHook>
			</Grid>

			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="empleoRepresentante-editUser"
					name="dataPersonal.representante.empleo"
					nameLabel="¿Tiene empleo?"
					defaultValue={data.dataPersonal?.representante?.empleo}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value='Si'>Si</MenuItem>
					<MenuItem value='No'>No</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			{watch('dataPersonal.representante.empleo') === 'Si' && (
				<React.Fragment>
					<Grid item xs={12} sm={6} md={5}>
						<RenderInput
							name="dataPersonal.representante.empleoData.profesion"
							label="Profesión"
							defaultValue={data.dataPersonal?.representante?.empleoData?.profesion}
							errors={errors.dataPersonal?.representante?.empleoData?.profesion}
							registerInput={register({
								required: { value: true, message: 'Campo requerido.' },
								minLength: { value: 4, message: 'Campo no válido.' },
							})}
							disabledOnLoading={loading}
							size="small"
						/>
					</Grid>
					
					<Grid item xs={12} sm={6} md={5}>
						<RenderInput
							name="dataPersonal.representante.empleoData.lugar"
							label="Lugar donde trabaja"
							defaultValue={data.dataPersonal?.representante?.empleoData?.lugar}
							errors={errors.dataPersonal?.representante?.empleoData?.lugar}
							registerInput={register({
								required: { value: true, message: 'Campo requerido.' },
								minLength: { value: 8, message: 'Campo no válido.' },
							})}
							disabledOnLoading={loading}
							size="small"
						/>
					</Grid>
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

export function SectionEstudiante({ form, data, loading }) {
	const { register, errors, control, setValue, watch } = form;
	
	useEffect(()=>{
		register('dataPersonal.estudiante.estadoNacimiento', {
			required: { value: true, message: 'Campo requerido.' },
		});


		//NOTE (RECKER): Fix data void
		/* Debido a problemas con los AutoComplete's es necesario actualizar el value manualmente para que no cree errores al insertarse el value en los inputs. */
		setValue(
			'dataPersonal.estudiante.estadoNacimiento',
			data.dataPersonal?.estudiante?.estadoNacimiento,
			{ shouldValidate: true }
		);
		// eslint-disable-next-line
	}, [])
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="sexoEstudiante-editUser"
					name="dataPersonal.estudiante.sexo"
					nameLabel="Sexo"
					defaultValue={data.dataPersonal?.estudiante?.sexo}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Femenino">Femenino</MenuItem>
					<MenuItem value="Masculino">Masculino</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="estadoCivilEstudiante-editUser"
					name="dataPersonal.estudiante.estadoCivil"
					nameLabel="Estado civil"
					defaultValue={data.dataPersonal?.estudiante?.estadoCivil}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Soltero">Soltero</MenuItem>
					<MenuItem value="Concubino">Concubino</MenuItem>
					<MenuItem value="Casado">Casado</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="lateralidadEstudiante-editUser"
					name="dataPersonal.estudiante.lateralidad"
					nameLabel="Lateralidad"
					defaultValue={data.dataPersonal?.estudiante?.lateralidad}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Derecho">Derecho</MenuItem>
					<MenuItem value="Zurdo">Zurdo</MenuItem>
					<MenuItem value="Ambidiestro">Ambidiestro</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="nacionalidadEstudiante-editUser"
					name="dataPersonal.estudiante.nacionalidad"
					nameLabel="Nacionalidad"
					defaultValue={data.dataPersonal?.estudiante?.nacionalidad}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="V">Venezolano</MenuItem>
					<MenuItem value="E">Extranjero</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			{watch('dataPersonal.estudiante.nacionalidad') === 'V' && (
				<Grid item xs={12} sm={6} md={4}>
					<Autocomplete
						id="estadoNacimientoEstu-editUser"
						options={estadosVE}
						getOptionLabel={(option) => option}
						defaultValue={data.dataPersonal?.estudiante?.estadoNacimiento}
						onChange={(event, value) => {
							setValue('dataPersonal.estudiante.estadoNacimiento', value, {
								shouldValidate: true,
							});
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Estado"
								variant="outlined"
								size="small"
								error={Boolean(errors.dataPersonal?.estudiante?.estadoNacimiento)}
								helperText={errors.dataPersonal?.estudiante?.estadoNacimiento?.message}
							/>
						)}
					/>
				</Grid>
			)}
			
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="dataPersonal.estudiante.lugarNacimiento"
					label="Lugar de nacimiento"
					defaultValue={data.dataPersonal?.estudiante?.lugarNacimiento}
					errors={errors.dataPersonal?.estudiante?.lugarNacimiento}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 6, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size="small"
				/>
			</Grid>
		</React.Fragment>
	);
}

export function SectionUbiEstudiante({ form, data, loading }) {
	const { errors, control, watch } = form;
	const [labelRanking, setLabelRanking] = useState(data.dataPersonal?.estudiante?.viviendaDetalles?.condiInfra);
	
	const labels = {
		1: 'Deplorable',
		2: 'Deteriorada',
		3: 'Regular',
		4: 'Buena',
		5: 'Excelente',
	};
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="tipoViviendaEstu-editUser"
					name="dataPersonal.estudiante.viviendaDetalles.tipo"
					nameLabel="Tipo vivienda"
					defaultValue={data.dataPersonal?.estudiante?.viviendaDetalles?.tipo}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Apto">Apto</MenuItem>
					<MenuItem value="Apto-quinta">Apto-quinta</MenuItem>
					<MenuItem value="Casa">Casa</MenuItem>
					<MenuItem value="Casa-quinta">Apto</MenuItem>
					<MenuItem value="Quinta">Quinta</MenuItem>
					<MenuItem value="Rancho barrio">Rancho barrio</MenuItem>
					<MenuItem value="Refugio">Refugio</MenuItem>
					<MenuItem value="Casa de vecindad">Casa de vecindad</MenuItem>
					<MenuItem value="Improvisado">Improvisado</MenuItem>
					<MenuItem value="Rancho rural">Rancho rural</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="ubiViviendaEstu-editUser"
					name="dataPersonal.estudiante.viviendaDetalles.ubicacion"
					nameLabel="Ubicacion vivienda"
					defaultValue={data.dataPersonal?.estudiante?.viviendaDetalles?.ubicacion}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Rancho">Rancho</MenuItem>
					<MenuItem value="Caserio">Caserio</MenuItem>
					<MenuItem value="Urbanización">Ubrbanización</MenuItem>
					<MenuItem value="Zona residencial">Zona residencial</MenuItem>
					<MenuItem value="Otros">Otros</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="zonaViviendaEstu-editUser"
					name="dataPersonal.estudiante.viviendaDetalles.zona"
					nameLabel="Zona vivienda"
					defaultValue={data.dataPersonal?.estudiante?.viviendaDetalles?.zona}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Rural">Rural</MenuItem>
					<MenuItem value="Urbana">Urbana</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={3}>
				<Typography>Cond. de Infraestructura</Typography>
				<Controller 
					name='dataPersonal.estudiante.viviendaDetalles.condiInfra'
					as={
						<Rating
							onChangeActive={(event, newHover) => {
								setLabelRanking(newHover);
							}}
						/>
					}
					control={control}
					defaultValue={data.dataPersonal.estudiante?.viviendaDetalles?.condiInfra}
				/>
				<Box>{labels[labelRanking !== -1 ? labelRanking : watch('dataPersonal.estudiante.viviendaDetalles.condiInfra')]}</Box>
			</Grid>
			
			<Grid item xs={12} sm={6} md={3}>
				<RenderSelectFormHook
					id="condicionVivienda2Estu-editUser"
					name="dataPersonal.estudiante.viviendaDetalles.condiVivienda"
					nameLabel="Cond. de vivienda"
					defaultValue={data.dataPersonal?.estudiante?.viviendaDetalles?.condiVivienda}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value="Al cuido">Al cuido</MenuItem>
					<MenuItem value="Alquilada">Alquilada</MenuItem>
					<MenuItem value="Propia pagada">Propia pagada</MenuItem>
					<MenuItem value="Propia pagandose">Propia pagandose</MenuItem>
					<MenuItem value="Otro">Otro</MenuItem>
				</RenderSelectFormHook>
			</Grid>
		</React.Fragment>
	);
}

export function SectionOtrosEstudiante({ form, data, loading }) {
	const { register, errors, control, watch } = form;
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="laNASA-editUser"
					name="dataPersonal.estudiante.canaima"
					nameLabel="¿Posee canaima?"
					defaultValue={data.dataPersonal?.estudiante?.canaima}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value='Si'>Si</MenuItem>
					<MenuItem value='No'>No</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={2}>
				<RenderSelectFormHook
					id="laNASA-editUser"
					name="dataPersonal.estudiante.beca"
					nameLabel="¿Posee beca?"
					defaultValue={data.dataPersonal?.estudiante?.beca}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value='Si'>Si</MenuItem>
					<MenuItem value='No'>No</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={3}>
				<RenderSelectFormHook
					id="laNASA-editUser"
					name="dataPersonal.estudiante.alojado"
					nameLabel="¿Vive con el representante?"
					defaultValue={data.dataPersonal?.estudiante?.alojado}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value='Si'>Si</MenuItem>
					<MenuItem value='No'>No</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			{watch('dataPersonal.estudiante.alojado') === 'No' && (
				<Grid item xs={12} sm={6} md={5}>
					<RenderInput
						name="dataPersonal.estudiante.direccion"
						label="Direccion"
						defaultValue={data.dataPersonal?.estudiante?.direccion}
						errors={errors.dataPersonal?.estudiante?.direccion}
						registerInput={register({
							required: { value: true, message: 'Campo requerido.' },
							minLength: { value: 8, message: 'Campo no válido.' },
						})}
						disabledOnLoading={loading}
						size="small"
					/>
				</Grid>
			)}
		</React.Fragment>
	);
}