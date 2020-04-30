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
	
	let darkModeColor = theme.palette.type === 'dark' ? 'headerDark' : '';
  return (
    <header className={`header ${darkModeColor}`}>
      <nav>
        <span className="IconBoxButton">
          <ButtonTheme />
        </span>
        <span className="IconBoxButton">
          <Link to="/news">
            <Tooltip title="Noticias" arrow>
              <IconButton>
                <AnnouncementIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </span>
        <span className="IconBoxButton">
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