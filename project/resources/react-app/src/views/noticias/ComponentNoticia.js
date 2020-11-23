import React from 'react';

import { Link } from 'react-router-dom';

import {
	Typography,
	Grid,
	Avatar,
	Tooltip,
	Button,
	Card,
	CardHeader,
	CardContent,
	CardActions,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { useTheme } from '@material-ui/core/styles';

// Redux
import { useDispatch } from 'react-redux';
import updateForms from '../../actions/updateForms';

export function NoticiaPreview(props) {
	const {
		view,
		id,
		user,
		title,
		extracto,
		content,
		fecha_humano,
		url_imgs,
		fecha_humano_modify,
		slug,
		only_users,
	} = props;
	
	const dispatch = useDispatch();

	function createMarkup() {
		return { __html: `${extracto}...` };
	}

	const theme = useTheme();

	const handleClick = () => {
		const prepareData = {
			id,
			user,
			title,
			content,
			fecha_humano,
			slug,
			url_imgs,
			fecha_humano_modify,
			only_users,
		};
		dispatch(updateForms('noticia', false, prepareData));
	};

	return (
		<Grid item xs={12} sm={view === 'module' ? 6 : 12} md={view === 'module' ? 4 : 12}>
			<Card>
				<CardHeader
					style={{ backgroundColor: theme.palette.primary.main }}
					avatar={
						<Tooltip title={user.nombre} arrow>
							<Avatar
								aria-label="skeleton"
								src={user.avatar}
								style={{ backgroundColor: theme.palette.secondary.main }}
							>
								{user.nombre.substring(0, 1).toUpperCase()}
							</Avatar>
						</Tooltip>
					}
					title={title.length > 25 && view === 'module' ? `${title.substring(0, 25)}...` : title}
					subheader={`Publicado ${fecha_humano}`}
				/>
				<CardContent>
					<Typography dangerouslySetInnerHTML={createMarkup()} align="justify"></Typography>
				</CardContent>
				<CardActions>
					<Link style={{ marginLeft: 'auto' }} to={`/noticias/${slug}`}>
						<Button color='secondary' onClick={handleClick}>
							Ver publicaciรณn
						</Button>
					</Link>
				</CardActions>
			</Card>
		</Grid>
	);
}

export function NoticiaSkeleton(props) {
	const { view } = props;

	const theme = useTheme();

	return (
		<Grid item xs={12} sm={view === 'module' ? 6 : 12} md={view === 'module' ? 4 : 12}>
			<Card>
				<CardHeader
					style={{ backgroundColor: theme.palette.primary.main }}
					avatar={
						<Tooltip title="Usuario" arrow>
							<Avatar
								aria-label="skeleton"
								style={{ backgroundColor: theme.palette.secondary.main }}
							/>
						</Tooltip>
					}
					title={<Skeleton variant="text" width="100%" />}
					subheader={<Skeleton variant="text" width="70%" />}
				/>
				<CardContent>
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
					<Skeleton variant="text" width="100%" />
				</CardContent>
			</Card>
		</Grid>
	);
}