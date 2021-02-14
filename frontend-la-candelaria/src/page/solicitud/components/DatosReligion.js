import React from 'react';

import { 
	Grid,
	Typography,
	TextField,
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup,
	Radio,
	MenuItem,
	Button,
	Box,
} from '@material-ui/core';

import { useFormContext, useWatch } from "react-hook-form";

// Components
import { RenderSelectFormHook } from '../../../components/RendersGlobals';

// Redux
import { useSelector } from 'react-redux';

function DatosReligion() {
	const { dataStorage } = useSelector((state) => ({
		dataStorage: state.forms.solicitudCupo.data,
	}));
	
	const { register, errors, control } = useFormContext();
	const estudi_religion_bautismo = useWatch({
    name: 'estudi_religion_bautismo',
    defaultValue: 'No'
  });
	const estudi_religion_comunion = useWatch({
    name: 'estudi_religion_comunion',
    defaultValue: 'No'
  });
	const estudi_religion_confirmacion = useWatch({
    name: 'estudi_religion_confirmacion',
    defaultValue: 'No'
  });
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big'>
					Religión
				</Typography>
			</Grid>
			<Grid container spacing={2} item xs={12}>
				<Grid item xs={12} sm={6} md={4}>
					<RenderSelectFormHook
						id='estudiante-tipo-religion'
						name='estudi_religion_type'
						nameLabel='Tipo de religión'
						control={control}
						defaultValue={dataStorage.estudi_religion_type || ''}
						errors={errors?.estudi_religion_type}
						helperText='* Campo requerido'
						>
						<MenuItem value=''>
							<em>Ninguno</em>
						</MenuItem>
						<MenuItem value="Católica">Católica</MenuItem>
						<MenuItem value="Otro">Otro</MenuItem>
					</RenderSelectFormHook>
				</Grid>
				<Grid item xs={6} md={4}>
					<FormControl component="fieldset">
						<FormLabel component="legend">¿Tiene el bautismo?</FormLabel>
						<RadioGroup 
							aria-label="Bautismo" 
							defaultValue={dataStorage.estudi_religion_bautismo || 'No'}
							name='estudi_religion_bautismo' 
							row
						>
							<FormControlLabel 
								value="Si" 
								control={
									<Radio inputRef={register} />
								} 
								label="Si"
							/>
							<FormControlLabel 
								value="No" 
								control={
									<Radio inputRef={register} />
								} 
								label="No"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={6} md={4}>
					<FormControl component="fieldset">
						<FormLabel component="legend">¿Hizo la comunión?</FormLabel>
						<RadioGroup 
							aria-label="Comunión" 
							defaultValue={dataStorage.estudi_religion_comunion || 'No'}
							name='estudi_religion_comunion' 
							row
						>
							<FormControlLabel 
								value="Si" 
								control={
									<Radio inputRef={register} />
								} 
								label="Si"
							/>
							<FormControlLabel 
								value="No" 
								control={
									<Radio inputRef={register} />
								} 
								label="No"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<FormControl component="fieldset">
						<FormLabel component="legend">¿Hizo la confirmación?</FormLabel>
						<RadioGroup 
							aria-label="Confirmación"
							defaultValue={dataStorage.estudi_religion_confirmacion || 'No'}
							name='estudi_religion_confirmacion' 
							row
						>
							<FormControlLabel 
								value="Si" 
								control={
									<Radio inputRef={register} />
								} 
								label="Si"
							/>
							<FormControlLabel 
								value="No" 
								control={
									<Radio inputRef={register} />
								} 
								label="No"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				{estudi_religion_bautismo === 'Si' && (
					<React.Fragment>
						<input
							id='estudiante-fe-bautismo'
							defaultValue={null}
							ref={register({
								required: { value: true, message: '* Debe subir un archivo' },
							})}
							style={{display: 'none'}}
							accept="image/*,application/pdf"
							name='estudi_religion_archivo'
							type="file"
						/>
						<Grid container alignItems='center' item xs={12} md={8}>
							<label htmlFor="estudiante-fe-bautismo">
								<Button variant='contained' color='secondary' component="span">
									Subir fe de bautismo
								</Button>
							</label>
							{Boolean(errors.estudi_religion_archivo) && (
								<Box ml={2} color='#f44336'>
									<Typography >{errors.estudi_religion_archivo.message}</Typography>
								</Box>
							)}
						</Grid>
					</React.Fragment>
				)}
				{((estudi_religion_bautismo === 'No') || (estudi_religion_comunion === 'No') || (estudi_religion_confirmacion === 'No')) && (
					<Grid item xs={12}>
						<TextField 
							defaultValue={dataStorage.estudi_religion_why || null}
							inputRef={register({
								required: { value: true, message: '* Campo requerido' },
								minLength: { value: 10, message: 'Error: Describa mejor su motivo' },
								maxLength: { value: 350, message: 'Error: Demaciado largo' },
							})}
							name='estudi_religion_why'
							label='¿Por qué?'
							variant='outlined'
							size='small'
							multiline
							error={Boolean(errors?.estudi_religion_why)}
							helperText={errors?.estudi_religion_why?.message ? errors.estudi_religion_why.message : '* Campo requerido'}
							rows={8}
							fullWidth
						/>
					</Grid>
				)}
			</Grid>
		</React.Fragment>
	)
}

export default DatosReligion;