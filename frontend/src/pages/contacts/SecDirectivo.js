import React, { useCallback } from 'react';

// MUI
import { Avatar, Grid, Typography } from '@mui/material';

// Components
import ardisImg from '../../img/directivo/ardis.png';
import erikaImg from '../../img/directivo/erika.jpeg';
import maryanImg from '../../img/directivo/maryan.png';
import padreJoseImg from '../../img/directivo/padre_jose.png';
import rafaelImg from '../../img/directivo/rafael.png';
import rhadysImg from '../../img/directivo/rhadys.png';
import mirtaImg from '../../img/directivo/mirta.jpeg';

const classes = {
  avatarLarge: {
    width: 56,
		height: 56,
  }
}

const BoxDirectivo = (props) => {
  const { avatar, nombre, cargo, alt } = props;
  
  return (
    <Grid container alignItems='center' item xs={12} sm={6} md={4}>
      <Grid item xs={3}>
        <Avatar 
          sx={classes.avatarLarge} 
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

export default function SecDirectivo() {
  const personas = [
		{
			avatar: padreJoseImg,
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
			avatar: rhadysImg,
			nombre: 'Rhadys Garcia',
			cargo: 'Sub-Directora Administrativa',
			alt: 'Foto de Rhadys Garcia'
		},
		{
			avatar: maryanImg,
			nombre: 'Maryan Trujillo',
			cargo: 'Sub-Directora Académica',
			alt: 'Foto de Maryan Trujillo'
		},
		{
			avatar: rafaelImg,
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
			avatar: erikaImg,
			nombre: 'Erika Arguinzone',
			cargo: 'Coordinadora de Pasantías',
			alt: 'Foto de Erika Arguinzone'
		},
		{
			avatar: ardisImg,
			nombre: 'Ardis Arteaga',
			cargo: 'Coordinadora de Pastoral',
			alt: 'Foto de Ardis Arteaga'
		},
		{
			avatar: mirtaImg,
			nombre: 'Mirta Lira',
			cargo: 'Coordinadora del Centro Taller Artesanal',
			alt: 'Foto de Mirta Lira'
		},
	];

  return (
		<>
			<Grid item xs={12}>
				<Typography className='text__bold--big' variant='h4'>
					Directivos
				</Typography>
			</Grid>
			<Grid container spacing={3} justify='center' item xs={12}>
				{personas.map(useCallback((data,i)=> (<BoxDirectivo key={i} {...data} />),[]))}
			</Grid>
		</>
	);
}
