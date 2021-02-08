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
import LoadingComponent from '../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';
import updateSteppersActive from '../../actions/updateSteppersActive';
import updateDataUser from '../../actions/updateDataUser';

export default function SectionUser() {
	const { activeStep, loading, data } = useSelector((state) => ({
		activeStep: state.settings.steppers.active,
		loading: state.forms.setup.loading,
		data: state.forms.setup.data,
	}));
	const dispatch = useDispatch();
	
	const { register, control, errors, handleSubmit, watch } = useForm({
		mode: 'onTouched',
	});
	const { fetchData } = useFetch();
	
	const history = useHistory();
	
	const handleNext = submitData => {
		dispatch(updateForms('setup', false, {
			personal_data: {
				...data.personal_data,
				...submitData.personalData,
			}
		}));
		
		dispatch(updateSteppersActive(activeStep + 1));
  };
	
	const handleBack = () => {
		dispatch(updateSteppersActive(activeStep - 1));
  };
	
	useEffect(() => {
		const submitRequest = async () => {
			dispatch(updateForms('setup', true));
			
			// Parse data
			if (data.personal_data.estudi_nacionalidad !== 'V') {
				data.personal_data.estudi_nacimiento_estado = null;
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
					permissions: response.permissions,
				}));
				console.log(response);

				history.push('/gedure');
			}

			dispatch(updateForms('setup', false));
			dispatch(updateSteppersActive(0));
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
							register={register}
							errors={errors}
							control={control}
							loading={loading}
							watch={watch}
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
							Siguiente
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