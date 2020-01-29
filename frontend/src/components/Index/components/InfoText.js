import React from 'react';
import { Link } from 'react-router-dom';

function InfoText() {
    return(
      <div className="PageIndexBox">
        <header>
            <nav>
              <Link to="/news">Noticas UEP APEP</Link>
              <Link to="/login">Entrar al SGI</Link>
            </nav>
        </header>
        <main>
          <h1>UEP APEP "LA CANDELARIA" <br/>
          Turmero - Edo. Aragua</h1>
        </main>
      </div>
    )
}

export default InfoText;