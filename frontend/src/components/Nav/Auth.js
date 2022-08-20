import React from 'react';

// MUI
import { Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import MenuIcon from '@mui/icons-material/Menu';

// Components
import DrawerMenu from './DrawerMenu';
import AvatarMenu from './AvatarMenu';
import NotifyMenu from './NotifyMenu';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateDrawer, updateTema } from '../../store/slices/configs';

function ChangeTheme({children, ...rest}) {
	const dispatch = useDispatch();
	
	const handleClick = ()=>{
		dispatch(updateTema())
	}
	
	return (
		<div {...rest} onClick={handleClick}>
			{children}
		</div>
	)
}

export default function Auth() {
  const tema = useSelector(state => state.configs.tema);
  const dispatch = useDispatch();
	
	const handleDrawer = ()=>{
		dispatch(updateDrawer(true));
	}

  const temaText = tema === 'light' ? 'Modo Oscuro' : 'Modo Claro';

  return (
    <Toolbar>
      <Box sx={{flexGrow: 1}}>
        <Tooltip title='Menú' arrow data-tour="drawer">
          <IconButton onClick={handleDrawer} color="inherit">
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <NotifyMenu />
      <ChangeTheme>
        <Tooltip title={temaText} arrow>
          <IconButton sx={{mr: 1}} color="inherit" data-tour="change-theme">
            <WbIncandescentIcon />
          </IconButton>
        </Tooltip>
      </ChangeTheme>
      <AvatarMenu />
      <DrawerMenu />
    </Toolbar>
  )
}
