import React, { useEffect } from 'react';

// Router
import { useParams } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserInvitacion } from '../../store/slices/requestStatus/async_trunk/invitacion/getUserInvitacion';
import { setRequestStatus } from '../../store/slices/requestStatus';
import useNotifier from '../../hooks/useNotifier';
import InvitationForm from './InvitationForm';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 10,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function InvitationPage() {
  document.title = 'Invitación - La Candelaria';
  const { key } = useParams();
  useNotifier();

	const { loading, data } = useSelector((state) => ({
		loading: state.requestStatus.invitation.loading,
		data: state.requestStatus.invitation.data,
	}));
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      dispatch(getUserInvitacion(key));
    }

    return () => {
      dispatch(setRequestStatus({ select: 'invitation', loading: true, data: {} }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={classes.container} component='main'>
      <Container maxWidth='md'>
        {loading && (
					<Box textAlign='center'>
						<CircularProgress />
					</Box>
				)}
        {(!loading && data.name) && (
          <InvitationForm invitationKey={key} />
				)}
				{(!loading && !data.name) && (
					<Box fontSize='body1.fontSize' textAlign='center'>
						No se pudo obtener la invitación, por favor intente mas tarde...
					</Box>
				)}
      </Container>
    </Box>
  )
}
