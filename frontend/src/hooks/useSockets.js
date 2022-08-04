import { useEffect } from "react";

// Echo
import Echo from 'laravel-echo';

// Redux
import { useSelector } from "react-redux";

export default function useSockets() {
  const { access_key, auth } = useSelector((state) => ({
    access_key: state.auth.access_key,
    auth: state.auth.auth,
  }));

  const config = {
    broadcaster: 'pusher',
    key: 'LAC4ANDE47',
    authEndpoint : process.env.NODE_ENV !== 'production' ? 'http://localhost/broadcasting/auth' : '/broadcasting/auth',
    auth:{
      headers: {
        Authorization: `Bearer ${access_key}`
      },
    },
    wsHost: process.env.NODE_ENV !== 'production' ? 'localhost' : window.location.hostname,
    wsPort: 6001,
    wssport: 6001,
    transports: ['websocket'],
    enabledTransports: ['ws', 'wss'],
    forceTLS: false,
    disableStats: true
  };

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
}
