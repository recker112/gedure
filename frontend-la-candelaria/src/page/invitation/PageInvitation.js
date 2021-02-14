import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { 
	Container,
	CircularProgress,
	Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useFetch from '../../hooks/useFetch';

// Components
import FormRegisterPassword from './FormRegisterPassword';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

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

export default function PageInvitation() {
	document.title = 'La Candelaria - Invitación';
	const { loading, data } = useSelector((state) => ({
		loading: state.forms.invitation.loading,
		data: state.forms.invitation.data,
	}));
	const dispatch = useDispatch();
	const { key } = useParams();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	useEffect(()=>{
		const getUser = async () => {
				const prepare = {
				url: `v1/invitation/user/${key}`,
				type: 'get',
				message404: 'Invitación inválida',
				messageToFinish: false,
			};

			const response = await fetchData(prepare);

			dispatch(updateForms('invitation', false, response));
		}
		
		getUser();
		
		// eslint-disable-next-line
	},[]);
	
	return (
		<main className={classes.containerMain}>
			<Container maxWidth='md'>
				{loading && (
					<Box align='center'>
						<CircularProgress />
					</Box>
				)}
				{(!loading && data.name) && (
					<FormRegisterPassword invitationKey={key} />
				)}
			</Container>
		</main>
	);
}