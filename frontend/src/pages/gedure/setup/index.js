import React, { useEffect } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// MUI
import { Box, Container } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from 'date-fns/locale/es';

// Components
import useNotifier from '../../../hooks/useNotifier';
import SectionUser from './SectionUser';

// Redux
import { useSelector } from 'react-redux';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function Setup() {
  document.title = 'Setup - La Candelaria';
  useNotifier();

  let navigate = useNavigate();

  const { privilegio, actived_at } = useSelector((state) => ({
		privilegio: state.auth.user.privilegio,
    actived_at: state.auth.user.actived_at,
	}));

  useEffect(() => {
		if (actived_at) {
			navigate('/gedure');
		}
		
		// eslint-disable-next-line
  }, [actived_at])

  return (
    <Box component='main' sx={classes.container}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
        <Container>
          <Box fontSize='h4.fontSize' mb={2} textAlign='center'>
						Antes de empezar necesitamos algunos datos...
					</Box>
          {(privilegio === 'V-') && (
						<SectionUser />
					)}
        </Container>
      </LocalizationProvider>
    </Box>
  )
}