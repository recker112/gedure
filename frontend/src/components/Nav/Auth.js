import React from 'react';

// MUI
import { IconButton, Toolbar, Tooltip } from '@mui/material';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import MenuIcon from '@mui/icons-material/Menu';

// Components
import DrawerMenu from './DrawerMenu';

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

function OpenDrawer({children, ...rest}) {
	const dispatch = useDispatch();
	
	const handleClick = ()=>{
		dispatch(updateDrawer(true));
	}
	
	return (
		<div {...rest} onClick={handleClick}>
			{children}
		</div>
	)
}

export default function Auth() {
  const tema = useSelector(state => state.configs.tema);

  const temaText = tema === 'light' ? 'Modo Oscuro' : 'Modo Claro';

  return (
    <Toolbar>
      <OpenDrawer style={{flexGrow: 1}}>
        <Tooltip title='Menú' arrow>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </OpenDrawer>
      <ChangeTheme>
        <Tooltip title={temaText} arrow>
          <IconButton color="inherit">
            <WbIncandescentIcon />
          </IconButton>
        </Tooltip>
      </ChangeTheme>
      <DrawerMenu />
    </Toolbar>
  )
}
