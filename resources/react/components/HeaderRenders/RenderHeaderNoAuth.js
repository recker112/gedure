import React from 'react';
import ButtonTheme from '../ButtonTheme';
import { Link } from 'react-router-dom';
import { IconButton, Tooltip } from '@material-ui/core';

//Icons
import AnnouncementIcon from '@material-ui/icons/Announcement';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { useTheme } from '@material-ui/core/styles';

function RenderHeaderNoAuth() {
	const theme = useTheme();
	
	let darkModeColor = theme.palette.type === 'dark' ? 'Header--Dark' : '';
  return (
    <header className={`Header ${darkModeColor}`}>
      <nav className='Header__Nav'>
        <span className="Header__Button">
          <ButtonTheme />
        </span>
        <span className="Header__Button">
          <Link to="/news">
            <Tooltip title="Noticias" arrow>
              <IconButton>
                <AnnouncementIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </span>
        <span className="Header__Button">
          <Link to="/login">
          <Tooltip title="Login" arrow leaveDelay={200}>
              <IconButton>
                <VpnKeyIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </span>
      </nav>
    </header>
  )
}

export default RenderHeaderNoAuth;