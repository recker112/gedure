import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLogin(params) {
  return(
    <div>
      <nav className="login">
        <Link to="/news">Noticas UEP APEP</Link>
        <Link to="/login">Entrar al SGI</Link>
      </nav>
    </div>
  )
}

export default HeaderLogin;
