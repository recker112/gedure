import React from 'react';

// MUI
import { Collapse, ListItemIcon, ListItemText } from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import {
	HammerWrench as HammerWrenchIcon,
  Post as PostIcon,
} from 'mdi-material-ui';

// Components
import { ListDrawerNav } from './NoAuth';

// Redux
import { useSelector } from 'react-redux';

export default function AdminList({
  expand1,
  handleExpand1,
}) {
  const { permissions } = useSelector(state => state.auth);
  const { registros_index } = permissions.sin_asignar;
  const { users_index, posts_index, boletas_index, contact_index } = permissions.administrar;

  return (
    <>
      {registros_index && (
        <ListDrawerNav to='/gedure/registros'>
          <ListItemIcon>
            <LaptopIcon />
          </ListItemIcon>
          <ListItemText primary='Registros' />
        </ListDrawerNav>
      )}

      {Object.keys(permissions.administrar).length !== 0 && (
        <>
          <ListDrawerNav noNav onClick={handleExpand1}>
						<ListItemIcon>
							<HammerWrenchIcon />
						</ListItemIcon>
						<ListItemText primary='Sistema principal' /> 
						{expand1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</ListDrawerNav>
          <Collapse in={expand1} timeout="auto" unmountOnExit>
            {users_index && (
              <ListDrawerNav nested to='/gedure/usuarios'>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary='Usuarios' />
              </ListDrawerNav>
            )}
            {posts_index && (
              <ListDrawerNav nested to='/gedure/publicaciones'>
                <ListItemIcon>
                  <PostIcon />
                </ListItemIcon>
                <ListItemText primary='Publicaciones' />
              </ListDrawerNav>
            )}
            {boletas_index && (
              <ListDrawerNav nested to='/gedure/boletas'>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary="Boletas" />
              </ListDrawerNav>
            )}
            {contact_index && (
              <ListDrawerNav nested to='/gedure/soli-contacto'>
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary="Solicitudes de contacto" />
              </ListDrawerNav>
            )}
          </Collapse>
        </>
      )}
    </>
  )
}
