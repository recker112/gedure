import React from 'react';

// React Router
import { NavLink } from "react-router-dom";

// MUI
import { CircularProgress, Divider, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function NotiBox({ data, loading, title, icon }) {
  return (
    <Paper className='paper--padding' elevation={3}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Stack alignItems='center' direction="row" spacing={2}>
            {icon}
            <Typography variant='h6' className='text__bold--semi'>
              {title}
            </Typography>
          </Stack>
        </Grid>
        {loading && (
          <Grid textAlign='center' item xs={12}>
            <CircularProgress />
          </Grid>
        )}
        {(!data?.length && !loading) && (
          <Grid container justifyContent='center' item xs={12}>
            <Typography>No hay nada que mostrar.</Typography>
          </Grid>
        )}
        {(data && !loading) && data.map((item, i) => (
          <React.Fragment key={i}>
            <Grid container justifyContent='space-between' alignItems='center' item xs={12}>
              <Grid item xs={9} md={10}>
                <Typography className='text__bold--semi' noWrap>
                  {item.textPrimary}
                </Typography>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  {item.textSecondary}
                </Typography>
              </Grid>
              {item.url && (
                <Grid container justifyContent='flex-end' item xs>
                  <IconButton component={NavLink} to={`/noticias/${item.url}`} state={{ backPanel: true }}>
                    <ArrowForwardIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
            {(data[i+1]) && (
              <Grid item xs={12}>
                <Divider />
              </Grid>
            ) }
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
}
