import React from 'react';

// MUI
import { CircularProgress, Divider, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function NotiBox(props) {
  const { data, loading } = props;

  return (
    <Grid item xs={12} sm={6}>
      <Paper className='paper--padding' elevation={3}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Stack alignItems='center' direction="row" spacing={2}>
              <NewspaperIcon />
              <Typography variant='h6' className='text__bold--semi'>
                Últimas noticias
              </Typography>
            </Stack>
          </Grid>
          {loading && (
            <Grid textAlign='center' item xs={12}>
              <CircularProgress />
            </Grid>
          )}
          {/*Nota(RECKER): Reccorrer items*/}
          {(data && !loading) && data.map((item, i) => (
            <React.Fragment key={i}>
              <Grid container justifyContent='space-between' alignItems='center' item xs={12}>
                <Grid item xs={9} md={10}>
                  <Typography className='text__bold--semi' noWrap>
                    {item.textPrimary}
                  </Typography>
                  <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                    {item.textSecondary.slice(3)}
                  </Typography>
                </Grid>
                <Grid container justifyContent='flex-end' item xs>
                  <IconButton>
                    <ArrowForwardIcon />
                  </IconButton>
                </Grid>
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
    </Grid>
  );
}
