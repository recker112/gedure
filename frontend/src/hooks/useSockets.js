import { useEffect } from "react";

// Echo
import Echo from 'laravel-echo';

// Redux
import { useSelector } from "react-redux";

export default function useSockets() {
  const { access_key, auth, id } = useSelector((state) => ({
    access_key: state.auth.access_key,
    auth: state.auth.auth,
    id: state.auth.user.id,
  }));

  useEffect(() => {
    const connect = async () => {
      if (auth === false || access_key.length <= 0 || typeof window?.Echo !== 'undefined') {
        return null;
      }

      // Echo
      window.Pusher=require('pusher-js');

      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'LAC4ANDE47',
        authEndpoint : 'http://localhost/broadcasting/auth',
        auth:{
          headers: {
            Authorization: `Bearer ${access_key}`
          },
        },
        wsHost: 'localhost',
        wsPort: 6001,
        wssport: 6001,
        transports: ['websocket'],
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
        disableStats: true
      });

      // NOTA(RECKER): Escuchar canal privado de notificaciones
      window.Echo.private(`App.Models.User.${id}`).notification(notify => {
        console.log(notify.title, notify);
      })

      console.log('Conectado');
    }

    connect();

    return () => {
      if (typeof window?.Echo !== 'undefined') {
        console.log('Desconectado')
        window.Echo.disconnect();
        window.Echo = undefined;
      } 
    }
    // eslint-disable-next-line
  }, [access_key]);
}
