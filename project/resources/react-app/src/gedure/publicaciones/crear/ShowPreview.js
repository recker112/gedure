import React from 'react';

import { 
	Typography,
	Container,
	Divider,
	Link,
	TableContainer,
	Paper,
	Table,
	TableCell,
	TableRow,
	TableBody,
	TableHead,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	divider: {
		margin: `${theme.spacing(3)}px 0`
	},
	separer: {
		marginBottom: theme.spacing(2)
	},
	portada: {
		marginBottom: theme.spacing(2),
		objectFit: 'cover',
	},
}));

function MarkdownTable(props) {
	const classes = useStyles();
	
	return (
		<TableContainer component={Paper} className={classes.separer}>
			<Table size="small" aria-label="a dense table">{props.children}</Table>
		</TableContainer>
	);
}

function MarkdownTableCell(props) {
    return <TableCell>{props.children}</TableCell>
}

function MarkdownTableRow(props) {
    return <TableRow>{props.children}</TableRow>
}

function MarkdownTableBody(props) {
    return <TableBody>{props.children}</TableBody>
}

function MarkdownTableHead(props) {
    return <TableHead>{props.children}</TableHead>
}

const MarkdownListItem = ({ ...props }) => {
	return (
		<li>
			<Typography component="span">{props.children}</Typography>
		</li>
	);
};

function MarkdownParagraph(props) {
	const classes = useStyles();
	
	return <Typography className={classes.separer}>{props.children}</Typography>
}

const MarkdownHeading = ({ ...props }) => {
	let variant;
	switch (props.level) {
		case 1:
				variant = "h5";
				break;
		case 2:
				variant = "h6";
				break;
		case 3:
				variant = "subtitle1";
				break;
		case 4:
				variant = "subtitle2";
				break;
		default:
				variant = "h6";
				break;
	}
	return (
		<Typography
			gutterBottom
			variant={variant}
		>
			{props.children}
		</Typography>
	);
}

const renderers = {
	heading: MarkdownHeading,
	link: Link,
	paragraph: MarkdownParagraph,
	table: MarkdownTable,
	tableHead: MarkdownTableHead,
	tableBody: MarkdownTableBody,
	tableRow: MarkdownTableRow,
	tableCell: MarkdownTableCell,
	listItem: MarkdownListItem,
};

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
				Fecha de publicación
				<Typography className='text__bold--big' variant='h6' component='span' color='primary'> - {user.name}</Typography>
			</Typography>
		</Container>
	);
	
	const Body = () => (
		<Container>
			{data.portada?.length ? (
				<img className={classes.portada} src={URL.createObjectURL(data.portada[0])} alt='portada de la publicación' width='100%' height={250} />
			) : null}
			<ReactMarkdown plugins={[gfm]} children={data.markdown} renderers={renderers} />
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