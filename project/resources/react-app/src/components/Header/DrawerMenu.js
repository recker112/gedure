import React, { useMemo, useCallback } from 'react';

import {
	Drawer,
	Grid,
	Container,
	Typography,
	ListItemIcon,
	ListItemText,
	List,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import History from '@material-ui/icons/History';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import PeopleIcon from '@material-ui/icons/People';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PublicIcon from '@material-ui/icons/Public';

// Components
import FooterText from '../../components/FooterText';
import { ReturnSelected } from './HeaderNoAuth';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDrawer from '../../actions/updateDrawer';

const useStyles = makeStyles((theme) => ({
	HeadDrawer: {
		background: theme.palette.primary.main,
		minHeight: 56,
	},
	containerContent: {
		marginTop: theme.spacing(2),
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	title: {
		marginBottom: 5,
	}
}));

function DrawerMenu() {
	const { open, privilegio, permissions } = useSelector((state) => ({
		open: state.settings.drawer,
		permissions: state.userData.permissions,
		privilegio: state.userData.user.privilegio,
	}));
	const dispatch = useDispatch();
	
	const classes = useStyles();
	
	const handleClose = () => {
		dispatch(updateDrawer(false));
	}
	
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
					seeIt: Boolean(permissions.administrar?.registro_ver)
				},
				{
					url: '/panel/usuarios',
					text: 'Usuarios',
					icon: <PeopleIcon />,
					seeIt: Boolean(permissions.administrar?.user_ver)
				},
				{
					url: '/panel/noticias',
					text: 'Noticias',
					icon: <PublicIcon />,
					seeIt: Boolean(permissions.publicaciones?.post_modify),
				},
				{
					url: '/panel/boletas',
					text: 'Boletas',
					icon: <AnnouncementIcon />,
					seeIt: Boolean(permissions.administrar?.upload_boletas)
				},
				{
					url: '/panel/matricula',
					text: 'Matricula',
					icon: <AttachMoneyIcon />,
					seeIt: Boolean(permissions.administrar?.upload_matricula)
				}
			]
		},
		{
			title: 'Gedure',
			iCanSeeIt: Boolean(Object.keys(permissions?.gedure || []).length),
			access: ['A-'],
			listItems: [
				{
					url: '/panel/gedure',
					text: 'Configuración',
					icon: <SettingsRoundedIcon />,
					seeIt: Boolean(permissions.gedure?.control)
				}
			]
		},
		{
			title: 'Ayuda',
			listItems: [
				{
					url: '/panel/solicitudes_contacto',
					text: 'Solicitudes de contacto',
					icon: <HelpRoundedIcon />,
					seeIt: 1
				},
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
		<Drawer open={open} onClose={handleClose}>
			<div role="presentation" className="drawer">
				<Grid container alignItems="center" className={classes.HeadDrawer}>
					<Container>
						<Typography className='text__bold--semi'>
							La Candelaria
						</Typography>
					</Container>
				</Grid>
				<Container className={classes.containerContent}>
					<Grid container direction="column" spacing={2}>
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
									<Grid container direction='column' item key={i}>
										<Grid item className={classes.title}>
											<Typography className="text__opacity--semi text__bold--semi">
												{section.title}
											</Typography>
										</Grid>
										<Grid container direction='column' item>
											<List dense={true}>
												{section.listItems.map((item, i)=>{
													if (item.seeIt) {
														const { url, icon, text } = item;

														return (
															<ReturnSelected url={url} handle={handleClose} key={i}>
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
				</Container>
					<Typography 
						style={{margin: '30px 0 15px 0'}} 
						variant='caption' 
						className='text__opacity--semi'
					>
						<FooterText />
					</Typography>
			</div>
		</Drawer>
	);
}

export default DrawerMenu;