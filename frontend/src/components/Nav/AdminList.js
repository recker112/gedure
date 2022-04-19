import React from 'react'

// MUI
import { ListItemIcon, ListItemText } from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';

// Components
import { ListDrawerNav } from './NoAuth';

export default function AdminList() {
  return (
    <>
      <ListDrawerNav to='/gedure/registros'>
        <ListItemIcon>
          <LaptopIcon />
        </ListItemIcon>
        <ListItemText primary='Registros' />
      </ListDrawerNav>
    </>
  )
}
