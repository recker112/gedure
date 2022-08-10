import React, { useState } from 'react';

// MUI
import { Badge, IconButton, Popover, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Components
import RenderNotify from './RenderNotify';

// Redux
import { useSelector } from 'react-redux';

export default function NotifyMenu() {
  const [target, setTarget] = useState(null);

  const { count_notify } = useSelector((state) => ({
    count_notify: state.auth.notify.count,
  }));

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
          <Badge badgeContent={count_notify} color='secondary' max={10}>
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
        <RenderNotify handleClose={handleClose} />
      </Popover>
    </>
  )
}
