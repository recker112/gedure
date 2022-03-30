import React from 'react';

// MUI
import { Divider, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function NotiBox() {
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
          <Grid container justifyContent='space-between' alignItems='center' item xs={12}>
            <Grid item xs={9} md={10}>
              <Typography className='text__bold--semi' noWrap>
                Text primary aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </Typography>
              <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                Text Secondary
              </Typography>
            </Grid>
            <Grid container justifyContent='flex-end' item xs>
              <IconButton>
                <ArrowForwardIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container justifyContent='space-between' alignItems='center' item xs={12}>
            <Grid item xs={9} md={10}>
              <Typography className='text__bold--semi' noWrap>
                Text primary aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </Typography>
              <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                Text Secondary
              </Typography>
            </Grid>
            <Grid container justifyContent='flex-end' item xs>
              <IconButton>
                <ArrowForwardIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container justifyContent='space-between' alignItems='center' item xs={12}>
            <Grid item xs={9} md={10}>
              <Typography className='text__bold--semi' noWrap>
                Text primary aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </Typography>
              <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                Text Secondary
              </Typography>
            </Grid>
            <Grid container justifyContent='flex-end' item xs>
              <IconButton>
                <ArrowForwardIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
