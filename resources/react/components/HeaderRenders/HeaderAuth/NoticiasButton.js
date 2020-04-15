import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { Link } from 'react-router-dom';

function NoticiasButton() {
  return (
		<Link to="/news">
			<Tooltip title="Noticias" arrow leaveDelay={200}>
				<IconButton>
					<AnnouncementIcon />
				</IconButton>
			</Tooltip>
		</Link>
  );
}

export default NoticiasButton;