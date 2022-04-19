import React, { useState } from 'react';

// MUI
import { Box, Collapse, Container, Drawer, List, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RoomIcon from '@mui/icons-material/Room';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import {
  Help as HelpIcon,
  FrequentlyAskedQuestions as FAQIcon,
} from 'mdi-material-ui';

// Components
import GedureLogo from "../../img/gedure-logo-recto.svg";
import { ListDrawerNav } from './NoAuth';
import AdminList from './AdminList';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateDrawer } from '../../store/slices/configs';

export default function DrawerMenu() {
  const [helpSection, setHelpSection] = useState(false);

  const { open, privilegio } = useSelector(state => ({
    open: state.configs.drawer,
    privilegio: state.auth.user.privilegio,
  }));
  const dispatch = useDispatch();

  const handleClose = () => { 
    dispatch(updateDrawer(false));
  }

  const handleExpandHelp = () => {
    setHelpSection(value => !value);
  }
  return (
    <Drawer open={open} onClose={handleClose}>
      <Box
        role='presentation'
        sx={{
          width: '280px',
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
          height: 1/1
        }}
      >
        <Toolbar sx={{justifyContent: 'center'}}>
          <img src={GedureLogo} alt="logo de Gedure" height="35" />
        </Toolbar>
        <Container>
          <List component="nav">
            <ListDrawerNav to='/gedure'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Inicio' />
            </ListDrawerNav>
            <ListDrawerNav to='/noticias'>
              <ListItemIcon>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary='Noticias' />
            </ListDrawerNav>

            {privilegio === 'A-' && (
              <AdminList handleClose={handleClose} />
            )}

            <ListDrawerNav noNav onClick={handleExpandHelp}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary='Ayuda' />
              <ExpandMoreIcon sx={{
                transition: '0.5s',
                transform: helpSection ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </ListDrawerNav>
            <Collapse in={helpSection} timeout="auto" unmountOnExit>
              <ListDrawerNav to='/gedure/preguntas-frecuentes' nested>
                <ListItemIcon>
                  <FAQIcon />
                </ListItemIcon>
                <ListItemText primary='Preguntas frecuentes' />
              </ListDrawerNav>
              <ListDrawerNav to='/contactanos' nested>
                <ListItemIcon>
                  <RoomIcon />
                </ListItemIcon>
                <ListItemText primary='Contáctanos' />
              </ListDrawerNav>
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
					textAlign='center'
				>
					Ver. 5.0.0-Beta.2
				</Box>
      </Box>
    </Drawer>
  )
}
