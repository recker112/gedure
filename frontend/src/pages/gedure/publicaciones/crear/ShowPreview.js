import React from 'react'

// MUI
import { Container, Divider, Typography } from '@mui/material';

// Form
import { useFormContext } from "react-hook-form";

// Markdown
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { renderersMarkdown } from '../../../../components/ComponentsMarkdown';

// Redux
import { useSelector } from "react-redux";

const classes = {
	divider: tema => ({
		margin: `${tema.spacing(3)} 0px`
	}),
	portada: {
		marginBottom: 16,
		objectFit: 'cover',
	},
};

export default function ShowPreview() {
  const name = useSelector(state => state.auth.user.name);

  const { watch } = useFormContext();


  const Head = () => (
		<Container>
			<Typography className='text__bold--big' variant='h4'>
				{watch('title')}
			</Typography>
			<Typography className='text__bold--big text__opacity--semi' variant='h6'>
				Fecha de publicación
				<Typography className='text__bold--big' variant='h6' component='span' color='primary'> - {name}</Typography>
			</Typography>
		</Container>
	);

  const Body = () => (
		<Container>
			{watch('portada', [])?.length ? (
				<img style={classes.portada} src={URL.createObjectURL(watch('portada', [])[0])} alt='portada de la publicacion' width='100%' height={250} />
			) : null}
			<ReactMarkdown remarkPlugins={[gfm]} children={watch('markdown', '')} components={renderersMarkdown} />
			<Typography variant='body2' align='right' className='text__opacity--semi'>
				Noticia solo para usuarios: {watch('only_users', false) ? 'Si' : 'No'}
			</Typography>
		</Container>
	)

  return (
    <>
      <Head />
      <Divider sx={classes.divider} />
      <Body />
    </>
  )
}
