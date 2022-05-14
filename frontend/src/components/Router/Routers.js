import React from 'react';

// Route
import { Navigate, useLocation } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

export function NoSeeAuth({ children }) {
  const auth = useSelector((state) => state.auth.auth);

  let location = useLocation();

  // NOTA(RECKER): Verificar auth
  if (auth) {
    return <Navigate to='/gedure' state={{ from: location }} />
  }

  return children;
}

export function AuthProtect({ returnBack, children }) {
  const { auth, actived_at } = useSelector((state) => ({
		auth: state.auth.auth,
		actived_at: state.auth.user.actived_at
	}));

  let location = useLocation();

  // NOTA(RECKER): Verificar auth
  if (!auth) {
    return <Navigate to={returnBack ? -1 : '/entrar'} state={{ from: location }} />
  }

  // NOTA(RECKER): Verificar actived_at
  if (!actived_at && location.pathname !== '/setup') {
    return <Navigate to='/setup' />
  }

  return children;
}
