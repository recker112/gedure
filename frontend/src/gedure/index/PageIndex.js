import React, { useEffect } from 'react';

import { 
	Grid, 
	Container,
	Box,
	Slide,
	Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useFetch from '../../hooks/useFetch';

// Content
import BoxInfoRequest from './BoxInfoRequest';
import BoxInfoTitle from './BoxInfoTitle';
import converterCursoCode from '../../components/funciones/converterCursoCode';
import TourIndex from './TourIndex';
import { parseFloatToMoneyString } from '../../components/funciones/ParseString';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
	},
	header: {
		background: theme.palette.primary.main,
		height: 400,
		borderRadius: '0px 0px 15px 15px'
	},
	content: {
		position: 'relative',
		top: -80,
	}
}));

function Header() {
	const { name } = useSelector((state) => ({
		name: state.userData.user.name,
	}));
	
	return (
		<Container>
			<Grid container justify='space-between'>
				<Grid item xs>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize', md: 'h4.fontSize' }} className='text__bold--semi'>
						<Box color='secondary.main' component='span'>Hola</Box> {name},
					</Box>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize' }} className='text__bold--semi'>
						Bienveido a <Box color='secondary.main' component='span'>Gedure</Box>
					</Box>
				</Grid>
				<Grid item xs>
					<Box color='primary.contrastText' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize', md: 'h4.fontSize' }} className='text__bold--semi' align='right'>
						Versión del sistema
					</Box>
					<Box color='secondary.main' fontSize={{ xs: 'h6.fontSize', sm: 'h5.fontSize' }} className='text__bold--semi' align='right'>v5.0.0-Beta.0</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default function PageUserIndex() {
	document.title = 'La Candelaria - Gedure';
	
	const { privilegio, loading, data, balance } = useSelector((state) => ({
		privilegio: state.userData.user.privilegio,
		loading: state.forms.pageIndex.loading,
		data: state.forms.pageIndex.data,
		balance: state.userData.user.wallet.balance,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const classes = useStyles();
	
	useEffect(() => {
		const getInfo = async () => {
			const prepare = {
				url: 'v1/info-box',
				type: 'get',
				messageToFinish: false,
			};
			
			const response = await fetchData(prepare);
			
			let newData = response;
			if (response) {
				response.boletas && response.boletas.forEach((element, i) => {
					newData.boletas[i].textPrimary = `${converterCursoCode(element.curso)} ${element.seccion} - ${element.lapso}° Lapso`;
				});
			}
			dispatch(updateForms('pageIndex', false, newData));
		}
		
		getInfo();
		
		return () => {
			dispatch(updateForms('pageIndex', true, {}));
		}
		// eslint-disable-next-line
	},[]);
	
	return (
		<main className={classes.containerMain}>
			<Slide direction="down" in={true} timeout={1000} mountOnEnter unmountOnExit>
				<Grid container>
					<Grid container alignItems='center' item xs={12} className={classes.header}>
						<Header />
					</Grid>
				</Grid>
			</Slide>
			<Fade in={true} style={{ transitionDelay: '1000ms' }}>
				<Container>
					<Grid container justify='center' spacing={2} item xs={12} className={classes.content} data-tour='infoBox'>
						<BoxInfoRequest
							title='Últimas noticias'
							data={data?.posts}
							loading={loading}
						/>
						{(privilegio === 'V-') && (
							<React.Fragment>
								<BoxInfoRequest
									title='Últimas boletas cargadas'
									data={data?.boletas}
									loading={loading}
								/>
							</React.Fragment>
						)}
						<Grid container justify='center' spacing={2} item xs={12}>
							<BoxInfoTitle 
								title={parseFloatToMoneyString(balance || 0)}
								subTitle='Saldo en monedero'
								color={balance > 0 ? 'success.main' : null}
							/>
						</Grid>
					</Grid>
				</Container>
			</Fade>
			<TourIndex />
		</main>
	)
}