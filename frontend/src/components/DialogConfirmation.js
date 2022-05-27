import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

// Components
import AnimationDialog from './AnimationDialog'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import LoadingButton from '@mui/lab/LoadingButton';

export default function DialogConfirmation({ rdx1, rdx2, close, request, children }) {
  const { open, loading, data } = useSelector(state => state[rdx1][rdx2]);
  const dispatch = useDispatch();

  const handleRequest = () => {
    dispatch(request(data));
  }

  const handleClose = () => {
    dispatch(close);
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={AnimationDialog}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle>¿Está seguro?</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {children(data)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
				<Button disabled={loading} onClick={handleClose} color="inherit">
					Cancelar
				</Button>
        <LoadingButton onClick={handleRequest} loading={loading} color="inherit">
          Confirmar
        </LoadingButton>
			</DialogActions>
    </Dialog>
  )
}