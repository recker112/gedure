import React, { useState } from 'react';

import { Link, useRouteMatch, useHistory } from 'react-router-dom';

import {
	AppBar,
	Toolbar,
	IconButton,
	Button,
	useScrollTrigger,
	Hidden,
	Slide,
	Fab,
	Zoom,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Grid,
	Box,
	Container,
	ListItemIcon
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
	appBar: {
		justifyContent: 'flex-end'
	},
	HeadDrawer: {
		background: theme.palette.primary.main,
		height: 56,
	},
	margin: {
		marginTop: `${theme.spacing(2)}px`
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
	}
}));

function HideOnScroll(props) {
  const { children } = props;
	
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ScrollTop(props) {
  const { children } = props;
	
	const classes = useStyles();
	
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 800,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

function HeaderButton (props) {
	const { url, children } = props;
	
	const match = useRouteMatch({
		path: url,
		exact: true
	});
	
	return (
		<Link to={url}>
			<Button>
				<span className={match ? 'header__selected' : ''}>
					{children}
				</span>
			</Button>
		</Link>
	);
}

function ReturnSelected (props) {
	const { url, handle, children } = props;
	
	const classes = useStyles();
	
	let history = useHistory();
	
	const match = useRouteMatch({
		path: url,
		exact: true
	});
	
	const handleClick = () => {
		history.push(url)
		handle();
	}
	
	return (
		<ListItem button dense selected={Boolean(match)} className={classes.drawer__button} onClick={handleClick}>
			{children}
		</ListItem>	
	);
}

function MobileMenuIndex() {
	const [open, setOpen] = useState(false);
	
	const classes = useStyles();
	
	const handleClick = () => {
		setOpen(true);
	}
	
	const handleClose = () => {
		setOpen(false);
	}
	
	return (
		<React.Fragment>
			<IconButton onClick={handleClick}>
				<MenuIcon />
			</IconButton>
			<Drawer open={open} onClose={handleClose}>
				<div role="presentation" className='drawer'>
					<Grid container alignItems='center' className={classes.HeadDrawer}>
						<Container>
							<Box component='span' className='drawer__title'>
								La Candelaria
							</Box>
						</Container>
					</Grid>
					<Container>
						<Box className={classes.margin}>
							<Grid container direction='column'>
								<Grid item>
									<span className='drawer__subTitle'>Navegación</span>
								</Grid>
								<Grid container direction='column' item>
									<List>
										<ReturnSelected url='/' handle={handleClose}>
											<ListItemIcon><HomeIcon /></ListItemIcon>
											<ListItemText>Inicio</ListItemText>
										</ReturnSelected>
										<ReturnSelected url='/noticias' handle={handleClose}>
											<ListItemIcon><AnnouncementIcon /></ListItemIcon>
											<ListItemText>Noticias</ListItemText>
										</ReturnSelected>
										<ReturnSelected url='/contactanos' handle={handleClose}>
											<ListItemIcon><ContactMailIcon /></ListItemIcon>
											<ListItemText>Contáctanos</ListItemText>
										</ReturnSelected>
										<ReturnSelected url='/entrar' handle={handleClose}>
											<ListItemIcon><VpnKeyIcon /></ListItemIcon>
											<ListItemText>Entrar</ListItemText>
										</ReturnSelected>
									</List>
								</Grid>
							</Grid>
						</Box>
					</Container>
				</div>
			</Drawer>
		</React.Fragment>
	);
}

function Header() {
	const classes = useStyles();
	
	const match1 = useRouteMatch({
		path: '/entrar',
		exact: true
	});
	
	const match2 = useRouteMatch({
		path: '/recovery',
		exact: true
	});
	
	return (
		<React.Fragment>
			{(!match1 && !match2) && (
				<React.Fragment>
					<HideOnScroll>
					<AppBar>
						<Hidden smUp>
							<Toolbar className={classes.appBar}>
								<MobileMenuIndex />
							</Toolbar>
						</Hidden>
						<Hidden xsDown>
							<Toolbar className={classes.appBar}>
								<HeaderButton url='/'>
									Inicio
								</HeaderButton>
								<HeaderButton url='/noticias'>
									Noticias
								</HeaderButton>
								<HeaderButton url='/contactanos'>
									Contáctanos
								</HeaderButton>
								<HeaderButton url='/entrar'>
									Entrar
								</HeaderButton>
							</Toolbar>
						</Hidden>
					</AppBar>
				</HideOnScroll>
				<ScrollTop>
					<Fab color="secondary" size="small">
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollTop>
			</React.Fragment>
			)}
		</React.Fragment>
	);
}

export default Header;