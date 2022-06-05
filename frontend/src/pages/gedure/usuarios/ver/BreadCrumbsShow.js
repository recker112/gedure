import React from 'react';

// Router
import { useLocation } from 'react-router-dom';

// MUI
import { Avatar, Box, Breadcrumbs, Typography } from '@mui/material';

// Redux
import { useSelector } from 'react-redux';

const classes = {
  avatar: tema => ({
		backgroundColor: tema.palette.secondary.main,
		color: tema.palette.secondary.contrastText,
	}),
}

export default function BreadCrumbsShow({ 
  userName,
  userAvatar,
}) {
  const { name, avatar } = useSelector(state => ({
    name: state.gdUSelected.userSelected.name,
    avatar: state.gdUSelected.userSelected.avatar,
  }));

  let location = useLocation();

  let BreadCrumbsRouters = location.pathname.split('/').splice(5);

  return (
    <Breadcrumbs sx={{userSelect: 'none',}} aria-label="breadcrumb">
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Avatar src={(userAvatar ? userAvatar : avatar)} sx={classes.avatar} alt={`Avatar de ${(userName ? userName : name)}`}>
          {(userName ? userName : name).substring(0, 1).toUpperCase()}
        </Avatar>
        <Typography sx={{ml: 1}} component='span' variant='h6' className='text__bold--semi'>{(userName ? userName : name)}</Typography>
      </Box>
      {(!BreadCrumbsRouters.length) ? <Typography component='span' variant='h6' className='text__bold--semi'>Perfil</Typography> : BreadCrumbsRouters.map((path, i) => (
        <Typography component='span' variant='h6' className='text__bold--semi' key={i}>
          {path[0].toUpperCase() + path.slice(1)}
        </Typography>
      )) }
    </Breadcrumbs>
  )
}
