import React from 'react';

import {
	Grid,
	Button,
	Box,
} from '@material-ui/core';

import useFetch from '../../../hooks/useFetch';

// Components
import LoadingComponent from '../../../components/LoadingComponent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../actions/updateForms';
import logoutApp from '../../../actions/logoutApp';

export default function LogoutAll() {
	const { loading } = useSelector((state) => ({
		loading: state.forms.logoutAll.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const onSubmit = async () => {
		dispatch(updateForms('logoutAll', true));
		
		const prepare = {
			url: 'v1/logoutAll',
			type: 'post',
			variant: 'info',
		};

		const response = await fetchData(prepare);
		
		if (response) {
			dispatch(logoutApp());
		}
		
		dispatch(updateForms('logoutAll', false));
	}
	
	return (
		<React.Fragment>
			<Grid item xs={12} sm={8}>
				<Box fontSize='h5.fontSize' className='text__bold--semi'>
					Salir en todos los dispositivos
				</Box>
				<Box fontSize='body1.fontSize' color='text.secondary'>
					Cerrar sesión en todos los dispositivos activos
				</Box>
			</Grid>
			<Grid container justify='flex-end' alignItems='center' item xs={12} sm={4}>
				<LoadingComponent loading={loading}>
					<Button 
						variant='contained' 
						color='primary' 
						disableElevation
						onClick={onSubmit}
					>
						Salir
					</Button>
				</LoadingComponent>
			</Grid>
		</React.Fragment>
	);
}