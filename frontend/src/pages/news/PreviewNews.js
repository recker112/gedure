// MUI
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// React Router
import { Link as RouterLink } from 'react-router-dom';

const classes = {
	colorsito: (theme) => ({
		backgroundColor: theme.palette.secondary.main,
		height: 200,
		color: theme.palette.secondary.contrastText,
	}),
  withImg: (theme) => ({
		backgroundColor: theme.palette.secondary.main + 'A9',
		height: 200,
		color: theme.palette.secondary.contrastText,
	}),
  button: (theme) => ({
    color: theme.palette.secondary.contrastText,
  }),
};

export default function PreviewNews({ data }) {
  const { 
		title,
		slug,
		fecha_humano,
    created_at,
		url_portada,
	} = data;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper style={{background: url_portada ? `url("${url_portada}")` : '', backgroundSize: 'cover'}}>
        <Grid container sx={url_portada ? classes.withImg : classes.colorsito} className='paper--padding'>
          <Grid item xs={12}>
            <Typography>
							{title.length > 100 ? `${title.substring(0, 100)}...` : title}
						</Typography>
            <Typography className='text__opacity--semi'>
              Publicado {fecha_humano ? fecha_humano : `el ${created_at}`}
            </Typography>
          </Grid>
          <Grid container justifyContent='flex-end' alignItems='flex-end' item xs={12}>
            <IconButton component={RouterLink} to={`${slug}`} sx={classes.button}>
							<ArrowForwardIcon />
						</IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
