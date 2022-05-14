import React, { useState } from 'react';

// MUI
import { Avatar, Box, Grid, IconButton, List, ListItemIcon, ListItemText, Popover, Tooltip, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Components
import { ListDrawerNav } from './NoAuth';

// Redux
import { useSelector } from 'react-redux';

export default function AvatarMenu() {
 const [target, setTarget] = useState(null);

 const { name, avatar, id, privilegio } = useSelector(state => ({
  name: state.auth.user.name,
  avatar: state.auth.user.avatar,
  id: state.auth.user.id,
  privilegio: state.auth.user.privilegio,
 }));

 const handleClick = event => {
		setTarget(event.currentTarget);
	};
	
	const handleClose = () => {
		setTarget(null);
	};

 return (
  <>
   <Tooltip arrow title='Opciones'>
    <IconButton size="small" onClick={handleClick}>
     <Avatar
      sx={{
       backgroundColor: 'secondary.main',
       color: 'secondary.contrastText'
      }}
      src={avatar}
     >
      {name.substring(0, 1).toUpperCase()}
     </Avatar>
    </IconButton>
   </Tooltip>
   <Popover
    anchorEl={target}
    onClose={handleClose}
    open={Boolean(target)}
    anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
   >
    <Box sx={{width: 200, padding: 2}}>
     <Grid container spacing={1}>
      <Grid container justifyContent='center' item xs={12}>
       <Avatar
        sx={{
          backgroundColor: 'secondary.main',
          color: 'secondary.contrastText',
          width: 70, 
          height: 70
        }}
        src={avatar}
        alt={`Avatar User de ${name}`}
       >
        {name.substring(0, 1).toUpperCase()}
       </Avatar>
      </Grid>
      <Grid item xs={12}>
       <Typography textAlign='center' className='text__bold--semi'>
        {name}
       </Typography>
       <Typography variant='body2' textAlign='center' className='text__opacity--semi'>
        {privilegio === 'V-' && `Estudiante #${id}`}
        {privilegio === 'A-' && `Administrador #${id}`}
       </Typography>
      </Grid>
      <Grid item xs={12}>
       <List>
        <ListDrawerNav to='/gedure/cuenta' onClick={handleClose}>
         <ListItemIcon>
          <SettingsIcon />
         </ListItemIcon>
         <ListItemText primary='Cuenta' /> 
        </ListDrawerNav>
        <ListDrawerNav to='/logout' onClick={handleClose}>
         <ListItemIcon>
          <ExitToAppIcon />
         </ListItemIcon>
         <ListItemText primary='Salir' /> 
        </ListDrawerNav>
       </List>
      </Grid>
     </Grid>
    </Box>
   </Popover>
  </>
 )
}