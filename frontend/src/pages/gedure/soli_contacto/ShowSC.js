import React from 'react';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// Components
import AnimationDialog from '../../../components/AnimationDialog';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatus';

export default function ShowSC() {
  const { open, data } = useSelector(state => state.requestStatus.verSoliContacto);
   const dispatch = useDispatch();

   const handleClose = () => {
    dispatch(setRequestStatus({open: false, select: 'verSoliContacto'}));
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
