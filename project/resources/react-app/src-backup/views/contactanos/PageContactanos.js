import React, { useCallback } from 'react';

import { 
	Container, 
	Typography, 
	Grid, 
	Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import FooterText from '../../components/FooterText';
import AjaxBox from '../../components/AjaxBox';
import FormContact from './FormContact';
import GoogleMaps from './GoogleMaps';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	containerMain: {
		flexGrow: 1,
		
		marginBottom: theme.spacing(6),
		[theme.breakpoints.up('xs')]: {
			marginTop: '48px',
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(8),
		},
	},
	avatarLarge: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	}
}));

function SectionDirection() {
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big' variant='h4'>
					Dirección
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Typography variant='body1'>
					Localidad: Turmero (Lat: 10° 14'26''N;Long: 67° 28' 24''O)
					<br/>
					Alt: 446 msnm; Sup: 10Km2
					<br/>
					Parroquia: Capital Turmero
					<br/>
					Municipio: Santiago Mariño
					<br/>
					Dirección: Av. Bolivar N°9
					<br/>
					Norte: Av. Bolivar interceptada con la calle Páez
					<br/>
					Sur: Av. Mariño
					<br/>
					Este: Calle Camilo Torrres
					<br/>
					Oeste: Calle Ribas - Plaza Mariño de Turmero
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6}>
				<GoogleMaps />
			</Grid>
		</React.Fragment>
	);
}

function SectionDirectivo() {
	const classes = useStyles();
	
	const BoxDirectivo = (props) => {
		const { avatar, nombre, cargo, alt } = props;
		
		return (
			<Grid container alignItems='center' item xs={12} sm={6} md={4}>
				<Grid item xs={3}>
					<Avatar 
						className={classes.avatarLarge} 
						alt={alt} 
						src={avatar}
					/>
				</Grid>
				<Grid item xs>
					<Typography className='text__bold--big' variant='h6'>
						{nombre}
					</Typography>
					<Typography className='text__opacity--semi text__bold--big' variant='body1'>
						<i>{cargo}</i>
					</Typography>
				</Grid>
			</Grid>
		);
	}
	
	const personas = [
		{
			avatar: null,
			nombre: 'José Bracamonte',
			cargo: 'Director General',
			alt: 'Foto de José Bracamonte'
		},
		{
			avatar: null,
			nombre: 'Roberto Puerta',
			cargo: 'Director Académico',
			alt: 'Foto de Roberto Puerta'
		},
		{
			avatar: null,
			nombre: 'Rhadys Garcia',
			cargo: 'Sub-Directora Administrativa',
			alt: 'Foto de Rhadys Garcia'
		},
		{
			avatar: null,
			nombre: 'Maryan Trujillo',
			cargo: 'Sub-Directora Académica',
			alt: 'Foto de Maryan Trujillo'
		},
		{
			avatar: null,
			nombre: 'Rafael Ortiz',
			cargo: 'Coordinador de Control de Estudios',
			alt: 'Foto de Rafael Ortiz'
		},
		{
			avatar: null,
			nombre: 'Maria Puerta',
			cargo: 'Coordinadora de Evaluación',
			alt: 'Foto de Maria Puerta'
		},
		{
			avatar: null,
			nombre: 'Erika Arguinzone',
			cargo: 'Coordinadora de Pasantías',
			alt: 'Foto de Erika Arguinzone'
		},
		{
			avatar: null,
			nombre: 'Ardis Arteaga',
			cargo: 'Coordinadora de Pastoral',
			alt: 'Foto de Ardis Arteaga'
		},
	];
	
	return (
		<React.Fragment>
			<Grid item xs={12}>
				<Typography className='text__bold--big' variant='h4'>
					Directivos
				</Typography>
			</Grid>
			<Grid container spacing={3} justify='center' item xs={12}>
				{personas.map(useCallback((data,i)=> (<BoxDirectivo key={i} {...data} />),[]))}
			</Grid>
		</React.Fragment>
	);
}

function PageContactanos() {
	const { auth, status } = useSelector((state) => ({
		auth: state.userData.auth,
		status: state.forms.contacto.status,
	}));
	
	const classes = useStyles();
	
	return (
		<React.Fragment>
			<main className={classes.containerMain} ref={()=>{
					document.title = 'La Candelaria - Contáctanos';
				}}>
				<Container maxWidth='md' className='container--margin'>
					{!status && (
						<Grid container spacing={2} justify='center'>
							<SectionDirection />
							<SectionDirectivo />
							{!auth && (
								<Grid item xs={12}>
									<FormContact />
								</Grid>
							)}
						</Grid>
					)}
					{(status && status === '422') && (
						<AjaxBox 
							title='Solicitud rechazada'
							content='Ya hay un mensaje en nuestra lista, por favor espere a que nos comuniquemos con usted antes de enviar otro mensaje.'
							form='contacto'
							error={true}
						/>
					)}
					{(status && status === '200') && (
						<AjaxBox 
							title='Mensaje enviado'
							content='Su mensaje fue enviado exitosamente, nos comunicaremos con usted lo antes posible.'
							form='contacto'
						/>
					)}
				</Container>
			</main>
			{!auth && (
				<footer className='footer'>
					<FooterText />
				</footer>
			)}
		</React.Fragment>
	);
}

export default PageContactanos;