import React from 'react';

import { 
	Grid,
	Box,
	Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useFormContext } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
	paperSelected: {
		backgroundColor: theme.palette.primary.main,
	},
}));

export default function SelectType() {
	
	return (
		<Grid container spacing={2} item xs={12}>
			<Grid item xs={12} sm={6}>
				<Paper className='paper--padding'>
					<Box fontSize='h6.fontSize' className='text__bold--semi' mb={2}>Manual</Box>
					<Box fontSize='body1.fontSize' className='text__bold--semi text__opacity--semi' mb={3}>
						Usted creará la contraseña manualmente y completará los campos necesarios para que la cuenta pueda ser usada.
					</Box>
				</Paper>
			</Grid>
			
			<Grid item xs={12} sm={6}>
				<Paper className='paper--padding'>
					<Box fontSize='h6.fontSize' className='text__bold--semi' mb={2}>Invitación</Box>
					<Box fontSize='body1.fontSize' className='text__bold--semi text__opacity--semi' mb={3}>
						El sistema enviará una invitaciónpor correo, dejando el trabajo de completar los datos al usuario
					</Box>
				</Paper>
			</Grid>
		</Grid>
	)
}