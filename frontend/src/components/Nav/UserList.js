import React from 'react';

// MUI
import { Collapse, ListItemIcon, ListItemText } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SavingsIcon from '@mui/icons-material/Savings';

// Components
import { ListDrawerNav } from './NoAuth';

export default function UserList({
  handleExpand1,
  expand1,
  handleExpand2,
  expand2,
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

      <ListDrawerNav noNav onClick={handleExpand2}>
        <ListItemIcon>
          <SavingsIcon />
        </ListItemIcon>
        <ListItemText primary='Gestión de finanzas' /> 
        {expand2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListDrawerNav>
      <Collapse in={expand2} timeout="auto" unmountOnExit>
        <ListDrawerNav nested to='/gedure/monedero'>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary='Monedero' />
        </ListDrawerNav>
        <ListDrawerNav nested to='/gedure/deudas'>
          <ListItemIcon>
            <ReceiptLongIcon />
          </ListItemIcon>
          <ListItemText primary='Deudas' />
        </ListDrawerNav>
      </Collapse>
    </>
  )
}
