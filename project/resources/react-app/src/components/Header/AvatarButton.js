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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import useFetch from '../../hooks/useFetch';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import logoutApp from '../../actions/logoutApp';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: `${theme.spacing(2)}px`
	},
	padding: {
		padding: `${theme.spacing(2)}px`
	},
	headOptions: {
		height: 50,
		width: 200,
		background: theme.palette.primary.main + '90'
	},
	drawer__button: {
		opacity: 0.9,
		transition: '0.5s',
		borderRadius: '5px',
		'&:hover': {
			opacity: 1,
			backgroundColor: theme.palette.primary.main + '60'
		},
		'&.Mui-selected': {
			backgroundColor: theme.palette.primary.main + '60',
			'&:hover': {
				backgroundColor: theme.palette.primary.main
			}
		}
	},
	avatarColor: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
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
		history.push('/cuenta');
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
			<Tooltip title='Opciones' arrow leaveDelay={200}>
				<IconButton 
					aria-controls="AvatarButton" 
					aria-haspopup="true"
					size='small' 
					onClick={handleClick}
					{...rest}
				>
					<Avatar 
						alt='Avatar User' 
						src={user.avatar} 
						className={classes.avatarColor}
					>
						{user.nombre.substring(0, 1).toUpperCase()}
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
				<Paper>
					<Grid container alignItems='center' className={classes.headOptions}>
						<span className={classes.margin}>{user.nombre}</span>
					</Grid>
					<List className={classes.padding}>
						<ListItem 
							button 
							dense 
							className={classes.drawer__button}
							onClick={handleOptions}
						>
							<ListItemIcon><SettingsIcon /></ListItemIcon>
							<ListItemText>Opciones</ListItemText>
						</ListItem>
						<ListItem 
							button 
							dense 
							className={classes.drawer__button} 
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