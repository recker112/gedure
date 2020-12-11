import React, { useState } from 'react';

import { useRouteMatch, Link as RouterLink } from 'react-router-dom';

import { 
	useScrollTrigger, 
	AppBar, 
	Toolbar,
	Link,
	Hidden,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Container,
	Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

// Components
import { HiddeOnScroll } from '../Header';
import gedureLogo from '../../imgs/Gedure-Logo.png';

const useStyles = makeStyles((theme) => ({
	toolBar: {
		justifyContent: 'flex-end',
	},
	item: {
		marginRight: 15,
		textDecoration: 'none',
	},
	button: {
		opacity: 0.9,
		transition: '0.5s',
		borderRadius: '5px',
		'&:hover': {
			opacity: 1,
		},
		'&.Mui-selected': {
			background: 'linear-gradient(270deg, #2F80ED 0%, #0BA6E0 100%)',
			opacity: 0.8,
			color: 'white',
			'&:hover': {
				opacity: 1,
			},
		},
		'&.Mui-selected .MuiListItemIcon-root': {
			color: 'white !important',
		},
	},
	nested: {
		opacity: 0.9,
		transition: '0.5s',
		borderRadius: '5px',
		paddingLeft: theme.spacing(4),
		'&:hover': {
			opacity: 1,
		},
		'&.Mui-selected': {
			background: 'linear-gradient(270deg, #2F80ED 0%, #0BA6E0 100%)',
			opacity: 0.8,
			color: 'white',
			'&:hover': {
				opacity: 1,
			},
		},
		'&.Mui-selected .MuiListItemIcon-root': {
			color: 'white !important',
		},
	},
}));

export function ReturnSelected (props) {
	const { url=null, handle, nested, children } = props;
	
	const classes = useStyles();
	
	const match = useRouteMatch({
		path: url,
		exact: true
	});
	
	return (
		<ListItem 
			button 
			dense 
			selected={Boolean(match)} 
			className={nested ? classes.nested : classes.button}
			onClick={handle}
			component={url !== null && RouterLink}
			to={url}
		>
			{children}
		</ListItem>	
	);
}

function MobileMenu() {
	const [open, setOpen] = useState(false);
	
	const handleClick = () => {
		setOpen(true);
	}
	
	const handleClose = () => {
		setOpen(false);
	}
	
	return (
		<React.Fragment>
			<IconButton onClick={handleClick}>
				<MenuIcon style={{ color: 'white' }} />
			</IconButton>
			<Drawer open={open} onClose={handleClose}>
				<div role="presentation" className='drawer'>
					<AppBar color='transparent' position='static' elevation={0}>
						<Toolbar>
							<Grid container justify='center' alignItems='center'>
								<img src={gedureLogo} alt='logo de Gedure' height='25' />
							</Grid>
						</Toolbar>
					</AppBar>
					<Container>
						<List component="nav">
							<ReturnSelected url='/' handle={handleClose}>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary='Inicio' /> 
							</ReturnSelected>
							<ReturnSelected url='/noticias' handle={handleClose}>
								<ListItemIcon>
									<AnnouncementIcon />
								</ListItemIcon>
								<ListItemText primary='Noticias' /> 
							</ReturnSelected>
							<ReturnSelected url='/solicitud' handle={handleClose}>
								<ListItemIcon>
									<AssignmentIcon />
								</ListItemIcon>
								<ListItemText primary='Solicitud de cupo' /> 
							</ReturnSelected>
							<ReturnSelected url='/contactanos' handle={handleClose}>
								<ListItemIcon>
									<ContactMailIcon />
								</ListItemIcon>
								<ListItemText primary='Contรกctanos' /> 
							</ReturnSelected>
							<ReturnSelected url='/entrar' handle={handleClose}>
								<ListItemIcon>
									<VpnKeyIcon />
								</ListItemIcon>
								<ListItemText primary='Entrar' /> 
							</ReturnSelected>
						</List>
					</Container>
				</div>
			</Drawer>
		</React.Fragment>
	);
}

function HeaderNoAuth() {
	const classes = useStyles();
	
	const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 350,
  });
	
	const match0 = useRouteMatch({
		path: '/',
		exact: true,
	});
	
	return (
		<HiddeOnScroll>
			<AppBar color={(!trigger && match0) ? 'transparent' : 'primary'} elevation={0}>
				<Hidden smUp>
					<Toolbar>
						<MobileMenu />
					</Toolbar>
				</Hidden>
				<Hidden xsDown>
					<Toolbar className={classes.toolBar}>
						<Link 
							color="initial" 
							className={classes.item} 
							component={RouterLink} 
							to="/"
						>
							Inicio
						</Link>
						<Link 
							color="initial"
							className={classes.item} 
							component={RouterLink} 
							to="/noticias"
						>
							Noticias
						</Link>
						<Link 
							color="initial"
							className={classes.item} 
							component={RouterLink} 
							to="/solicitud"
						>
							Solicitud de cupo
						</Link>
						<Link 
							color="initial"
							className={classes.item} 
							component={RouterLink} 
							to="/contactanos"
						>
							Contรกctanos
						</Link>
						<Link 
							color="initial"
							className={classes.item} 
							component={RouterLink} 
							to="/entrar"
						>
							Entrar
						</Link>
					</Toolbar>
				</Hidden>
			</AppBar>
		</HiddeOnScroll>
	);
}

export default HeaderNoAuth;