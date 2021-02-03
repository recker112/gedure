import React from 'react';

import {
	Grid,
	Button,
	Box,
} from '@material-ui/core';

import useFetch from '../../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';

export default function ReenviarInvitacion({ id }) {
	const { actived_at, loading } = useSelector((state) => ({
		actived_at: state.forms.showUser.data.user.actived_at,
		loading: state.forms.resendEmail.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async () => {
		dispatch(updateForms('resendEmail', true));
		
		const prepare = {
			url: `v1/invitation/resend-email/${id}`,
			type: 'get',
			message404: 'El usuario ya no existe'
		};

		// eslint-disable-next-line
		const response = await fetchData(prepare);
		
		dispatch(updateForms('resendEmail', false));
	}
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={8}>
				<Box fontSize='h5.fontSize' className='text__bold--semi'>
					Reenviar invitación
				</Box>
				<Box fontSize='body1.fontSize' color='text.secondary'>
					solo disponible si el estudiante no se ha registrado
				</Box>
			</Grid>
			<Grid container justify='flex-end' alignItems='center' item xs={12} sm={4}>
				<LoadingComponent loading={loading}>
					<Button 
						disabled={actived_at} 
						variant='contained' 
						color='primary' 
						disableElevation
						onClick={onSubmit}
					>
						Reenviar
					</Button>
				</LoadingComponent>
			</Grid>
		</React.Fragment>
	);
}