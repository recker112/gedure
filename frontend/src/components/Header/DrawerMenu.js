import React, { useState } from 'react';

import { 
	Drawer,
	AppBar,
	Toolbar,
	Grid,
	Container,
	List,
	ListItemIcon,
	ListItemText,
	Collapse,
	Box,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import RoomIcon from '@material-ui/icons/Room';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
	Bullhorn as BullhornIcon,
	Help as HelpIcon,
	FrequentlyAskedQuestions as FAQIcon,
	Wallet as WalletIcon,
} from 'mdi-material-ui';
// import { mdiFaceAgent } from '@mdi/js';

// Components
import { ReturnSelected } from './HeaderNoAuth';
import GedureLogo from '../../imgs/gedure-logo-recto.svg';
import UserList from './UserList';
import AdminList from './AdminList';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import updateDrawer from '../../actions/updateDrawer';

function DrawerMenu() {
	const [helpSection, setHelpSection] = useState(false);
	
	const { open, privilegio } = useSelector((state) => ({
		open: state.settings.drawer,
		privilegio: state.userData.user.privilegio,
	}));
	const dispatch = useDispatch();
	
	const handleClose = () => {
		dispatch(updateDrawer(false));
		setHelpSection(false);
	}
	
	const handleExpandHelp = () => {
    setHelpSection(!helpSection);
  };
	
	return (
		<Drawer open={open} onClose={handleClose}>
			<div role="presentation" className='drawer'>
				<AppBar color='transparent' position='static' elevation={0}>
					<Toolbar>
						<Grid container justify='center' alignItems='center'>
							<img src={GedureLogo} alt='logo de Gedure' height='35' />
						</Grid>
					</Toolbar>
				</AppBar>
				<Container>
					<List component="nav">
						<ReturnSelected url='/gedure' handle={handleClose}>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary='Inicio' /> 
						</ReturnSelected>
						<ReturnSelected url='/noticias' handle={handleClose}>
							<ListItemIcon>
								<BullhornIcon />
							</ListItemIcon>
							<ListItemText primary='Noticias' /> 
						</ReturnSelected>
						{privilegio === 'V-' && (
							<UserList handleClose={handleClose} />
						)}
						
						{privilegio === 'A-' && (
							<AdminList handleClose={handleClose} />
						)}
						<ReturnSelected url='/gedure/monedero' handle={handleClose}>
							<ListItemIcon>
								<WalletIcon />
							</ListItemIcon>
							<ListItemText primary='Monedero' /> 
						</ReturnSelected>
						<ReturnSelected handle={handleExpandHelp}>
							<ListItemIcon>
								<HelpIcon />
							</ListItemIcon>
							<ListItemText primary="Ayuda" />
							{helpSection ? <ExpandLess /> : <ExpandMore />}
						</ReturnSelected>
						<Collapse in={helpSection} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ReturnSelected url='/gedure/preguntas-frecuentes' handle={handleClose} nested>
									<ListItemIcon>
										<FAQIcon />
									</ListItemIcon>
									<ListItemText primary="Preguntas frecuentes" />
								</ReturnSelected>
								<ReturnSelected url='/contactanos' handle={handleClose} nested>
									<ListItemIcon>
										<RoomIcon />
									</ListItemIcon>
									<ListItemText primary="Ubícanos" />
								</ReturnSelected>
							</List>
						</Collapse>
					</List>
				</Container>
				<Box 
					mt='auto' 
					mb={4} 
					position='relative' 
					top={16}
					color='text.secondary' 
					fontSize='body2.fontSize' 
					align='center'
				>
					Ver. 5.0.0-Beta.1
				</Box>
			</div>
		</Drawer>
	);
}

export default DrawerMenu;