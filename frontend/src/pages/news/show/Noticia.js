import React from 'react';

// MUI
import { Container, Divider, Grid, Typography } from '@mui/material';

// Markdown
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { renderersMarkdown } from '../../../components/ComponentsMarkdown';

// Redux
import { useSelector } from 'react-redux';
import RenderGalery from './RenderGalery';

const classes = {
  divider: { 
    marginTop: 3, 
    marginBottom: 3,
  },
  portada: {
    marginTop: 3, 
    marginBottom: 3,
  }
}

export default function Noticia(props) {
  const {
		title,
		content,
		fecha_humano,
		fecha_humano_modify,
		user,
		url_imgs,
		url_portada,
		only_users,
		created_at,
		updated_at,
	} = props;

  const { auth, userRedux } = useSelector(state => ({
    auth: state.auth.auth,
    userRedux: state.auth.user,
  }));

  function NoticiaHead() {
  
    return (
      <Container>
        <Typography className='text__bold--big' variant='h4'>
          {title}
        </Typography>
        <Typography className='text__bold--big text__opacity--semi' variant='h6'>
          Publicado {fecha_humano}
          <Typography className='text__bold--big' variant='h6' component='span' color='primary'>{user?.name && ` - ${user.name}`}</Typography>
          {created_at !== updated_at && (
            <Typography className='text__opacity--semi' variant='h6' component='span'> (Editado {fecha_humano_modify})</Typography>
          )}
        </Typography>
      </Container>
    )
  }

  const NoticiaContent = () => (
		<React.Fragment>
			{url_portada ? (
				<img className={classes.portada} src={url_portada} alt='portada de la publicación' width='100%' height={250} />
			) : null}
			<ReactMarkdown remarkPlugins={[gfm]} children={content} components={renderersMarkdown} />
		</React.Fragment>
	)
  
  return (
    <>
      <NoticiaHead />
      <Divider sx={classes.divider} />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <NoticiaContent />
          </Grid>
        </Grid>
        {url_imgs?.length && (
					<RenderGalery imgs={url_imgs} />
				)}
        {auth && userRedux.privilegio && (
					<Typography variant='body2' align='right' className='text__opacity--semi' sx={{mt: 2}}>
            Noticia solo para usuarios: {only_users ? 'Si' : 'No'}
          </Typography>
				)}
      </Container>
    </>
  )
}
