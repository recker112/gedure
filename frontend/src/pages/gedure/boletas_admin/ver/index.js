import React, { useEffect } from 'react'

// Router
import { useNavigate, useParams } from 'react-router-dom';

// MUI
import { Box, CircularProgress, Container, Grid, IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Components
import Boleta from "./Boleta";
import useNotifier from '../../../../hooks/useNotifier';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getDataBV, setLoadingBV } from '../../../../store/slices/gedure/boletas_admin/ver';

const classes = {
  container: {
    flexGrow: 1,
    paddingBottom: 6,
    marginTop: { xs: "80px", sm: 12 },
  },
};

export default function VerBoleta() {
  document.title = 'Boletas - La Candelaria';
  const { id } = useParams();
  useNotifier();

  const { loading, data } = useSelector(state => state.gdBVerForm.getData);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  console.log(data);

  const handleReturn = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/gedure/publicaciones");
    }
  };

  const handleRefresh = () => {
    dispatch(setLoadingBV({ loading: true, select: 'getData' }))
  }

  useEffect(() => {
    dispatch(getDataBV(id));

    // eslint-disable-next-line
  }, []);

  return (
    <Box component='main' sx={classes.container}>
      <Container>
        <Box mb={3}>
          <Grid container>
            <Tooltip title="Volver" arrow>
              <IconButton
                disabled={loading}
                onClick={handleReturn}
                aria-label="return"
                component='span'
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Box>
        {loading && (
					<Box textAlign='center'>
						<CircularProgress />
					</Box>
				)}
        {(!loading && data.boletas.length) ? (
					<React.Fragment>
						<Box fontSize='h4.fontSize' mb={3} className='text__bold--big'>
							Boletas subidas de {data.user}
						</Box>
						<Grid container spacing={2}>
							{data.boletas.map((props, key) => (<Boleta key={key} {...props} handleRefresh={handleRefresh} />))}
						</Grid>
					</React.Fragment>
				) : null}
        {(!loading && !data.boletas.length) && (
					<Box align='center' fontSize='body1.fontSize'>
						No hay boletas cargadas para este estudiante.
					</Box>
				)}
      </Container>
    </Box>
  )
}
