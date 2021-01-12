import React from 'react';

import { 
	Typography,
	Container,
	Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import { renderersMarkdown } from '../../../components/RendersGlobals';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	divider: {
		margin: `${theme.spacing(3)}px 0`
	},
	portada: {
		marginBottom: theme.spacing(2),
		objectFit: 'cover',
	},
}));

export default function ShowPreview() {
	const { data, user } = useSelector((state) => ({
		data: state.forms.crearPost.data,
		user: state.userData.user,
	}));
	
	const classes = useStyles();
	
	const Head = () => (
		<Container>
			<Typography className='text__bold--big' variant='h4'>
				{data.title}
			</Typography>
			<Typography className='text__bold--big text__opacity--semi' variant='h6'>
				Fecha de publicaciรณn
				<Typography className='text__bold--big' variant='h6' component='span' color='primary'> - {user.name}</Typography>
			</Typography>
		</Container>
	);
	
	const Body = () => (
		<Container>
			{data.portada?.length ? (
				<img className={classes.portada} src={URL.createObjectURL(data.portada[0])} alt='portada de la publicación' width='100%' height={250} />
			) : null}
			<ReactMarkdown plugins={[gfm]} children={data.markdown} renderers={renderersMarkdown} />
			<Typography variant='body2' align='right' className='text__opacity--semi'>
				Noticia solo para usuarios: {data.only_users ? 'Si' : 'No'}
			</Typography>
		</Container>
	)
	
	return (
		<React.Fragment>
			<Head />
			<Divider className={classes.divider} />
			<Body />
		</React.Fragment>
	)
}