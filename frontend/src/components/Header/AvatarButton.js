import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
	IconButton,
	Avatar,
	Popover,
	Paper,
	Tooltip,
	Grid,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import useFetch from '../../hooks/useFetch';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import logoutApp from '../../actions/logoutApp';

const useStyles = makeStyles((theme) => ({
	padding: {
		padding: theme.spacing(2),
	},
	button: {
		opacity: 0.9,
		transition: '0.5s',
		borderRadius: '5px',
		'&:hover': {
			opacity: 1,
			background: 'linear-gradient(270deg, #2F80ED 0%, #0BA6E0 100%)',
			color: 'white !important',
			
			'& .MuiListItemIcon-root': {
				color: 'white !important',
			},
		},
	},
	avatarColor: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
	},
	avatarMenu: {
		color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
		height: 70,
		width: 70,
		marginBottom: theme.spacing(1),
	}
}));

function AvatarButton({ ...rest }) {
	const [buttonItem, setButtonItem] = useState(null);
	
	const { user } = useSelector((state) => ({
		user: state.userData.user,
	}));
	const dispatch = useDispatch();
	
	const { fetchData } = useFetch();
	
	const history = useHistory();
	
	const classes = useStyles();
	
	const handleClick = event => {
		setButtonItem(event.currentTarget);
	};
	
	const handleClose = () => {
		setButtonItem(null);
	};
	
	const handleOptions = () => {
		handleClose();
		history.push('/gedure/cuenta');
	}
	
	const handleLogout = async () => {
		handleClose();
		
		const prepareDate = {
			url: 'v1/logout',
			variant: 'info'
		}
		
		const response = await fetchData(prepareDate);
		
		if (response) {
			dispatch(logoutApp());
		}
	}
	
	return (
		<React.Fragment>
			<Tooltip title='Opciones' arrow>
				<IconButton 
					aria-controls="AvatarButton" 
					aria-haspopup="true"
					size='small' 
					data-tour='avatar__menu'
					onClick={handleClick}
					{...rest}
				>
					<Avatar 
						alt='Avatar User' 
						src={user.avatar} 
						className={classes.avatarColor}
					>
						{user.name.substring(0, 1).toUpperCase()}
					</Avatar>
				</IconButton>
			</Tooltip>
			<Popover
				id="AvatarButton"
				anchorEl={buttonItem}
				keepMounted
				open={Boolean(buttonItem)}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Paper style={{minWidth: 200}}>
					<Grid container direction='column' className={classes.padding}>
						<Grid container justify='center' item>
							<Avatar 
								alt='Avatar User' 
								src={user.avatar} 
								className={classes.avatarMenu}
							>
								{user.name.substring(0, 1).toUpperCase()}
							</Avatar>
						</Grid>
						<Grid style={{maxWidth: 200}} container justify='center' item>
							<Typography align='center' className='text__bold--semi'>
								{user.name}
							</Typography>
						</Grid>
						<Grid container justify='center' item>
							<Typography variant='body2' className='text__opacity--semi'>
								{user.privilegio === 'V-' && `Estudiante #${user.id}`}
								{user.privilegio === 'A-' && `Administrador #${user.id}`}
							</Typography>
						</Grid>
					</Grid>
					<List className={classes.padding}>
						<ListItem 
							button 
							dense 
							className={classes.button}
							onClick={handleOptions}
						>
							<ListItemIcon><SettingsIcon /></ListItemIcon>
							<ListItemText>Cuenta</ListItemText>
						</ListItem>
						<ListItem 
							button 
							dense 
							className={classes.button} 
							onClick={handleLogout}
						>
							<ListItemIcon><ExitToAppIcon /></ListItemIcon>
							<ListItemText>Salir</ListItemText>
						</ListItem>
					</List>
				</Paper>
			</Popover>
		</React.Fragment>
	);
}

export default AvatarButton;