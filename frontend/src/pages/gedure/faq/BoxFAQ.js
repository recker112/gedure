import React, { useEffect, useMemo } from 'react';

// Router
import { useSearchParams } from 'react-router-dom';

// MUI
import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';

// Components
import { dataFAQA } from './DataAdminFAQ';
import { RenderDialog } from './RenderDialog';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../../store/slices/requestStatus';
import { dataFAQV } from './DataUserFAQ';

const classes = {
  paper: {
    cursor: 'pointer',
    transition: '0.5s',
    '&:hover': {
      transform: 'scale(1.05)',
    }
  }
}

export function BoxFAQ({ value }) {
  let [searchParams] = useSearchParams();

  const { privilegio } = useSelector((state) => ({
    privilegio: state.auth.user.privilegio,
  }));
  const dispatch = useDispatch();

  /**
   * Obtener box a mostrar
   */
  const FAQ = useMemo(() => {
    if (privilegio === 'V-') {
      return dataFAQV;
    } else if (privilegio === 'A-') {
      return dataFAQA;
    }
  }, [privilegio]);

  /**
   * Abrir dialog
   * @param {object} item Data a enviar al redux
   */
  const handleOpen = (item) => {
    let data = {...item};
    delete data.icon;
    dispatch(setRequestStatus({open: true, data, select: 'showFAQ'}));
  }

  /**
   * Cerrar dialog
   */
  const handleClose = () => {
    dispatch(setRequestStatus({open: false, select: 'showFAQ'}));
  }

  /**
   * Verificar si se está pidiendo mostrar algún faq en específico.
   */
  useEffect(() => {
    if (typeof searchParams.get('faq') === 'string' && typeof FAQ[searchParams.get('faq' )] === 'object') {
      let data = {...FAQ[searchParams.get('faq' )]};
      delete data.icon;
  
      dispatch(setRequestStatus({open: true, data, select: 'showFAQ'}));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2}>
      {Object.keys(FAQ).map((key, i) => {
        if (value === 'all' || value === FAQ[key].type) {
          return (
            <Grid item xs={12} sm={4} md={3} key={i}>
              <Paper className='paper--padding' sx={classes.paper} onClick={() => handleOpen(FAQ[key])}>
                <Box display='flex' justifyContent='center' mb={1}>
                  <Avatar
                    sx={{ width: 56, height: 56, bgcolor: FAQ[key].color }}
                    variant="rounded"
                  >
                    {FAQ[key].icon}
                  </Avatar>
                </Box>
                <Typography variant='body1' textAlign='center' className='text__bold--semi'>
                  {FAQ[key].sortTitle}
                </Typography>
              </Paper>
            </Grid>
          )
        }

        return null;
      })}
      <RenderDialog
        handleClose={handleClose}
      />
    </Grid>
  );
}

