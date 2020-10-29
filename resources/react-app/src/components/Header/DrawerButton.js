import React, { useState, useCallback, useMemo } from 'react';

import {
	IconButton,
	Tooltip,
	Drawer,
	Grid,
	Container,
	Box,
	List,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import History from '@material-ui/icons/History';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import PeopleIcon from '@material-ui/icons/People';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PublicIcon from '@material-ui/icons/Public';

import Footer from './../Footer';
import { ReturnSelected } from './HeaderNoAuth';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	HeadDrawer: {
		background: theme.palette.primary.main,
		minHeight: 56,
	},
	containerContent: {
		marginTop: theme.spacing(2),
		flexGrow: 1,
		display: 'flex',
	},
	grow: {
		flexGrow: 1,
	},
	sectionDrawer: {
		marginBottom: 15,
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

function DrawerButton() {
	const [open, setOpen] = useState(false);
	
	const { permissions, privilegio } = useSelector(state => ({
		permissions: state.userData.permissions,
		privilegio: state.userData.user.privilegio,
	}));
	
	const handleClick = () => {
		setOpen(true);
	}
	
	const handleClose = () => {
		setOpen(false);
	}
	
	return (
		<React.Fragment>
			<Tooltip  title="Menú" arrow leaveDelay={200}>
				<IconButton onClick={handleClick}>
					<MenuIcon />
				</IconButton>
			</Tooltip>
			<RenderDrawer close={handleClose} reduxState={{permissions, privilegio, open}} />
		</React.Fragment>
	);
}

function RenderDrawer({ reduxState, close }) {
	const { open, permissions, privilegio } = reduxState;
	
	const classes = useStyles();
	
	const DrawerList = useMemo(()=>[
		{
			title: 'Inicio',
			listItems: [
				{
					url: '/panel',
					text: 'Inicio',
					icon: <HomeIcon />,
					seeIt: 1
				},
				{
					url: '/noticias',
					text: 'Noticias',
					icon: <AnnouncementIcon />,
					seeIt: 1
				}
			]
		},
		{
			title: 'Administración',
			iCanSeeIt: Boolean(Object.keys(permissions?.administrar || []).length),
			access: ['A-'],
			listItems: [
				{
					url: '/panel/registros',
					text: 'Registros',
					icon: <History />,
					seeIt: Boolean(permissions.administrar.registro_ver)
				},
				{
					url: '/panel/usuarios',
					text: 'Usuarios',
					icon: <PeopleIcon />,
					seeIt: Boolean(permissions.administrar.user_ver)
				},
				{
					url: '/panel/noticias',
					text: 'Noticias',
					icon: <PublicIcon />,
					seeIt: Boolean(permissions.publicaciones.modify),
				},
				{
					url: '/panel/boletas',
					text: 'Boletas',
					icon: <AnnouncementIcon />,
					seeIt: Boolean(permissions.administrar.upload_boletas)
				},
				{
					url: '/panel/matricula',
					text: 'Matricula',
					icon: <AttachMoneyIcon />,
					seeIt: Boolean(permissions.administrar.upload_matricula)
				}
			]
		},
		{
			title: 'Gedure',
			iCanSeeIt: Boolean(Object.keys(permissions?.gedure || []).length),
			access: ['A-'],
			listItems: [
				{
					url: '/gedure',
					text: 'Configuración',
					icon: <SettingsRoundedIcon />,
					seeIt: Boolean(permissions.gedure?.control)
				}
			]
		},
		{
			title: 'Publicaciones',
			iCanSeeIt: Boolean(Object.keys(permissions?.publicaciones || []).length),
			access: ['A-'],
			listItems: [
				{
					url: '/panel/publicaciones',
					text: 'Administrar publicaciones',
					icon: <NewReleasesIcon />,
					seeIt: Boolean(permissions.publicaciones?.modify)
				}
			]
		},
		{
			title: 'Ayuda',
			listItems: [
				{
					url: '/soporte',
					text: 'Preguntas y reclamos',
					icon: <HelpRoundedIcon />,
					seeIt: 1
				},
				{
					url: '/contactanos',
					text: 'Contáctanos',
					icon: <ContactMailIcon />,
					seeIt: 1
				}
			]
		}
	], [permissions]);
	
	return (
		<Drawer open={open} onClose={close}>
			<div role="presentation" className="drawer">
				<Grid container alignItems="center" className={classes.HeadDrawer}>
					<Container>
						<Box component="span" className="drawer__title">
							La Candelaria
						</Box>
					</Container>
				</Grid>
				<Container className={classes.containerContent}>
					<Grid container direction="column">
						<Grid container direction="column" item className={classes.grow}>
							{DrawerList.map(useCallback((section, i) => {
								let privilegioAccess = true;
								let seeSection = true;

								if (section.access) {
									let found = false;
									section.access.map((access)=>{
										if (access === privilegio) {
											privilegioAccess = true;
											found = true;
										}

										if (!found) {
											privilegioAccess = false;
										}

										return null;
									});
								}
								
								if (typeof section.iCanSeeIt !== "undefined") {
									seeSection = section.iCanSeeIt;
								}

								if (seeSection && privilegioAccess) {
									return (
										<Grid 
											container 
											direction="column" 
											className={classes.sectionDrawer}
											key={i}
										>
											<Grid item>
												<span className="drawer__subTitle">{section.title}</span>
											</Grid>
											<Grid container direction="column" item>
												<List>
													{section.listItems.map((item, i)=>{
														if (item.seeIt) {
															const { url, icon, text } = item;

															return (
																<ReturnSelected url={url} handle={close} key={i}>
																	<ListItemIcon>{icon}</ListItemIcon>
																	<ListItemText>{text}</ListItemText>
																</ReturnSelected>
															);
														}

														return null;
													})}
												</List>
											</Grid>
										</Grid>
									);
								}

								return null;

								// eslint-disable-next-line
							}, [permissions]))}
						</Grid>
						<Grid item>
							<Footer style={{margin: '15px 0 30px 0', opacity: 0.7}} />
						</Grid>
					</Grid>
				</Container>
			</div>
		</Drawer>
	);
}

export default DrawerButton;