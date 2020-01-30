import React from 'react';

function Footer() {
  return(
  <footer>
    <div className="footer1">
      <a href={window.location.href}>
        &copy; UEP APEP "La Candelaria" - Algunos derechos reservados.
      </a>
    </div>
    <div className="footer2">
      <a href={window.location.href}>
        Desarollado por Recker.
      </a>
    </div>
  </footer>);
}

export default Footer;