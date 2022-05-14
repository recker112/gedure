import React, { useEffect } from 'react';

// Router
import { useSearchParams } from "react-router-dom";

// MUI
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';

// Redux
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/auth';

const classes = {
 container: {
  flexGrow: 1,
  marginTop: { xs: "80px", sm: 12 },
 },
}

export default function Logout() {
 let [searchParams] = useSearchParams();

 const dispatch = useDispatch();

 useEffect(() => {

  dispatch(logout(searchParams.get('drivers')));
  // eslint-disable-next-line
 }, []);

 return (
  <Box component='main' sx={classes.container}>
   <Container>
    <Grid container spacing={2}>
     <Grid textAlign='center' item xs={12}>
      <Typography>Saliendo del sistema, espere un momento por favor...</Typography>
     </Grid>
     <Grid textAlign='center' item xs={12}>
      <CircularProgress />
     </Grid>
    </Grid>
   </Container>
  </Box>
 )
}
