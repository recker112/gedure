import React from 'react';

import { RenderInput, RenderSelectFormHook } from './../../../components/RendersGlobals';
import { estadosVE, buscarMunicipioVE, buscarParroquiaVE } from './../../../components/GlobalData';

import { Grid, MenuItem, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Controller } from 'react-hook-form';

export function SectionMom ({ form, classes, data, loading }) { 
	const { register, errors, control } = form;
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="madre"
					label="Nombre de la madre"
					defaultValue={data.madre}
					errors={errors.madre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 3, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>

			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id='nacionalidadMadre-editUser'
					name='nacionalidadMadre'
					nameLabel='Nacionalidad'
					defaultValue={data.nacionalidadMadre}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value='V'>Venezolano</MenuItem>
					<MenuItem value='E'>Extranjero</MenuItem>
				</RenderSelectFormHook>
			</Grid>

			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					type='number'
					name="cedulaMadre"
					label="Cédula"
					defaultValue={data.cedulaMadre}
					errors={errors.cedulaMadre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						min: { value: 5, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={6}>
				<RenderInput
					type='number'
					name="telefonoMadre"
					label="Número telefónico"
					defaultValue={data.telefonoMadre}
					errors={errors.telefonoMadre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						min: { value: 8, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={6}>
				<RenderInput
					name="direccionMadre"
					label="Dirección de domicilio"
					defaultValue={data.direccionMadre}
					errors={errors.direccionMadre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 10, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>
		</React.Fragment>
	);
}

export function SectionDad ({ form, classes, data, loading }) { 
	const { register, errors, control } = form;
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="padre"
					label="Nombre del padre"
					defaultValue={data.padre}
					errors={errors.padre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 3, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>

			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id='nacionalidadPadre-editUser'
					name='nacionalidadPadre'
					nameLabel='Nacionalidad'
					defaultValue={data.nacionalidadPadre}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value='V'>Venezolano</MenuItem>
					<MenuItem value='E'>Extranjero</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					type='number'
					name="cedulaPadre"
					label="Cédula"
					defaultValue={data.cedulaPadre}
					errors={errors.cedulaPadre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						min: { value: 5, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={6}>
				<RenderInput
					type='number'
					name="telefonoPadre"
					label="Número telefónico"
					defaultValue={data.telefonoPadre}
					errors={errors.telefonoPadre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						min: { value: 8, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={6}>
				<RenderInput
					name="direccionPadre"
					label="Dirección de domicilio"
					defaultValue={data.direccionPadre}
					errors={errors.direccionPadre}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 10, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>
		</React.Fragment>
	);
}

export function SectionRepresentante ({ form, classes, data, loading }) { 
	const { register, errors, control } = form;
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="representante"
					label="Nombre del representante"
					defaultValue={data.representante}
					errors={errors.representante}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 3, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>

			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id='nacionalidad-editUser'
					name='nacionalidadRepresentante'
					nameLabel='Nacionalidad'
					defaultValue={data.nacionalidadRepresentante}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value='V'>Venezolano</MenuItem>
					<MenuItem value='E'>Extranjero</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					type='number'
					name="cedulaRepresentante"
					label="Cédula"
					defaultValue={data.cedulaRepresentante}
					errors={errors.cedulaRepresentante}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						min: { value: 5, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					type='number'
					name="telefonoRepresentante"
					label="Número telefónico"
					defaultValue={data.telefonoRepresentante}
					errors={errors.telefonoRepresentante}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						min: { value: 8, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={5}>
				<RenderInput
					name="direccionRepresentante"
					label="Dirección de domicilio"
					defaultValue={data.direccionRepresentante}
					errors={errors.direccionRepresentante}
					registerInput={register({
						required: { value: true, message: 'Campo requerido.' },
						minLength: { value: 10, message: 'Campo no válido.' },
					})}
					disabledOnLoading={loading}
					size='small'
				/>
			</Grid>
			
			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id='sexoR-editUser'
					name='sexoRepresentante'
					nameLabel='Sexo'
					defaultValue={data.sexoRepresentante}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value='F'>Femenino</MenuItem>
					<MenuItem value='M'>Masculino</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id='tipoFamiliarR-editUser'
					name='tipoFamiliarRepresentante'
					nameLabel='Tipo de familiar'
					defaultValue={data.tipoFamiliarRepresentante}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value='Madre'>Madre</MenuItem>
					<MenuItem value='Padre'>Padre</MenuItem>
					<MenuItem value='Abuela(o)'>Abuela(o)</MenuItem>
					<MenuItem value='Padrastro'>Padrastro</MenuItem>
					<MenuItem value='Madastra'>Madastra</MenuItem>
					<MenuItem value='Tia(o)'>Tia(o)</MenuItem>
					<MenuItem value='Otro'>Otro</MenuItem>
				</RenderSelectFormHook>
			</Grid>
			
			<Grid item xs={6} sm={6} md={2}>
				<RenderSelectFormHook
					id='estadoCivil-editUser'
					name='estadoCivilRepresentante'
					nameLabel='Estado civil'
					defaultValue={data.estadoCivilRepresentante}
					control={control}
					errors={errors}
					disabled={loading}
				>
					<MenuItem value='Soltero'>Soltero</MenuItem>
					<MenuItem value='Casado'>Casado</MenuItem>
					<MenuItem value='Viudo'>Viudo</MenuItem>
					<MenuItem value='Concubino'>Concubino</MenuItem>
					<MenuItem value='Divorciado'>Divorciado</MenuItem>
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
							views={["year", "month", "date"]}
							id="fecha-representante"
							label="Nacimiento"
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					}
					name="nacimientoRepresentante"
					control={control}
					defaultValue={data.nacimientoRepresentante}
					rules={{ required: { value: true, message: 'Campo necesario.' } }}
				/>
			</Grid>
		</React.Fragment>
	);
}

export function SectionUbicacionRepre ({ form, classes, data, loading }) { 
	const { register, errors, control, watch, setValue } = form;
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={6} md={5}>
				<Autocomplete 
					id="estadoRep-editUser"
					options={estadosVE}
					getOptionSelected={(option, value) => option === value}
					getOptionLabel={(option) => option}
					onChange={(event, value)=>{setValue('ubiEstadoRepre', value)}}
					renderInput={(params) => (
						<Controller
							as={
								<TextField {...params} 
									label="Estado"
									variant="outlined"
									size="small"
									error={Boolean(errors?.ubiEstadoRepre)}
									helperText={errors?.ubiEstadoRepre?.message}
								/>
							}
							name='ubiEstadoRepre'
							control={control}
							defaultValue={data.ubiEstadoRepre}
							rules={{ required: { value: true, message: 'Campo requerido.' } }}
						/>
					)}
				/>
			</Grid>
			
			<Grid item xs={12} sm={6} md={5}>
				<Controller
					as={
						<Autocomplete 
							id="municipioRep-editUser"
							options={watch('ubiEstadoRepre') ?
								buscarMunicipioVE(watch('ubiEstadoRepre')) : []
							}
							getOptionLabel={(option) => option}
							renderInput={(params) => (
								<TextField {...params} 
									label="Municipio"
									variant="outlined"
									size="small"
									error={Boolean(errors?.ubiMunicipioRepre)}
									helperText={errors?.ubiMunicipioRepre?.message}
								/>
							)}
						/>
					}
					name='ubiMunicipioRepre'
					control={control}
					defaultValue={data.ubiMunicipioRepre}
					rules={{ required: { value: true, message: 'Campo requerido.' } }}
				/>
			</Grid>
		</React.Fragment>
	);
}