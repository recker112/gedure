import { Grid, Paper, Typography } from '@mui/material';

const classes = {
	colorsito: (theme) => ({
		backgroundColor: theme.palette.secondary.main,
		height: 200,
		color: theme.palette.secondary.contrastText,
	}),
};

export default function PreviewNews() {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper sx={classes.colorsito} className='paper--padding'>
        <Typography>
          Título
        </Typography>
        <Typography color='text.secondary'>
          Publicado
        </Typography>
      </Paper>
    </Grid>
  )
}
