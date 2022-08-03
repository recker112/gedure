import React, { useState } from 'react';

// MUI
import { Badge, Box, Divider, IconButton, Popover, Stack, Tooltip, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const BadgeAlert = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function NotifyMenu() {
  const [target, setTarget] = useState(null);

  const handleClick = event => {
		setTarget(event.currentTarget);
	};

  const handleClose = () => {
		setTarget(null);
	};

  return (
    <>
      <Tooltip arrow title='Notificaciones'>
        <IconButton sx={{mr: 1}} color="inherit" onClick={handleClick} size="small">
          <Badge badgeContent={14} color='secondary' max={10}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={target}
        onClose={handleClose}
        open={Boolean(target)}
        data-tour="observable-parent"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack sx={{padding: 2}} direction='row' alignItems='center' justifyContent='space-between'>
          <Typography fontSize='h6.fontSize' className='text__bold--semi'>Notificaciones</Typography>
          <IconButton sx={{ display: { xs: 'inherit', sm: 'none' } }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Stack sx={{maxWidth: 400, height: 400, padding: 2, overflow: 'auto'}} spacing={4}>
          <BadgeAlert color='primary' variant='dot'>
            <Box>
              <Typography className='text__bold--semi'>¡Transacciones bancarias cargadas!</Typography>
              <Typography variant='body2' className='text__opacity--semi'>Todas las trasacciones subidas fueron procesadas para la cuenta bancaria: 
              <br/>- N° cuenta: 2222 2222 2222 2222 2222
              <br/>- Nombre: Prueba
              <br/>- Correo: 1@2.es</Typography>
            </Box>
          </BadgeAlert>
          <BadgeAlert color="primary" variant="dot">
            <Box>
              <Typography className='text__bold--semi'>Título de la notificación</Typography>
              <Typography className='text__opacity--semi'>Contenido de la notificación</Typography>
            </Box>
          </BadgeAlert>
          <Box>
            <Typography className='text__bold--semi'>Título de la notificación</Typography>
            <Typography className='text__opacity--semi'>Contenido de la notificación</Typography>
          </Box>
          <Box>
            <Typography className='text__bold--semi'>Título de la notificación</Typography>
            <Typography className='text__opacity--semi'>Contenido de la notificación</Typography>
          </Box>
          <Box>
            <Typography className='text__bold--semi'>Título de la notificación</Typography>
            <Typography className='text__opacity--semi'>Contenido de la notificación</Typography>
          </Box>
          <Box>
            <Typography className='text__bold--semi'>Título de la notificación</Typography>
            <Typography className='text__opacity--semi'>Contenido de la notificación</Typography>
          </Box>
        </Stack>
      </Popover>
    </>
  )
}
