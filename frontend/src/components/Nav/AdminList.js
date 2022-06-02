import React, { useState } from 'react';

// MUI
import { Collapse, ListItemIcon, ListItemText } from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import {
	HammerWrench as HammerWrenchIcon,
} from 'mdi-material-ui';

// Components
import { ListDrawerNav } from './NoAuth';

// Redux
import { useSelector } from 'react-redux';

export default function AdminList() {
  const [principal, setPrincipal] = useState(false);

  const { permissions } = useSelector(state => state.auth);
  const { registros_index } = permissions.sin_asignar;
  const { users_index, posts_index } = permissions.administrar;

  const handleExpand1 = () => {
    setPrincipal(value => !value);
  }

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
						{principal ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</ListDrawerNav>
          <Collapse in={principal} timeout="auto" unmountOnExit>
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
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary='Publicaciones' />
              </ListDrawerNav>
            )}
          </Collapse>
        </>
      )}
    </>
  )
}
