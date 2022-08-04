import React, { useState, useEffect } from 'react';

// MUI
import { Badge, IconButton, Popover, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Components
import RenderNotify from './RenderNotify';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { countNotify, updateWallet } from '../../store/slices/auth';

export default function NotifyMenu() {
  const [target, setTarget] = useState(null);

  const { id, count_notify } = useSelector((state) => ({
    id: state.auth.user.id,
    count_notify: state.auth.notify.count,
  }));
  const dispatch = useDispatch();

  // NOTA(RECKER): Core Websockets
  useEffect(() => {
    // NOTA(RECKER): Escuchar canal privado de notificaciones
    window.Echo && window.Echo.private(`App.Models.User.${id}`).notification(notify => {
      dispatch(countNotify(notify.count_notify));

      notify.balance && dispatch(updateWallet(notify.balance));
    })

    // NOTA(RECKER): Dejar de escuchar el canal
    return () => {
      window.Echo && window.Echo.leave(`App.Models.User.${id}`);
    }

    // eslint-disable-next-line
  },[window.Echo]);

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
