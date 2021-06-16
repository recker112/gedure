import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import {
	Button,
	MobileStepper,
	Box,
} from '@material-ui/core';

import useFetch from '../../hooks/useFetch';

import { useForm } from "react-hook-form";

// Components
import { PersonalEstudianteDataForm } from '../usuarios/show/personal-data/PersonalEstudianteData';
import { PersonalEstudianteUbiForm } from '../usuarios/show/personal-data/PersonalEstudianteUbi';
import { PersonalEstudianteOtrosForm } from '../usuarios/show/personal-data/PersonalEstudianteOtros';
import { PersonalRepresentanteDataForm } from '../usuarios/show/personal-data/PersonalRepresentanteData';
import { PersonalRepresentanteUbiForm } from '../usuarios/show/personal-data/PersonalRepresentanteUbi';
import { PersonalRepresentanteEmpleoForm } from '../usuarios/show/personal-data/PersonalRepresentanteEmpleo';
import { PersonalMadreForm } from '../usuarios/show/personal-data/PersonalMadre';
import { PersonalPadreForm } from '../usuarios/show/personal-data/PersonalPadre';
import LoadingComponent from '../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateSteppersActive from '../../actions/updateSteppersActive';
import updateDataUser from '../../actions/updateDataUser';

export default function SectionUser() {
	const { activeStep, loading, data } = useSelector((state) => ({
		activeStep: state.steppers.setup.active,
		loading: state.steppers.setup.loading,
		data: state.steppers.setup.data,
	}));
	const dispatch = useDispatch();
	
	const { control, handleSubmit, watch } = useForm({
		mode: 'onTouched',
		shouldUnregister: true,
	});
	const { fetchData } = useFetch();
	
	const history = useHistory();
	
	const handleNext = submitData => {
		dispatch(updateSteppersActive('setup', activeStep + 1, false, {
			personal_data: {
				...data.personal_data,
				...submitData.personalData,
			}
		}));
  };
	
	const handleBack = () => {
		dispatch(updateSteppersActive('setup', activeStep - 1));
  };
	
	useEffect(() => {
		const submitRequest = async () => {
			dispatch(updateSteppersActive('setup', null, true));
			
			// Parse data
			if (data.personal_data.estudi_nacionalidad !== 'V') {
				data.personal_data.estudi_nacimiento_estado = null;
			}
			
			if (data.personal_data.estudi_otros_alojado === 'Si') {
				data.personal_data.estudi_otros_direccion = null;
			}
			
			if (data.personal_data.repre_nacionalidad === 'E') {
				data.personal_data.repre_ubi_estado = null;
				data.personal_data.repre_ubi_municipio = null;
				data.personal_data.repre_ubi_parroquia = null;
				data.personal_data.repre_ubi_via = null;
			}
			
			if (data.personal_data.repre_empleo === 'No') {
				data.personal_data.repre_empleo_profesion = null;
				data.personal_data.repre_empleo_lugar = null;
			}
			
			const prepare = {
				url: `v1/user`,
				type: 'post',
				data: {
					personalData: {
						...data.personal_data
					},
					_method: 'PUT',
				},
				messageToFinish: false,
			};

			const response = await fetchData(prepare);

			if (response) {
				dispatch(updateDataUser({
					user: response.user,
				}));

				history.push('/gedure');
				
				dispatch(updateSteppersActive('setup', 0, false));
			}else {
				dispatch(updateSteppersActive('setup', null, false));
			}
		}
			
		if (activeStep > 2) {
			submitRequest();
		}
		// eslint-disable-next-line
	},[activeStep]);
	 
	return (
		<React.Fragment>
			{activeStep === 0 && (
				<React.Fragment>
					<Box mb={4}>
						<PersonalEstudianteDataForm 
							onSubmit={null}
							control={control}
							loading={loading}
							watch={watch}
							user={data}
							buttonDisable
						/>
					</Box>
					<Box mb={4}>
						<PersonalEstudianteUbiForm
							onSubmit={null}
							control={control}
							loading={loading}
							watch={watch}
							user={data}
							buttonDisable
						/>
					</Box>
					<Box mb={4}>
						<PersonalEstudianteOtrosForm
							onSubmit={null}
							control={control}
							watch={watch}
							loading={loading}
							user={data}
							buttonDisable
						/>
					</Box>
				</React.Fragment>
			)}
			{activeStep === 1 && (
				<React.Fragment>
					<Box mb={4}>
						<PersonalRepresentanteDataForm
							onSubmit={null}
							control={control}
							loading={loading}
							user={data}
							buttonDisable
						/>
					</Box>
					{(watch('personalData.repre_nacionalidad', '') !== 'E') && (
						<Box mb={4}>
							<PersonalRepresentanteUbiForm 
								onSubmit={null}
								control={control}
								watch={watch}
								loading={loading}
								user={data}
								buttonDisable
							/>
						</Box>
					)}
					<Box mb={4}>
						<PersonalRepresentanteEmpleoForm 
							onSubmit={null}
							control={control}
							watch={watch}
							loading={loading}
							user={data}
							buttonDisable
						/>
					</Box>
				</React.Fragment>
			)}
			{activeStep >= 2 && (
				<React.Fragment>
					<Box mb={4}>
						<PersonalMadreForm 
							onSubmit={null}
							control={control}
							loading={loading}
							user={data}
							buttonDisable
						/>
					</Box>
					<Box mb={4}>
						<PersonalPadreForm 
							onSubmit={null}
							control={control}
							loading={loading}
							user={data}
							buttonDisable
						/>
					</Box>
				</React.Fragment>
			)}
			<MobileStepper 
				variant='dots'
				steps={3}
				position='static'
				activeStep={activeStep}
				nextButton={
					<LoadingComponent loading={loading}>
						<Button 
							variant='contained' 
							color='primary' 
							onClick={handleSubmit(handleNext)}
							disableElevation
						>
							{activeStep >= 2 ? 'Activar cuenta' : 'Siguiente'}
						</Button>
					</LoadingComponent>
				}
				backButton={
					<Button 
						variant='contained'
						color='primary' 
						disableElevation 
						onClick={handleBack}
						disabled={activeStep === 0 || loading}
					>
						Regresar
					</Button>
				}
			/>
		</React.Fragment>
	);
}