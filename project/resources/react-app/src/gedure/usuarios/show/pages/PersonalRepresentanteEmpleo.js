import React from 'react';

import {
	Grid,
	Button,
	TextField,
	Divider,
	Box,
	Typography,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@material-ui/core';

import { useForm } from "react-hook-form";

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';
import updateDataUser from '../../../../actions/updateDataUser';

export default function PersonalRepresentanteEmpleo({ id }) {
	const { dataUser, loading, user } = useSelector((state) => ({
		dataUser: state.forms.showUser.data.user,
		loading: state.forms.updatePersonalRepreEmpleo.loading,
		user: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { register, errors, watch, handleSubmit } = useForm({
		mode: 'onTouched'
	});
	const { fetchData } = useFetch();
	
	const onSubmit = async submitData => {
		dispatch(updateForms('updatePersonalRepreEmpleo', true));
		
		const prepare = {
			url: `v1/user/${id}`,
			type: 'post',
			data: {
				...submitData,
				_method: 'PUT'
			},
			successText: 'Datos actualizados',
		};
		
		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(updateForms('showUser', false, response));
			
			if (response.user?.id === user.id) {
				dispatch(updateDataUser({
					user: response.user
				}));
			}
		}
		
		dispatch(updateForms('updatePersonalRepreEmpleo', false));
	}
	
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6' component='span' className='text__bold--semi'>
						Empleo del representante
					</Typography>
					<Box mt={1}>
						<Divider />
					</Box>
				</Grid>
				<Grid item xs={12}>
					<FormControl component="fieldset" disabled={loading}>
						<FormLabel component="legend">¿Tiene empleo?</FormLabel>
						<RadioGroup 
							aria-label="empleo" 
							defaultValue={dataUser.personal_data.repre_empleo || 'No'}
							name='personalData.repre_empleo'
							row
						>
							<FormControlLabel 
								value="No" 
								control={
									<Radio inputRef={register} />
								} 
								label="No"
							/>
							<FormControlLabel 
								value="Si" 
								control={
									<Radio inputRef={register} />
								} 
								label="Si"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				{watch('personalData.repre_empleo', 'No') === 'Si' && (
					<React.Fragment>
						<Grid item xs={12}>
							<TextField 
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 3, message: 'Error: Demaciado corto' },
									maxLength: { value: 30, message: 'Error: Demaciado largo' },
								})}
								error={Boolean(errors?.personalData?.repre_empleo_profesion)}
								helperText={errors?.personalData?.repre_empleo_profesion?.message ? errors.personalData.repre_empleo_profesion.message : ''}
								variant='outlined'
								name='personalData.repre_empleo_profesion'
								defaultValue={dataUser.personal_data.repre_empleo_profesion || ''}
								label='Profesión'
								size='small'
								disabled={loading}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField 
								inputRef={register({
									required: { value: true, message: '* Campo requerido' },
									minLength: { value: 3, message: 'Error: Demaciado corto' },
									maxLength: { value: 30, message: 'Error: Demaciado largo' },
								})}
								error={Boolean(errors?.personalData?.repre_empleo_lugar)}
								helperText={errors?.personalData?.repre_empleo_lugar?.message ? errors.personalData.repre_empleo_lugar.message : ''}
								variant='outlined'
								name='personalData.repre_empleo_lugar'
								label='Lugar donde trabaja'
								defaultValue={dataUser.personal_data.repre_empleo_lugar || ''}
								size='small'
								disabled={loading}
								fullWidth
							/>
						</Grid>
					</React.Fragment>
				)}
				<Grid container justify='flex-end' item xs={12}>
					<LoadingComponent loading={loading}>
						<Button type='submit' variant='contained' color='primary'>
							Actualizar
						</Button>
					</LoadingComponent>
				</Grid>
			</Grid>
		</form>
	)
}