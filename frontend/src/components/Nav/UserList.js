import React from 'react';

// MUI
import { Collapse, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

// Components
import { ListDrawerNav } from './NoAuth';

export default function UserList({
  handleExpand1,
  expand1,
}) {
  return (
    <>
      <ListDrawerNav noNav onClick={handleExpand1}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary='Control de estudio' /> 
        {expand1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListDrawerNav>
      <Collapse in={expand1} timeout="auto" unmountOnExit>
        <ListDrawerNav nested to='/gedure/boletas'>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary='Boletas' />
        </ListDrawerNav>
      </Collapse>
    </>
  )
}
