import { useEffect } from "react";

// Echo
import Echo from 'laravel-echo';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { countNotify, updateWallet } from '../store/slices/auth';

export default function useSockets() {
  const { access_key, auth, id } = useSelector((state) => ({
    access_key: state.auth.access_key,
    auth: state.auth.auth,
    id: state.auth.user.id,
  }));
  const dispatch = useDispatch();

  const config = {
    broadcaster: 'pusher',
    key: 'LAC4ANDE47',
    authEndpoint : `${window.location.protocol}//${window.location.hostname}/broadcasting/auth`,
    auth:{
      headers: {
        Authorization: `Bearer ${access_key}`
      },
    },
    wsHost: window.location.hostname,
    wsPort: 6001,
    wssPort: 6001,
    transports: ['websocket'],
    enabledTransports: ['ws', 'wss'],
    forceTLS: false,
    disableStats: true,
  };

  // NOTA(RECKER): Core
  useEffect(() => {
    const connect = async () => {
      if (auth === false || access_key.length <= 0 || typeof window?.Echo !== 'undefined') {
        return null;
      }

      // Echo
      window.Pusher=require('pusher-js');

      window.Echo = new Echo(config);
    }

    connect();

    return () => {
      if (typeof window?.Echo !== 'undefined') {
        window.Echo.disconnect();
        window.Echo = undefined;
      } 
    }
    // eslint-disable-next-line
  }, [access_key]);

  // NOTA(RECKER): Notifications
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
}
