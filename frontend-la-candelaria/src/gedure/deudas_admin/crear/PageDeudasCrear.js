import React from 'react';

import { useHistory } from 'react-router-dom';

import {
	Tooltip,
	Box,
	IconButton,
	Container,
	Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useForm, FormProvider } from "react-hook-form";

import useFetch from '../../../hooks/useFetch';

// Components
import MakeDeuda from './MakeDeuda';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import updateForms from '../../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		paddingBottom: theme.spacing(5),
		[theme.breakpoints.up('xs')]: {
			marginTop: '80px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(12),
		},
	},
}));

export default function PageDeudasCrear() {
	document.title = 'La Candelaria - Crear deudas';
	
	const { loading } = useSelector((state) => ({
		loading: state.forms.crearDeuda.loading,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const history = useHistory();
	
	const classes = useStyles();
	
	const methods = useForm({
		mode: 'onSubmit',
	});
	
	const handleBack = () => {
		history.push('/gedure/deudas');
	}
	
	const onSubmit = async submitData => {
		dispatch(updateForms('crearDeuda', true, {}));
		
		// Fix array users
		if (submitData.selected_users) {
			const users = submitData.selected_users.map(obj => obj.id);
			submitData.selected_users = users;
		}
		
		const prepare = {
			url: `v1/deuda/lote`,
			type: 'post',
			data: submitData,
		};
		
		const response = await fetchData(prepare);
		
		dispatch(updateForms('crearDeuda', false, {}));
	}
	
	return (
		<main className={classes.containerMain}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} autoComplete='off'>
					<Container>
						<Box mb={3}>
							<Tooltip title='Volver' arrow>
								<IconButton disabled={loading} onClick={handleBack} aria-label="volver">
									<ArrowBackIcon />
								</IconButton>
							</Tooltip>
						</Box>
						<MakeDeuda />
					</Container>
				</form>
			</FormProvider>
		</main>
	);
}