import React from 'react';

// MUI
import { Grid } from '@mui/material';

// Loading
import ReactLoading from 'react-loading';

// Componentes
import logoL from '../../img/Farvicon_no_fondo.png';
import logoD from '../../img/Farvicon_no_fondo_white.png';

// Redux
import { useSelector } from "react-redux";

const classes = {
  loading: {
		flexGrow: 1
	},
}

export default function Loader(){
	const theme = useSelector((state) => state.configs.tema);
	
	return (
		<Grid container direction='column' justifyContent='center' alignItems='center' sx={classes.loading}>
			{theme === 'light' ? 
				(
				<React.Fragment>
					<img src={logoL} alt='Logo de la institución' className='loading__img' />
					<ReactLoading type="bars" color="#00000080" width={150} height={100} />
				</React.Fragment>
				)
			:
				(
				<React.Fragment>
					<img src={logoD} alt='Logo de la instituciรณn' className='loading__img' />
					<ReactLoading type="bars" color="#FFFFFF80" width={150} height={100} />
				</React.Fragment>
				)
			}
		</Grid>
	)
}