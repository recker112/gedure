import React from 'react';

// Route
import { Navigate, useLocation } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

export function NoSeeAuth({ children }) {
  const auth = useSelector((state) => state.auth.auth);
  
  let location = useLocation();

  /**
   * Verificar auth y redirigir a página anterior
   * si es que existe. En caso de no existir un
   * state, se enviará a la ruta principal de la app.
   */
  if (auth) {
    return <Navigate to={location.state ? location.state?.from.pathname+location.state?.from.search : '/gedure'} />
  }

  return children;
}

export function AuthProtect({ stateNull, activedAtPass = false, children }) {
  const { auth, actived_at } = useSelector((state) => ({
		auth: state.auth.auth,
		actived_at: state.auth.user.actived_at
	}));

  let location = useLocation();
  
  /**
   * Verificar logout para redirigir a la vista de login.
   * 
   * STATENULL: El state será nulo solo cuando se haga un logout
   * desde la app para evitar que redireccione a la página anterior
   * donde se hizo el logout, así cuando vuelva hacer un login la
   * app lo redireccionará hacia la ruta principal (/gedure)
   */
  if (!auth) {
    return <Navigate to={'/entrar'} state={!stateNull && { from: location }} />
  }

  /**
   * Verificar actived_at para bloquear todo cambio de ruta
   * que no sea /setup
   */
  if (!actived_at && location.pathname !== '/setup' && !activedAtPass) {
    return <Navigate to='/setup' />
  }

  return children;
}
