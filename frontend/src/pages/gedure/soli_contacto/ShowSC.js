import React from 'react';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// Components
import AnimationDialog from '../../../components/AnimationDialog';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSeeBoxSCT } from '../../../store/slices/gedure/soli_contacto/index.js';

export default function ShowSC() {
  const { open, data } = useSelector(state => state.gdSCTable.seeBox);
   const dispatch = useDispatch();

   const handleClose = () => {
    dispatch(setSeeBoxSCT({open: false}));
   }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      fullWidth={true}
      maxWidth='xs'
      TransitionComponent={AnimationDialog}
    >
			<DialogTitle>Solicitud #{data.id}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<strong>Nombre:</strong> {data.nombre}
					<br />
					<strong>Asunto:</strong> {data.asunto}
					<br />
					<strong>Correo:</strong> {data.email}
					<br />
					<strong>Teléfono:</strong> {data.telefono}
					<br />
					<strong>Fecha de solicitud:</strong> {data.created_at}
					<br />
					<br />
					<strong>Mensaje:</strong>
					<br />
					{data.content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='inherit'>
					Entendido
				</Button>
			</DialogActions>
		</Dialog>
  )
}
