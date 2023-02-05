import React from 'react';

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import AnimationDialog from '../../../components/AnimationDialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Components
import DataAdminFAQText from './DataAdminFAQ';
import DataUserFAQText from './DataUserFAQ';

// Redux
import { useSelector } from 'react-redux';

/**
 * Renderizador de dialogs en preguntas frecuentes
 * @param {object} props Props react
 * @returns JSX.Element
 */
export function RenderDialog({ handleClose }) {
  const { dialog: { open, data }, privilegio } = useSelector(state => ({
    dialog: state.requestStatus.showFAQ,
    privilegio: state.auth.user.privilegio,
  }));

  /**
   * FullScreen
   */
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog open={open} TransitionComponent={AnimationDialog} fullScreen={fullScreen}>
      <DialogTitle>{data.title}</DialogTitle>
      <DialogContent>
        {privilegio === 'V-' && <DataUserFAQText sortTitle={data.sortTitle} />}
        {privilegio === 'A-' && <DataAdminFAQText sortTitle={data.sortTitle} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Entendido</Button>
      </DialogActions>
    </Dialog>
  );
}
