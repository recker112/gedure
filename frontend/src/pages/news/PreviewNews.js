// MUI
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// React Router
import { Link as RouterLink } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { updateNews } from '../../store/slices/news/show';

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
		url_portada,
	} = data;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateNews({loading: false, data}));
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper style={{background: url_portada ? `url("${url_portada}")` : '', backgroundSize: 'cover'}}>
        <Grid container sx={url_portada ? classes.withImg : classes.colorsito} className='paper--padding'>
          <Grid item xs={12}>
            <Typography>
							{title.length > 100 ? `${title.substring(0, 100)}...` : title}
						</Typography>
            <Typography className='text__opacity--semi'>
              Publicado {fecha_humano.search("-") === -1 ? fecha_humano : `el ${fecha_humano}`}
            </Typography>
          </Grid>
          <Grid container justifyContent='flex-end' alignItems='flex-end' item xs={12}>
            <IconButton onClick={handleClick} component={RouterLink} to={`${slug}`} sx={classes.button}>
							<ArrowForwardIcon />
						</IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
