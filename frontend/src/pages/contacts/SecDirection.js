import { Grid, Typography } from '@mui/material'

// Components
import GoogleMaps from './GoogleMaps';

export default function SecDirection() {
  return (
    <>
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
    </>
  )
}
