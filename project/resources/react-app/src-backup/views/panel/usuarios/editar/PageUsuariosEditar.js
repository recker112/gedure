import React from 'react';

import { useParams } from 'react-router-dom';

import { 
	Container,
	Grid,
	Tabs,
	Tab,
	Box,
	Button,
	Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import ShowLocation from '../../../../components/ShowLocation';
import TabUserData from './TabUserData';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateForms from '../../../../actions/updateForms';

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
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	}
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`showUser-tabpanel-${index}`}
			aria-labelledby={`showUser-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
  return {
    id: `showUser-tab-${index}`,
    'aria-controls': `showUser-tabpanel-${index}`,
  };
}

function PageUsuariosEditar() {
	const [value, setValue] = React.useState(0);

	let { user_id } = useParams();
	
	const classes = useStyles();
	
	const handleChange = (event, newValue) => {
    setValue(newValue);
  };
	
	return(
		<main className={classes.containerMain} ref={()=>{
			document.title = 'La Candelaria - Editar usuario';
		}}>
			<Container maxWidth='md' className='container--margin'>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ShowLocation />
					</Grid>
					<Grid item xs={12}>
						<Tabs 
							value={value} 
							indicatorColor="primary"
    					textColor="primary"
							onChange={handleChange} 
							aria-label="Editar usuario tabs"
						>
							<Tab label="Datos de la cuenta" {...a11yProps(0)} />
							<Tab label="Datos personales" {...a11yProps(1)} />
							<Tab label="Correo" {...a11yProps(2)} />
							<Tab label="Contraseña" {...a11yProps(3)} />
						</Tabs>
					</Grid>
					<Grid item xs={12}>
						<TabPanel value={value} index={0}>
							<TabUserData />
						</TabPanel>
						<TabPanel value={value} index={1}>
							Datos personales
						</TabPanel>
						<TabPanel value={value} index={2}>
							Correo
						</TabPanel>
						<TabPanel value={value} index={3}>
							Contraseña
						</TabPanel>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}

export default PageUsuariosEditar;