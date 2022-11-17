import React, { useEffect } from 'react';

// MUI
import { Grid } from '@mui/material';

// Components
import ChangeDebtPrice from './ChangeDebtPrice';

import { useDispatch } from 'react-redux';
import { resetDataRequest } from '../../../../store/slices/requestStatus';
import { getConfigs } from '../../../../store/slices/requestStatus/async_trunk/configuracion/general/getConfigs';

export default function GCHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    let promise = null;

    promise = dispatch(getConfigs());

    return () => {
      promise && promise.abort();
      dispatch(resetDataRequest({ select: 'getConfigs' }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2} sx={{marginBottom: 6}}>
      <Grid item xs={12}>
        <ChangeDebtPrice />
      </Grid>
    </Grid>
  )
}


